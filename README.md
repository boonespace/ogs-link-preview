# OGS Link Preview Bookmarklet

[English](./README.md) | [简体中文](./README_CN.md)

Add rich link preview cards to [Online Go (OGS)](https://online-go.com/) chat without modifying the OGS source code.

The bookmarklet automatically detects URLs in OGS chat messages and inserts a preview card directly after the original URL.

## Features

* Automatically detects URLs in OGS chat messages
* Displays the webpage title
* Displays the webpage description
* Displays a thumbnail image when available
* Displays the website domain
* Click the preview card to open the original URL
* Click the bookmarklet again to remove all generated previews

## Demo

Open an OGS chat page containing URLs and click the bookmarklet.

The preview card will appear directly after the original URL.

## Installation

### Chrome / Edge / Firefox

1. Create a new browser bookmark.

2. Name it:

   ```text
   OGS Link Preview
   ```

3. Open the [`bookmarklet.min.js`](./bookmarklet.min.js) file in this repository.

4. Copy the entire contents of `bookmarklet.min.js`.

5. Edit the bookmark you created and paste the copied code into the **URL / Address** field.

   The value should start with:

   ```text
   javascript:
   ```

   For example:

   ```text
   javascript:(function(){...})()
   ```

6. Save the bookmark.

7. Open an OGS chat page, Click the **OGS Link Preview** bookmark.

The preview cards should appear directly after URLs in the chat messages.

> [!IMPORTANT]
> Make sure the `javascript:` prefix is preserved when copying the contents of `bookmarklet.min.js`.
>
> If your browser removes `javascript:` when pasting it into the bookmark URL field, type `javascript:` manually at the beginning.

## Usage

The bookmarklet works as a toggle:

1. **First click** — Generate link previews.
2. **Second click** — Remove all generated previews.
3. **Third click** — Generate the previews again.

The same URL is only previewed once across the page.

## Development

The readable source code is located in:

```text
bookmarklet.js
```

The minified bookmarklet is generated automatically:

```text
bookmarklet.min.js
```

Build it locally with:

```bash
npm install
npm run build
```

The project uses [Terser](https://terser.org/) to minify the bookmarklet.

## Privacy

The bookmarklet does not collect or store OGS chat messages.

To obtain webpage metadata, the target URL is sent to the Microlink API.

## Limitations

* Some websites may block metadata crawlers.
* Some pages may not provide Open Graph or other metadata.
* A thumbnail image may not be available.
* Preview generation depends on the availability of the Microlink API.

## License

See the repository's license file for details.
