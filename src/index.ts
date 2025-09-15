import * as core from '@actions/core';
import {HttpClient} from '@actions/http-client';

async function run() {
    try {
        // Get inputs
        const token = core.getInput('token', {required: true});
        core.setSecret(token);

        const clusterName = core.getInput('cluster-name', {required: true});
        const applicationName = core.getInput('application-name', {required: true});
        const imageName = core.getInput('image-name', {required: true});
        const version = core.getInput('version');
        const deploymentEndpoint = core.getInput('deployment-endpoint')

        const httpClient = new HttpClient();

        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };

        const body = {
            clusterName: clusterName,
            applicationName: applicationName,
            imageName: imageName,
            version: version
        }

        console.log(`Deploying ${applicationName} to cluster ${clusterName} using image ${imageName}:${version}`);

        const response = await httpClient.post(deploymentEndpoint, JSON.stringify(body), headers);
        const responseBody = await response.readBody();
        const statusCode = response.message.statusCode;
        if (typeof statusCode !== 'number' || statusCode < 200 || statusCode >= 300) {
            core.setFailed(`Request failed with status code: ${response.message.statusCode}`);
            console.log(responseBody);
        } else {
            console.log('Request succeeded:', responseBody);
        }
    } catch (error) {
        core.setFailed(`Action failed with error: ${error}`);
    }
}

run();
