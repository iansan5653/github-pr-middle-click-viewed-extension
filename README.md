# github-pr-middle-click-viewed-extension

Browser extension (Chrome and Firefox) to mark files in GitHub PRs as viewed by middle-clicking them.

On the "Files changed" tab of a pull request on github.com, middle-click anywhere inside a file (the header or the diff) to toggle that file's "Viewed" checkbox. Middle-clicking a link still opens it in a new tab, and middle-clicking inside a text field is left alone.

## Installing

This extension is not published to any extension store; install it locally from a build.

### Get a build

Either:

- **Download from CI:** open the latest successful [Continuous Integration](../../actions/workflows/ci-checks.yml) run on `main` (or trigger one with "Run workflow"), download the `github-pr-middle-click-viewed-extension` artifact, and unzip it into a folder you'll keep around.
- **Build it yourself:** run `npm ci && npm run build`. The repository root is then the extension folder.

### Chrome (and other Chromium browsers)

1. Go to `chrome://extensions`.
2. Turn on **Developer mode**.
3. Click **Load unpacked** and select the extension folder (the one containing `manifest.json`).

The extension stays installed across restarts. To update, replace the folder's contents and click the reload button on the extension's card.

### Firefox

Firefox only permanently installs signed extensions, so an unsigned local build is loaded as a temporary add-on:

1. Go to `about:debugging#/runtime/this-firefox`.
2. Click **Load Temporary Add-on...** and select `manifest.json` in the extension folder.

Temporary add-ons are removed when Firefox restarts. To keep it installed permanently, use [Firefox Developer Edition or Nightly](https://support.mozilla.org/kb/add-on-signing-in-firefox), set `xpinstall.signatures.required` to `false` in `about:config`, then install the zip from `npm run package` (in `web-ext-artifacts/`) via **Install Add-on From File...** in `about:addons`.

## Development

```sh
npm ci
npm run build          # Build dist/content-script.js
npm run check          # Check formatting, types, and lint the extension
npm run package        # Build a zip in web-ext-artifacts/
npm run start:firefox  # Run in a temporary Firefox profile
```
