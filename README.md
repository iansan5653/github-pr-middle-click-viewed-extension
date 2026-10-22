# github-pr-middle-click-viewed-extension

Browser extension (Chrome and Firefox) to mark files in GitHub PRs as viewed by middle-clicking them.

On the "Files changed" tab of a pull request on github.com, middle-click anywhere inside a file (the header or the diff) to toggle that file's "Viewed" checkbox. Middle-clicking a link still opens it in a new tab, and middle-clicking inside a text field is left alone.

## Development

```sh
npm ci
npm run build          # Build dist/content-script.js
npm run check          # Check formatting, types, and lint the extension
npm run package        # Build a zip in web-ext-artifacts/
npm run start:firefox  # Run in a temporary Firefox profile
```

To load the extension in Chrome, build it and then use "Load unpacked" on the repository root from `chrome://extensions`.

## Releasing

Publishing a GitHub release triggers the [release workflow](.github/workflows/release.yml), which sets the manifest version from the release tag (so the tag must be a plain version number like `1.2.3`), attaches the packaged extension to the release, and publishes it to the Chrome Web Store and Mozilla Add-ons. This requires the following repository secrets:

- `CHROME_EXTENSION_ID`, `CHROME_STORE_CLIENT_ID`, `CHROME_STORE_CLIENT_SECRET`, `CHROME_STORE_CLIENT_REFRESH_TOKEN`
- `AMO_API_KEY`, `AMO_API_SECRET`
