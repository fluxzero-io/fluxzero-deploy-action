import * as core from '@actions/core';
import {HttpClient} from '@actions/http-client';

async function run() {
    try {
        const token = core.getInput('token', {required: true});
        core.setSecret(token);

        const marketplaceApplicationId = core.getInput('marketplace-application-id', {required: true});
        const version = core.getInput('version', {required: true});
        const releaseEndpoint = core.getInput('release-endpoint', {required: true});
        const releaseChannel = 'stable';

        console.log(
            `Releasing Marketplace application ${marketplaceApplicationId} version ${version} `
            + `to the ${releaseChannel} channel`);

        const response = await new HttpClient().post(releaseEndpoint, JSON.stringify({
            marketplaceApplicationId,
            version,
            releaseChannel
        }), {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        });
        const responseBody = await response.readBody();
        const statusCode = response.message.statusCode;
        if (typeof statusCode !== 'number' || statusCode < 200 || statusCode >= 300) {
            core.setFailed(`Request failed with status code: ${statusCode}`);
            console.log(responseBody);
        } else {
            console.log('Request succeeded:', responseBody);
        }
    } catch (error) {
        core.setFailed(`Action failed with error: ${error}`);
    }
}

run();
