import {WebpackConfigWithMetadata, get} from '@easy-webpack/core'
import * as path from 'path'

/**
 * Babel loader support for ES2015
 * See: https://github.com/babel/babel-loader
 */
export = function babel({ options = {
    plugins: ['transform-decorators-legacy'],
    presets: [['es2015', {loose: true, modules: false}], 'stage-1'],
    cacheDirectory: true,
  }, exclude = null } = {}) {
  return function babel(this: WebpackConfigWithMetadata): WebpackConfigWithMetadata {
    return {
      module: {
        rules: get(this, 'module.rules', []).concat([{
          test: /\.jsx?$/,
          loader: 'babel-loader',
          exclude: exclude || (this.metadata.root ? [path.join(this.metadata.root, 'node_modules')] : []),
          query: options
        }])
      }
    }
  }
}