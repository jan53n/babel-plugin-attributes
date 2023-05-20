# babel-plugin-attributes

A Babel plugin that enhances JavaScript functions with custom attributes, providing additional metadata and annotations.

[![Node.js CI](https://github.com/jan53n/babel-plugin-attributes/actions/workflows/node.js.yml/badge.svg?branch=master)](https://github.com/jan53n/babel-plugin-attributes/actions/workflows/node.js.yml) [![NPM Package](https://github.com/jan53n/babel-plugin-attributes/actions/workflows/npm-publish.yml/badge.svg)](https://www.npmjs.com/package/babel-plugin-attributes)

## Example

**Input**
```javascript
$attr(middlewares(['auth']), can(['create']))
function routeHandler(req, res) {
    // some code
}
```

**Output**
```javascript
function routeHandler(req, res) {
    // some code
}

(function () {
  const attributes = new Map();
  attributes.set(middlewares, middlewares(['auth']));
  attributes.set(can, can(['create']));
  routeHandler.__attributes__ = attributes;
})();
```

## Installation

You can install `babel-plugin-attributes` using npm:

```shell
npm install babel-plugin-attributes --save-dev
```

## Plugin Options

| Option            | Description                                                | Default Value |
| ----------------- | ---------------------------------------------------------- | ------------- |
| attrFunctionName  | Valid function name to be used to identify attribute calls | `$attr`       |
| attrPropertyName  | Valid object property name that is used to store attribute map | `__attributes__`       |

## Usage

```json
{
  "plugins": [
    "babel-plugin-attributes",
    {
      "attrFunctionName": "$attr",
      "attrPropertyName": "__attributes__"
    }
  ]
}
```
