# markdown-as-config

A markdown to JS config object parser. Inspired by [tj/mdconf](https://github.com/tj/mdconf)

## Installation

```js
npm install markdown-to-config
```

## Usage

```js
import { markdownToConfig } from "markdown-to-config"

const config = markdownToConfig(markdownText, options)
```

## Rules

- Markdown headings act as keys
- List items with `key : value` format act as maps
- Other regular lists behave as lists
- Any content below a heading and an empty line is stored in `Symbol(CONTENT_AS_TEXT)`
- Any content can be retrieved as HTML (converted with `marked` library) with `Symbol(CONTENT_AS_HTML)`

## Options

Default options:
```js
{
    camelizeKeys: false, // replaces "long map key" by "longMapKey",
    parseContent: str => str.trim(), // function applied on content parsing
    markedOptions: null // options passed to marked for html conversion
}
```

## Demo

Try the online converter [available here](https://sylvainpolletvillard.github.io/markdown-to-config/)