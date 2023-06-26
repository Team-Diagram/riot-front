module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  ignorePatterns: [
    '*/assets/*',
    './dist/*',
  ],
  rules: {
    semi: ['error', 'never'],
    'no-empty-function': 'error',
    'max-len': ['error', { code: 100 }],
    'arrow-parens': ['error', 'always'],
    'react/react-in-jsx-scope': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: ['vite.config.js'] },
    ],
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['src', './src'],
        ],
        extensions: ['.js', '.jsx', '.cjs'],
      },
    },
    'import/named': 'off',
  },
}
