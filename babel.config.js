module.exports = {
  presets: ['@babel/preset-env'],
  plugins: [
    '@babel/plugin-transform-optional-catch-binding',
    '@babel/plugin-transform-json-strings',
    '@babel/plugin-transform-dynamic-import',
    '@babel/plugin-transform-numeric-separator',
    '@babel/plugin-transform-class-properties',
    '@babel/plugin-transform-nullish-coalescing-operator',
    '@babel/plugin-transform-optional-chaining'
  ],
};
