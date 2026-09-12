<a href="https://fluxzero.io"><img src="https://raw.githubusercontent.com/fluxzero-io/.github/3fa8f79df95d07678a730147bc1bd0402ae660d5/assets/brand/2026-09/repository-header.svg" alt="Fluxzero — The European cloud for AI-built apps" width="1280"></a>

# Fluxzero Deploy Action

Deploy applications from GitHub Actions to [Fluxzero Cloud](https://fluxzero.io).

[How it works](https://fluxzero.io/how-it-works) · [Docs](https://fluxzero.io/docs)

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
