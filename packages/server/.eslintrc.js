module.exports = {
  env: {
    "jest": true,
  },
  "extends": "standard",
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'comma-dangle': [ 'error', 'always-multiline' ],
  }
};
