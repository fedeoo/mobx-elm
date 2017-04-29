
module.exports = {
  entry: {
    app: ['./pages/entry.js'],
    vendor: ['react-router-redux', 'react-router', 'history', 'redux', 'react-redux', 'redux-thunk',
      'lodash', 'classnames', 'isomorphic-fetch'],
  },
  commonChunks: {
    names: ['vendor'],
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    'react-addons-css-transition-group': 'React.addons.CSSTransitionGroup',
    'react-addons-shallow-compare': 'React.addons.shallowCompare',
    'react-addons-transition-group': 'React.addons.TransitionGroup',
  },
  htmlChunks: [{
    chunks: ['app', 'vendor'],
    filename: 'index.html',
    template: './pages/tpl.html',
  }],
};
