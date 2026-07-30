const assert = require('node:assert/strict');
const {spawn} = require('node:child_process');
const http = require('node:http');
const path = require('node:path');
const {test} = require('node:test');

const deployActionPath = path.resolve(__dirname, '../dist/index.js');
const releaseMarketplaceActionPath = path.resolve(__dirname, '../release-marketplace/dist/index.js');

function runAction(actionPath, inputs) {
    const env = {...process.env};
    for (const [name, value] of Object.entries(inputs)) {
        env[`INPUT_${name.toUpperCase()}`] = value;
    }

    return new Promise((resolve) => {
        const child = spawn(process.execPath, [actionPath], {env});
        let stdout = '';
        let stderr = '';
        child.stdout.on('data', chunk => stdout += chunk);
        child.stderr.on('data', chunk => stderr += chunk);
        child.on('close', code => resolve({code, stdout, stderr}));
    });
}

async function captureRequest(actionPath, inputs, endpointInput, endpointPath) {
    let request;
    const server = http.createServer((incoming, response) => {
        const chunks = [];
        incoming.on('data', chunk => chunks.push(chunk));
        incoming.on('end', () => {
            request = {
                method: incoming.method,
                path: incoming.url,
                headers: incoming.headers,
                body: JSON.parse(Buffer.concat(chunks).toString())
            };
            response.writeHead(200, {'Content-Type': 'application/json'});
            response.end('{"accepted":true}');
        });
    });

    await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
    const address = server.address();
    assert.notEqual(typeof address, 'string');
    inputs[endpointInput] = `http://127.0.0.1:${address.port}${endpointPath}`;

    const result = await runAction(actionPath, inputs);
    await new Promise(resolve => server.close(resolve));
    return {request, result};
}

test('releases a Marketplace application through the maintainer side action', async () => {
    const {request, result} = await captureRequest(releaseMarketplaceActionPath, {
        token: 'secret-token',
        'marketplace-application-id': 'insights',
        version: '2.0.0'
    }, 'release-endpoint', '/release-marketplace-application');

    assert.equal(result.code, 0, result.stderr);
    assert.match(result.stdout, /Releasing Marketplace application insights version 2\.0\.0/);
    assert.equal(request.method, 'POST');
    assert.equal(request.path, '/release-marketplace-application');
    assert.equal(request.headers.authorization, 'Bearer secret-token');
    assert.deepEqual(request.body, {
        marketplaceApplicationId: 'insights',
        version: '2.0.0',
        releaseChannel: 'stable'
    });
});

test('keeps deploying cluster applications through the root action', async () => {
    const {request, result} = await captureRequest(deployActionPath, {
        token: 'secret-token',
        'cluster-name': 'Production Cluster',
        'application-name': 'Order Service',
        'image-name': 'order-service',
        version: 'latest'
    }, 'deployment-endpoint', '/deploy-application');

    assert.equal(result.code, 0, result.stderr);
    assert.match(result.stdout, /order-service:latest/);
    assert.equal(request.method, 'POST');
    assert.equal(request.path, '/deploy-application');
    assert.deepEqual(request.body, {
        clusterName: 'Production Cluster',
        applicationName: 'Order Service',
        imageName: 'order-service',
        version: 'latest'
    });
});
