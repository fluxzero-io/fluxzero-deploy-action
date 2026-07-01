# Fluxzero Deploy Action

[![GitHub release](https://img.shields.io/github/v/release/fluxzero-io/fluxzero-deploy-action?display_name=tag&sort=semver)](https://github.com/fluxzero-io/fluxzero-deploy-action/releases)
[![GitHub Marketplace](https://img.shields.io/badge/GitHub%20Marketplace-Use%20this%20Action-2ea44f)](https://github.com/marketplace/actions/fluxzero-deploy)

This action deploys an application to a Fluxzero cluster.
---

## Usage

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

---

## Inputs
| Name               | Required | Default | Description                                          |
|--------------------|:--------:|:-------:|------------------------------------------------------|
| `token`            |   yes    |    -    | A Fluxzero System API JWT                            |
| `cluster-name`     |   yes    |    -    | The name of the cluster to deploy the application to |
| `application-name` |   yes    |    -    | The name of the application to deploy                |
| `image-name`       |   yes    |    -    | The name of the docker image                         |
| `image-reference`  |    no    |    -    | The full OCI image reference to deploy               |
| `version`          |    no    | `latest`| The version/tag of the docker image                  |

---

## Outputs

This actions has no outputs

---

## Security notes

- The `token` input is masked in workflow logs.
- For maximum supply-chain safety, pin this action to a specific commit SHA:  
  ```yaml
  uses: fluxzero-io/fluxzero-deploy-action@<commit-sha>
  ```
