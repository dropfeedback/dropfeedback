import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

// https://vitejs.dev/config/
export default defineConfig({
	root: "./packages/lib/",
	build: {
		outDir: "../../dist",
		target: "modules",
		emptyOutDir: true,
		lib: {
			entry: "./index.ts",
			fileName: "index",
			name: "dropfeedback"
		}
	},
	plugins: [
		svelte({
			exclude: /\.wc\.svelte$/ as any,
			compilerOptions: {
				customElement: false
			}
		}),
		svelte({
			include: /\.wc\.svelte$/ as any
		})
	]
});
