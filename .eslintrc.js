module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'n'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
    eqeqeq: 'error',
    'no-console': 'warn',
    'no-debugger': 'warn',
    'no-var': 'error',
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'interface',
        format: ['PascalCase'],
        prefix: ['I'],
      },
      {
        selector: 'enum',
        format: ['PascalCase'],
        prefix: ['E'],
      },
      {
        selector: 'typeAlias',
        format: ['PascalCase'],
        prefix: ['T'],
      },
    ],
    'n/prefer-node-protocol': 'error',
    curly: ['error', 'all'],
  },
};
