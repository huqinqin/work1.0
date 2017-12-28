// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'key-spacing': 'off',
    'quotes': 'off',
    'spaced-comment': 'off',
    'comma-spacing': 'off',
    'comma-dangle': 'off',
    'space-before-function-paren': 'off',
    'space-before-blocks': 'off',
    'semi': 'off',
    'keyword-spacing': 'off',
  }
}
