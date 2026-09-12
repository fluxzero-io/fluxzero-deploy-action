<a href="https://fluxzero.io"><img src="https://raw.githubusercontent.com/fluxzero-io/.github/3fa8f79df95d07678a730147bc1bd0402ae660d5/assets/brand/2026-09/repository-header.svg" alt="Fluxzero — The European cloud for AI-built apps" width="1280"></a>

# Fluxzero Deploy Action

Deploy applications from GitHub Actions to [Fluxzero Cloud](https://fluxzero.io).

[![GitHub release](https://img.shields.io/github/v/release/fluxzero-io/fluxzero-deploy-action?display_name=tag&sort=semver)](https://github.com/fluxzero-io/fluxzero-deploy-action/releases)
[![GitHub Marketplace](https://img.shields.io/badge/GitHub%20Marketplace-Use%20this%20Action-2ea44f)](https://github.com/marketplace/actions/fluxzero-deploy)

---

## Deploy an application

```yaml
jobs:
  example:
    runs-on: ubuntu-latest
    steps:
      - name: Deploy application to cluster
        id: deploy
        uses: fluxzero-io/fluxzero-deploy-action@v1
        with:
          token: ${{ steps.jwt.outputs.token }}
          cluster-name: "Production Cluster"
          application-name: "Order Service"
          image-name: "order-service"
          version: "1.0.0"

      - name: Deploy application with explicit image reference
        uses: fluxzero-io/fluxzero-deploy-action@v1
        with:
          token: ${{ steps.jwt.outputs.deploy-token }}
          cluster-name: "Production Cluster"
          application-name: "Order Service"
          image-name: "order-service"
          image-reference: "registry.fluxzero.io/958e1ee2f6c64facbc7765026a9a6e09/order-service:sha-123abcd"
```

### Inputs

| Name               | Required | Default | Description                                          |
|--------------------|:--------:|:-------:|------------------------------------------------------|
| `token`            |   yes    |    -    | A Fluxzero System API JWT                            |
| `cluster-name`     |   yes    |    -    | The name of the cluster to deploy the application to |
| `application-name` |   yes    |    -    | The name of the application to deploy                |
| `image-name`       |   yes    |    -    | The name of the Docker image                         |
| `image-reference`  |    no    |    -    | The full OCI image reference to deploy               |
| `version`          |    no    | `latest`| The version/tag of the Docker image                  |

## Release a Marketplace application

Marketplace application maintainers can use the side action after publishing a new image version to the Fluxzero registry:

```yaml
- name: Release Marketplace application
  uses: fluxzero-io/fluxzero-deploy-action/release-marketplace@v1
  with:
    token: ${{ steps.jwt.outputs.release-token }}
    marketplace-application-id: "order-service"
    version: "2.0.0"
```

The `stable` release channel currently rolls the version out directly to all clusters where the Marketplace application is installed.

### Inputs

| Name                         | Required | Default  | Description                                             |
|------------------------------|:--------:|:--------:|---------------------------------------------------------|
| `token`                      |   yes    |    -     | A Fluxzero System API JWT belonging to an app maintainer |
| `marketplace-application-id` |   yes    |    -     | The ID of the Marketplace application                   |
| `version`                    |   yes    |    -     | The version/tag pushed to the Fluxzero registry          |

---

## Outputs

These actions have no outputs.

---

## Security notes

- The `token` input is masked in workflow logs.
- For maximum supply-chain safety, pin this action to a specific commit SHA:  
  ```yaml
  uses: fluxzero-io/fluxzero-deploy-action@<commit-sha>
  ```


---

<p align="center"><strong>Are you a builder or coding agent?</strong><br>We welcome your ideas, issues, and pull requests!</p>

<p align="center">
  <a href="https://github.com/fluxzero-io/fluxzero-sdk-java"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/fluxzero-io/.github/d4ab6c7914b7e21d06336601bdf8d9dd6e4b725a/assets/brand/2026-09/profile/sdk-dark.svg"><img src="https://raw.githubusercontent.com/fluxzero-io/.github/d4ab6c7914b7e21d06336601bdf8d9dd6e4b725a/assets/brand/2026-09/profile/sdk-light.svg" alt="SDK — Connect your code to Fluxzero" width="200" height="91"></picture></a>
  <a href="https://github.com/fluxzero-io/fluxzero-agent-plugins"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/fluxzero-io/.github/d4ab6c7914b7e21d06336601bdf8d9dd6e4b725a/assets/brand/2026-09/profile/agents-dark.svg"><img src="https://raw.githubusercontent.com/fluxzero-io/.github/d4ab6c7914b7e21d06336601bdf8d9dd6e4b725a/assets/brand/2026-09/profile/agents-light.svg" alt="Agent plugins — Guide your coding agent" width="200" height="91"></picture></a>
  <a href="https://github.com/fluxzero-io/fluxzero-cli"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/fluxzero-io/.github/d4ab6c7914b7e21d06336601bdf8d9dd6e4b725a/assets/brand/2026-09/profile/cli-dark.svg"><img src="https://raw.githubusercontent.com/fluxzero-io/.github/d4ab6c7914b7e21d06336601bdf8d9dd6e4b725a/assets/brand/2026-09/profile/cli-light.svg" alt="CLI — Create, run, and deploy apps" width="200" height="91"></picture></a>
  <a href="https://github.com/fluxzero-io/fluxzero-dev-server"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/fluxzero-io/.github/d4ab6c7914b7e21d06336601bdf8d9dd6e4b725a/assets/brand/2026-09/profile/dev-server-dark.svg"><img src="https://raw.githubusercontent.com/fluxzero-io/.github/d4ab6c7914b7e21d06336601bdf8d9dd6e4b725a/assets/brand/2026-09/profile/dev-server-light.svg" alt="Dev Server — Develop and test locally" width="200" height="91"></picture></a>
</p>

<p align="center">
  <a href="https://fluxzero.io/">Website</a> &nbsp;·&nbsp;
  <a href="https://fluxzero.io/how-it-works">How it works</a> &nbsp;·&nbsp;
  <a href="https://fluxzero.io/docs">Docs</a> &nbsp;·&nbsp;
  <a href="https://fluxzero.io/about">About us</a> &nbsp;·&nbsp;
  <a href="https://fluxzero.io/contact">Contact us</a>
</p>
