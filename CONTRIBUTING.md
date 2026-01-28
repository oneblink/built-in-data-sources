# Contributing

## Git Branch Workflow

This project adheres to [GitHub Flow](https://guides.github.com/introduction/flow/).

## Development

During development you will likely **not** wish to use the OneBlink Production Environment. This can be achieve by setting the `ONEBLINK_CLI_ENVIRONMENT` variable to the value of the environment you wish to use e.g. `test`.

## Release Process

### Test Environment

There is no release process to deploy to the Test environment, all commits to `master` trigger a deployment to the Test Environment.

### Production Environment

1.  Install the release CLI globally

    ```
    npm i -g @oneblink/release-cli
    ```

1.  Start a product release and follow the prompts to release this repository

    ```
    oneblink-release product
    ```
