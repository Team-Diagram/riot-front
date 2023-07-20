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
    'no-restricted-syntax': 'off',
    'max-len': ['error', { code: 100 }],
    'arrow-parens': ['error', 'always'],
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: ['vite.config.js', 'tailwind.config.js'] },
    ],
    'global-require': 'off',
    'import/no-cycle': 'off',
    'react/prop-types': 'off',
    'jsx-a11y/alt-text': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/no-unescaped-entities': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['src', './src'],
          ['public', './public'],
        ],
        extensions: ['.js', '.jsx', '.cjs'],
      },
    },
    'import/named': 'off',
  },
}
