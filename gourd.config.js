
module.exports = {
  entry: {
    app: ['react-hot-loader/patch', './app.js'],
  },
  htmlChunks: [{
    chunks: ['app'],
    filename: 'index.html',
    template: './index.html',
  }],
};
