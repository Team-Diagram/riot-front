module.exports = {
  plugins: ['vitest'],
  extends: ['plugin:vitest-globals/recommended', 'plugin:vitest/recommended'],
  env: {
    'vitest-globals/env': true,
  },
  rules: {
    'import/no-extraneous-dependencies': 'off',
  },
}
