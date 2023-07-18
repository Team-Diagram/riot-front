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
    'no-alert': 'off',
    'no-empty-function': 'error',
    'max-len': ['error', { code: 100 }],
    'arrow-parens': ['error', 'always'],
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: ['vite.config.js', 'tailwind.config.js'] },
    ],
    'global-require': 'off',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/no-unescaped-entities': 'off',
    'react/no-array-index-key': 'off',
    'jsx-a11y/alt-text': 'off',
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
