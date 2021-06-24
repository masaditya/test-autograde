## React Project Autograder 

### How to use 

- create `yaml` file in `/.github/workflows/`.
- insert this into `yaml` or `yml` file. 

```
name: Test Autograde
on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]
  workflow_dispatch:

# A workflow run is made up of one or more jobs that can run sequentially or in parallel
jobs:
  autograde:
    # The type of runner that the job will run on
    runs-on: ubuntu-latest
    # Steps represent a sequence of tasks that will be executed as part of the job
    steps:
      - uses: actions/checkout@v2
      # Runs a single command using the runners shell
      - name: install dependencies
        run: npm install
      - name : Autograde Testing
        run: npm run test -- --verbose 2>&1 | tee test.log
      - name : Show log file
        run: cat test.log
      - uses: masaditya/test-autograde@v10.0

```
- create commit and push to gitHub
- result can be found in [Autograde Dashboard](https://autograde-dashboard.vercel.app/)
