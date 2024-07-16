const path = require("path"); // connect path to webpack config
const HtmlWebpackPlugin = require("html-webpack-plugin"); // connect plugin
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // connect plugin
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  devtool: "inline-source-map",
  entry: {
    main: "./src/pages/index.js",
  },
  output: {
    // rewrite the output point using the path utility
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
    publicPath: "",
  },
  target: ["web", "es5"],
  mode: "development",
  stats: "errors-only",
  devServer: {
    static: path.resolve(__dirname, "./dist"), // specifies a folder from where to serve the application and its contents
    compress: true, // this will speed up file loading in development mode
    port: 8080, // will open your site at localhost:8080 (you can use another port)
    open: true, // site will open automatically in the browser after executing npm run dev
    liveReload: true,
    hot: false,
  },
  module: {
    rules: [
      // this is an array of rules
      // add an object containing rules for Babel to it
      {
        // a regular expression that searches for all js files
        test: /\.js$/,
        // all files must be processed by babel-loader
        loader: "babel-loader",
        // exclude the node_modules folder, we don't need to process files in it
        exclude: "/node_modules/",
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: { importLoaders: 1 },
          },
          "postcss-loader",
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|woff(2)?|eot|ttf|otf)$/,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html", // path to our index.html file
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
  ],
};

/*Build the project with the npm run build command, 
and open the dist folder. The index.html file has appeared 
inside it. If you open it, you'll see that webpack has 
independently and automatically added the required <script> 
tags. Now, our HTML and JS are connected to each other, 
and to Webpack too.

Now, if we run the npm run dev command,
 we can view our project in the browser. 
 Go to http://localhost:8080 and try it! You should see 
 the <h1> from our HTML file being rendered. And if you 
 open your console, you'll see that the JavaScript file
  is being executed as well.*/
