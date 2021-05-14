module.exports = {
  "plugins": ["jest"],
  env: {
    node: true,
    commonjs: true,
    es2021: true,
    'jest/globals': true  
  },
  extends: [
    'standard','plugin:json/recommended','prettier'
  ],
  parserOptions: {
    ecmaVersion: 12
  },
  rules: {
    'comma-dangle': 'off',
    'space-before-function-parent': 'off',
  }
}
