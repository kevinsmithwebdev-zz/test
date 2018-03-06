# Webpack boilerplate

Webpack config that uses `sass` and `babel`. 

**Write your html in `index.ejs` and your main entry code for your app in `app.js`.**

In `app.js` I have imported `main.scss` so webpack will convert the scss-files and output them as `styles.css` in `dist`-folder. As long as you don't delete that line you should just be able to write `scss` and `js` as usual.

## Installation

Install all dependencies using npm:

```bash
npm install
```

or with [`yarn`](https://yarnpkg.com/lang/en/)

```bash
yarn
```


## Usage

To run development server on localhost (you can choose port of your choice in the config-file)

```bash
yarn dev
```

To build:

```bash
yarn build
```



## Packages used

* [Webpack](https://github.com/webpack/webpack)
* [Webpack-dev-server](https://github.com/webpack/webpack-dev-server)
* [Webpack Dashboard](https://github.com/FormidableLabs/webpack-dashboard)
* [Webpack Babel Loader](https://github.com/babel/babel-loader)
* [Style-loader](https://github.com/webpack-contrib/style-loader)
* [CSS-loader](https://github.com/webpack-contrib/css-loader)
* [Sass-loader](https://github.com/webpack-contrib/sass-loader)
* [ExtractTextPlugin](https://github.com/webpack-contrib/extract-text-webpack-plugin)
* [HtmlWebpackPlugin](https://github.com/jantimon/html-webpack-plugin)