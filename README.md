# Pomo 🍅
Simple Pomodoro timer

Also turning off all electron safety settings so use at own risk.

## Usage

**🚧 Currently in Beta**

*MacOS only right now*

To use the app, head to the [Releases](https://github.com/AHDesigns/pomo-electron/releases) and grab the `.dmg` file (`assets` is a dropdown, see screenshot below, the `version` number may change, but you get the idea).

There are many small features to add and these are tracked on the [Roadmap](https://github.com/AHDesigns/pomo-electron/projects/1)

Please [raise any bugs or request any features here](https://github.com/AHDesigns/pomo-electron/issues/new/choose).

![image](https://user-images.githubusercontent.com/10004500/128321790-3ff8d2e2-4e39-41f9-90d5-571b7af72605.png)

### Slack Integration
If you want to use the slack settings, you can go to the settings in the Pomo app, (the button at the top left takes you there), and then you’ll see a form to add the relevant credentials:
- a slack token: go to https://my.slack.com/customize, open your browser devTools and copy what you get from typing `TS.boot_data.api_token`
- a 'd' cookie: to get the cookies, you can go to slack in the browser (like any normal chat window, not the customise page) and grab the `d` and `d-s` cookies
- a 'd-s' cookie: as above.

![image](https://user-images.githubusercontent.com/10004500/128473497-ade85352-52f0-4546-a35c-33d3d0ed42bb.png)

## Contributing
*Pomo is not yet ready for contribution, but once V1 is released, all contributions will be welcome, and the approach to making changes will be very clear*

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
