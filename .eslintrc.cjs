module.exports = {
	extends: ['resourge/react'],
	rules: {
		'resourge-custom-react/no-index': 'off',
		'resourge-custom-react/folder-file-convention': 'off',
		'@typescript-eslint/no-unsafe-argument': 'off'
	},
	ignorePatterns: ['src/examples/**/*', 'src/todo/**/*'],
	overrides: [
		{
			files: ['*.ts', '*.tsx', '*.js', '*.cjs'], // Your TypeScript files extension
			parserOptions: {
				project: ['./tsconfig.app.json'] // Specify it only for TypeScript files
			}
		}
	]
};
