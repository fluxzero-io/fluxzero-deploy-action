Update the bundled GitHub action-core and HTTP client, including Undici security
fixes. Both the deploy action and Marketplace side action retain their existing
inputs and Node 24 runtime.

Dependency maintenance now verifies both distributions, successful API requests
and rejected requests before release. TypeScript 6 remains in use until the
bundler supports the TypeScript 7 compiler API.
