const path = require("path");

module.exports = {
  entry: "./src/index.js", // Your main application entry point
  output: {
    path: path.resolve(__dirname, "dist"), // Output directory
    filename: "bundle.js", // Output bundle name
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader", // Use Babel for JavaScript/JSX
        },
      },
    ],
  },
  devServer: {
    contentBase: path.resolve(__dirname, "dist"), // Serve files from dist directory
    port: 3000, // Port to run development server
  },
};

//npm install webpack webpack-cli webpack-dev-server –save-dev
