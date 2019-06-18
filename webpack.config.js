const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');
const distPath = path.join(__dirname, '/dist');

function generateHtmlPlugins(templateDir) {
  const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));
  return templateFiles.map(item => {
    const parts = item.split('.');
    const name = parts[0];
    const extension = parts[1];
    return new HtmlWebpackPlugin({
      filename: `${name}.html`,
      template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
      inject: false,
    })
  })
}

const htmlPlugins = generateHtmlPlugins('./src/html/views');


module.exports = [{
  entry: {
    "main":'./src/js/index.js',
    "catalog":'./src/js/catalog.js'


  },
  output: {
    filename: './js/[name].bundle.js'
  },
  devtool: "source-map",
  module: {
    rules: [{
        test: /\.js$/,
        include: path.resolve(__dirname, 'src/js'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: 'env'
          }
        }
      },
      {
        test: /\.html$/,
        include: path.resolve(__dirname, 'src/html/includes'),
        use: ['raw-loader']
      },
    ]
  },
  
  plugins: [
    new CopyWebpackPlugin([
      {
        from: './src/img',
        to: './img'
      },
      {
        from: './src/json',
        to: './json'
      }

    ]),
    
  ].concat(htmlPlugins)
},
{
  entry: {
  "login_mob": './src/scss/login_mob.scss',
  "login_desk":'./src/scss/login_desktop.scss',
  "catalog_mob":'./src/scss/catalog_mob.scss',

},
output: {
  filename: './css/[name].bundle.css'
},
module: {
  rules: [
    {
      test: /\.(sass|scss)$/,
      include: path.resolve(__dirname, 'src/scss'),
      use: ExtractTextPlugin.extract({
        use: [{
            loader: "css-loader",
            options: {
              sourceMap: true,
              minimize: true,
              url: false
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      })
    }
  ]},
  plugins: [
    new ExtractTextPlugin({
      filename: './css/[name].bundle.css',
      allChunks: true,
    })
  ],
  devServer: {
    contentBase: distPath,
    port: 9000,
    compress: true,
    open: true
  }

}];