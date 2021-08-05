# Pomo 🍅
Simple Pomodoro timer

Also turning off all electron safety settings so use at own risk.

## Usage

**🚧 Currently in Beta**

There are many small features to add and these are tracked on the [Roadmap](https://github.com/AHDesigns/pomo-electron/projects/1)

Please [raise any bugs or request any features here](https://github.com/AHDesigns/pomo-electron/issues/new/choose).

To use the app, head to the [Releases](https://github.com/AHDesigns/pomo-electron/releases) and grab the `.dmg` file. Download it and install it (macOS only at this time). Follow [these quick instructions to allow the app to run](https://github.com/AHDesigns/pomo-electron/wiki/Beta-Release)

Some plans are:
electron based to run on OS in background, should support an api to be queried by editors, e.g
- tmux
- emacs
- intelij

could just write meta data to a file (e.g next end time, time left), or expose a REST api 

## Contributing

Pomo is an [electron](https://www.electronjs.org/) app built using:
- [Typescript](https://www.typescriptlang.org/) throughout (with very strict settings)
- [React](https://reactjs.org/) for the GUI
- [Storybook](https://storybook.js.org/docs/react/get-started/introduction) for building components and User documentation
- [Backstop.js](https://garris.github.io/BackstopJS/) for visual regression tests
- [Spectron](https://www.electronjs.org/spectron) for e2e tests running against the production electron app (it's a wrapper around [webdriver.io](https://v6.webdriver.io/docs/api.html) which in turn wraps selenium)
- Github actions for CI (not yet supporting publishing)

Install a node manager of your choice (volta is supported and recommended)

Install Dependencies
```bash
yarn install
```

Run the electron app and client locally
```bash
yarn dev
```

Run storybook for developing UI components
```bash
yarn storybook
```

Some other useful commands

| command | description |
| --- | --- |
| `yarn clean` | [**aggresive**] remove all files not recognised by git, then install all dependencies |
| `yarn lint` | use eslint to check source code in the repo for errors |
| `yarn test` | use [ts-jest](https://kulshekhar.github.io/ts-jest/) to run the project's unit tests. This will also compile via [typescript](https://www.typescriptlang.org/) to check for type errors as part of ts-jest|
| `yarn visual` | use backstop.js to run visual regression tests against a running storybook (`yarn storybook`). **Does not yet run on CI, so please run locally before opening Pull Requests.** |
| `yarn e2e` | run spectron tests located in the e2e folder. **run `yarn build` before running**|
| `yarn build` | build the project for production and e2e testing (no the same as the release script) |
| `yarn checks` | runs the full checklist of lint, test, build and e2e ||
| `yarn docker-e2e` | runs the e2e tests via a Dockerfile in a headless state - this is how CI will run these tests |
| `yarn release` | see [releasing wiki](https://github.com/AHDesigns/pancake-electron/wiki/Releasing) for information


## License

[MIT](https://choosealicense.com/licenses/mit/)
