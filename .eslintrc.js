module.exports = {
	env: {
		'jest/globals': true,
	},
	root: true,
	extends: [
		'@react-native',
		'airbnb',
		'eslint:recommended',
		'airbnb/hooks',
		'airbnb-typescript',
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/recommended-requiring-type-checking',
		'plugin:prettier/recommended',
		'plugin:import/recommended',
		'plugin:react/recommended',
		'plugin:react/jsx-runtime',
	],
	parser: '@typescript-eslint/parser',
	ignorePatterns: ['plugins/**/*', 'metro.config.js'],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 'latest',
		sourceType: 'module',
		tsconfigRootDir: '.',
		project: ['./tsconfig.json'],
	},
	settings: {
		'import/resolver': {
			node: {
				extensions: ['.ts', '.tsx'],
			},
			typescript: {},
		},
		react: {
			version: '18.x',
		},
	},
	rules: {
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-unused-vars': 'error',
		'global-require': 0,
		'react-hooks/exhaustive-deps': 'off',
		'object-curly-spacing': ['error', 'always'],
		'array-bracket-spacing': ['error', 'never'],
		'react/require-default-props': 'off',
		'react/default-props-match-prop-types': ['error'],
		'react/sort-prop-types': ['error'],
		'react/no-array-index-key': 'off',
		'no-tabs': 'off',
		'no-void': 'off',
		'react/jsx-props-no-spreading': 'off',
		'import/prefer-default-export': 'off',
		'react/display-name': 'off',
		'react/function-component-definition': 'off',
		'quotes': 'off',
		'@typescript-eslint/no-unsafe-call': 'off',
		'@typescript-eslint/no-unsafe-assignment': 'off',
		'import/no-extraneous-dependencies': 'off',
		'react/no-unstable-nested-components': 'off',
		'@typescript-eslint/no-empty-interface': 'off',
		'@typescript-eslint/ban-ts-comment': 'off',
		'prefer-template': 'off',
		'@typescript-eslint/no-unsafe-argument': 'off',
		'@typescript-eslint/no-unsafe-return': 'off',
		'@typescript-eslint/no-unsafe-member-access': 'off',
		'@typescript-eslint/no-use-before-define': 'off',
		'no-param-reassign': 'off',
		'@typescript-eslint/restrict-plus-operands': 'off',
		'react/destructuring-assignment': 'off',
		'@typescript-eslint/no-misused-promises': 'off',
		'import/no-cycle' : 'off',
		"no-console": "off",
		"lines-between-class-members": "off",
		"@typescript-eslint/lines-between-class-members": "off",
		"eslint-disable-next-line": "off",
		"@typescript-eslint/no-floating-promises": "off",
		"eslint-disable": "off",
		"class-methods-use-this": "off",
		'prettier/prettier': [
			'off',
			{
				endOfLine: 'lf',
				tabWidth: 2,
				indentStyle: 'space',
				useTabs: true,
				arrowParens: 'avoid',
				bracketSameLine: false,
				singleQuote: true,
				trailingComma: 'all',
			},
		],
	},
};
