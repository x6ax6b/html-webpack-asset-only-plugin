class HtmlWebpackAssetOnlyPlugin {
  pluginName = 'HtmlWebpackAssetOnlyPlugin';

  apply(compiler) {
    compiler.hooks.compilation.tap(this.pluginName, (compilation) => {
      compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing.tapAsync(this.pluginName, (htmlPluginData, callback) => {
        if (htmlPluginData.plugin.options.inject === 'head' || htmlPluginData.plugin.options.inject === 'body') {
          htmlPluginData.html = '';
        }
        callback(null, htmlPluginData);
      });
      compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tapAsync(this.pluginName, (htmlPluginData, callback) => {
        let re;
        if (htmlPluginData.plugin.options.inject === 'head') {
          re = /(<link.*?)<script/;
        } else if (htmlPluginData.plugin.options.inject === 'body') {
          re = /(<script.*<\/script>)$/;
        }
        if (re) {
          const asset = htmlPluginData.html.match(re);
          if (asset) {
            [, htmlPluginData.html] = asset;
          }
        }
        callback(null, htmlPluginData);
      });
    });
  }
}
module.exports = HtmlWebpackAssetOnlyPlugin;
