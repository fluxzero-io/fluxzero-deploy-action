const assert = require('node:assert/strict');
const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');

// Only synthetic CI credentials and local endpoints are accepted here.
const directory = process.argv[2];
const requests = [];
const server = http.createServer((incoming, response) => {
    const chunks = [];
    incoming.on('data', chunk => chunks.push(chunk));
    incoming.on('end', () => {
        try {
            assert.equal(incoming.method, 'POST');
            assert.equal(incoming.headers.authorization, 'Bearer local-fixture-token');
            const body = JSON.parse(Buffer.concat(chunks));
            if (incoming.url === '/deploy') {
                assert.deepEqual(body, {
                    clusterName: 'fixture-cluster', applicationName: 'fixture-app',
                    imageName: 'fixture-image', version: '1.2.3',
                    imageReference: 'registry.invalid/fixture-image:1.2.3'
                });
            } else if (incoming.url === '/release') {
                assert.deepEqual(body, {
                    marketplaceApplicationId: 'fixture-app', version: '1.2.3', releaseChannel: 'stable'
                });
            } else {
                assert.equal(incoming.url, '/failure');
            }
            requests.push(incoming.url);
            fs.writeFileSync(path.join(directory, 'requests.json'), JSON.stringify(requests));
            response.writeHead(incoming.url === '/failure' ? 503 : 200, {'Content-Type': 'application/json'});
            response.end('{"fixture":true}');
        } catch (error) {
            console.error(error);
            response.writeHead(400);
            response.end('Fixture contract mismatch');
        }
    });
});
server.listen(0, '127.0.0.1', () => {
    fs.writeFileSync(path.join(directory, 'port'), String(server.address().port));
});
