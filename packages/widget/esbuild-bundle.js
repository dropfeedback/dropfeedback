import esbuild from 'esbuild';
import esbuildSvelte from 'esbuild-svelte';
import sveltePreprocess from 'svelte-preprocess';

esbuild
	.build({
		entryPoints: ['./src/lib/index.js'],
		bundle: true,
		// outfile: 'dist/feedbacky-widget.js',
		outfile: '../../apps/demo/src/feedbacky-widget.js',
		minify: true,
		minifyIdentifiers: true,
		minifySyntax: true,
		sourcemap: false,
		target: ['es2015'],
		mainFields: ['svelte', 'browser', 'module', 'main'],
		conditions: ['svelte', 'browser'],
		plugins: [
			esbuildSvelte({
				compilerOptions: {
					customElement: true
				},
				preprocess: sveltePreprocess()
			})
		],
		logLevel: 'info'
	})
	.catch(() => process.exit(1));
