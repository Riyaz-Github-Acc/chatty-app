import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import simpleImportSort from "eslint-plugin-simple-import-sort";
import eslintPluginTypeScript from '@typescript-eslint/eslint-plugin';

export default tseslint.config(
    {
        ignores: ['dist', 'node_modules'],
    },
    {
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            parser: tseslint.parser,
            ecmaVersion: 2020,
            sourceType: 'module',
            globals: globals.browser,
        },
        plugins: {
            '@typescript-eslint': eslintPluginTypeScript,
            react,
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
            "simple-import-sort": simpleImportSort,
        },
        rules: {
            ...js.configs.recommended.rules,
            ...tseslint.configs.recommended[0].rules,
            ...react.configs.recommended.rules,
            ...reactHooks.configs.recommended.rules,
            'react-refresh/only-export-components': [
                'warn',
                { allowConstantExport: true },
            ],
            "no-unused-vars": "off",
            "@typescript-eslint/no-unused-vars": ["warn",
                {
                    varsIgnorePattern: "^_",
                    argsIgnorePattern: "^_",
                },
            ],
            '@typescript-eslint/no-explicit-any': 'warn',
            "simple-import-sort/imports": "warn",
            "simple-import-sort/exports": "warn",
            'react/react-in-jsx-scope': 'off',
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
    }
)
