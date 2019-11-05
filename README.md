html-webpack-asset-only-plugin
============
[HTML Webpack Plugin](https://github.com/jantimon/html-webpack-plugin)에서 사용할 수 있는 플러그인입니다.  
`<head></head>`의 마지막에 삽입되는 `<link>`와 `<body></body>` 또는 템플릿의 마지막에 삽입되는 `<script>` 부분을 각각 파일로 저장할 수 있습니다. 

Installation
---------------

npm:

```sh
$ npm install html-webpack-asset-only-plugin --save-dev
```

Yarn:

```sh
yarn add html-webpack-asset-only-plugin --dev
```

Usage
-----------------
webpack.config.js:
```js
const HtmlWebpackAssetOnlyPlugin = require('html-webpack-asset-only-plugin');

plugins: [
  new HtmlWebpackPlugin({
    inject: 'head' // head or body
  }),
  new HtmlWebpackAssetOnlyPlugin()
]
```
