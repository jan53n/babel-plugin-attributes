# babel-plugin-attributes

A Babel plugin that enhances JavaScript functions with custom attributes, providing additional metadata and annotations.

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
| attrFunctionName  | The valid function name to be used for attribute functions. | `$attr`       |

## Usage

```json
{
  "plugins": ["babel-plugin-attributes", { "attrFunctionName": "$attr" }]
}
```
