import deepmerge from '@fastify/deepmerge'
import { resolve } from 'path'
import { defineConfig, type UserConfigExport } from 'vite'
import banner from 'vite-plugin-banner'
import dts from 'vite-plugin-dts'
import viteTsconfigPaths from 'vite-tsconfig-paths'

import PackageJson from '../package.json'

import { createBanner } from './createBanner'
import { packages } from './getPackages'

const {
	dependencies = {}, devDependencies = {}, peerDependencies  = {}
} = PackageJson as any;

const external = [
	'react/jsx-runtime',
	...Object.keys(peerDependencies),
	...Object.keys(dependencies),
	...Object.keys(devDependencies)
].filter((key) => key !== 'on-change')

const packagesNames = packages.map((pack) => pack.name);

const entryLib = './src/lib/index.ts';

const deepMerge = deepmerge();

export const defineLibConfig = (
	config: UserConfigExport,
	afterBuild?: (() => void | Promise<void>)
): UserConfigExport => defineConfig((originalConfig) => deepMerge(
	typeof config === 'function' ? config(originalConfig) : config,
	{
		test: {
			globals: true,
			environment: 'jsdom',
			setupFiles: './src/setupTests.ts'
		},
		build: {
			minify: false,
			lib: {
				entry: entryLib,
				formats: ['es'],
				name: 'index',
				fileName: 'index',
			},
			outDir: './dist',
			sourcemap: true,
			rollupOptions: {
				output: {
					dir: './dist'
				},
				external
			}
		},
		resolve: {
			preserveSymlinks: true
		},
		plugins: [
			banner(createBanner()),
			viteTsconfigPaths(),
			dts({
				insertTypesEntry: true,
				rollupTypes: true,
				bundledPackages: packagesNames,
				compilerOptions: {
					preserveSymlinks: true,
					paths: {}
				},
				afterBuild
			})
		]
	}
));
