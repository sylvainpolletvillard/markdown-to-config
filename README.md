# markdown-as-config

A markdown to JS config object parser. Inspired by [tj/mdconf](https://github.com/tj/mdconf)

## Installation

```js
npm install markdown-to-config
```

## Usage

```js
import { markdownToConfig } from "markdown-to-config"

const config = markdownToConfig(markdownText)
```

## Rules

- Markdown headings act as keys
- List items with : act as maps
- Other regular lists behave as lists
- Any content below a heading and an empty line is stored in `Symbol(CONTENT_AS_TEXT)`
- Any content can be retrieved as HTML (converted with `marked` library) with `Symbol(CONTENT_AS_HTML)`

## Demo

Try the online converter [available here](https://sylvainpolletvillard.github.io/markdown-to-config/)