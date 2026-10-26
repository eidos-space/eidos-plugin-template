# Eidos Plugin Template

A general starting point for an Eidos Lite plugin: one page, one command, semantic
theme styles, tests, and a check/package/release workflow. [简体中文](README.zh-CN.md)

[Use this template](https://github.com/eidos-space/eidos-plugin-template/generate)
to create your own repository. Follow the [first-plugin tutorial](https://docs.eidos.space/plugins/guide/)
to load it in Eidos Lite and make your first change.

## Get started

Use Node.js **22.12 or later**, npm, and Eidos Lite with Plugin API **3.0.0 or
later**. This starter pins the published SDK and tools **0.8.0**.

1. Click **Use this template → Create a new repository** on GitHub.
2. Clone your new repository and install its dependencies:

   ```sh
   git clone https://github.com/YOUR-NAME/my-eidos-plugin.git
   cd my-eidos-plugin
   npm ci
   ```

3. In `plugin.json`, replace `example.my-plugin` with your own stable plugin ID,
   and update `name`, `description`, `views[0].title`, and `actions[0].title`.
   Use lowercase ID segments, for example `yourname.my-plugin`.
4. Change `package.json`'s `name` to match your repository, then run
   `npm install --package-lock-only`. Keep its version aligned with `plugin.json`.
5. Run the checks:

   ```sh
   npm run typecheck
   npm test
   npm run check
   ```

## Load in Eidos Lite

Open a test Space, go to Plugin Manager, choose **Load development source…**, and
select this project's `plugin.json`. Review the declarations and enable the
plugin in that Space. Open **My Eidos Plugin** from navigation, or use Cmd/Ctrl+K
to run **My Eidos Plugin: Open** (use your renamed labels if changed).

Click **Add one** and watch the count increase. Edit `src/main.ts` and save it;
Lite recompiles and reloads the page. The counter is an in-memory example and
resets when the page closes or reloads. A source error keeps the previous working
revision visible; check the compiler error instead of treating that page as the
new revision.

The starter requests no file, network, storage, or background access. Add only
the declarations your feature needs. It targets Lite; page views and commands
are not supported by CLI Serve.

## Project layout

```text
plugin.json                   Plugin identity, page, command and placements
src/main.ts                   mount(ctx, root): page interface and cleanup
src/extension.ts              activate(ctx): command registration
src/style.css                 Host theme variables and focus styles
test/plugin.test.ts           Page and command lifecycle tests
.github/workflows/plugin.yml  Checks, package artifacts, tagged releases
```

SDK imports are type-only. Use `ctx.capabilities` for host operations; IDs and
paths are metadata, not access grants. Put listeners and registrations in
`ctx.subscriptions` so closing the plugin releases them. No separate bundler or
development server is required; plugin-tools bundles the sources and CSS.

## Package and release

```sh
npm run pack:plugin
```

This writes `dist/<plugin-id>-<version>.eidos-plugin` and its adjacent `.sha256`
file. Install the archive through Plugin Manager for durable use. Development
loading alone does not persist the source revision after restart.

Pushes to `main`, pull requests, and manual workflow runs check and package the
plugin. Download `plugin-package` from the Actions run to inspect its artifacts.
To publish a GitHub Release, update both version fields and `RELEASE_NOTES.md`,
commit them, then push a matching `v<version>` tag. The release job runs only after
checks pass and uploads the exact checked artifacts. Creating a release does not
automatically add the plugin to the [registry](https://github.com/eidos-space/registry).

## Extend the plugin

- [Views and data access](https://docs.eidos.space/plugins/views/)
- [Background tasks](https://docs.eidos.space/plugins/background/)
- [Localization](https://docs.eidos.space/plugins/i18n/): choose matching SDK,
  tools and host versions before using a newer API.
- [Development and distribution](https://docs.eidos.space/plugins/workflow/)

MIT licensed. Replace this README, release notes, and sample interface with your
plugin's own purpose and usage before distributing it.
