const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');

class HtmlWebpackAssetOnlyPlugin {
  pluginName = 'HtmlWebpackAssetOnlyPlugin';

  constructor(options) {
    if (options && options.assetOnly) {
      this.assetOnly = true;
    }
  }

  apply(compiler) {
    compiler.hooks.compilation.tap(this.pluginName, (compilation) => {
      compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing.tapAsync(this.pluginName, (htmlPluginData, callback) => {
        if (this.assetOnly && htmlPluginData.plugin.options.inject !== false) {
          htmlPluginData.html = '';
        }

        callback(null, htmlPluginData);
      });

      compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tapAsync(this.pluginName, (htmlPluginData, callback) => {
        if (this.assetOnly && htmlPluginData.plugin.options.inject !== false) {
          this.html = htmlPluginData.html;

          const fullPath = path.resolve(compilation.compiler.outputPath, htmlPluginData.outputName);

          mkdirp(path.dirname(fullPath), (mkdirpError) => {
            if (mkdirpError) {
              return callback(mkdirpError);
            }

            fs.writeFile(fullPath.replace(/(\.[^.]*$|$)/, '-script$1'), this.getScriptAsset(), (writeFileError) => {
              if (writeFileError) {
                return callback(writeFileError);
              }

              htmlPluginData.html = this.getLinkAsset();

              callback(null, htmlPluginData);
            });
          });
        } else {
          callback(null, htmlPluginData);
        }
      });
    });
  }

  getLinkAsset() {
    const matched = this.html.match(/(<l.*?)<[/s]/);
    return matched ? matched[1] : '';
  }

  getScriptAsset() {
    const matched = this.html.match(/(<s.*t>)/);
    return matched ? matched[1] : '';
  }
}

module.exports = HtmlWebpackAssetOnlyPlugin;
