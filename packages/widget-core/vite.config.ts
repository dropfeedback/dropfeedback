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
			name: "dropfeedback",
			formats: ["es", "umd"],
			fileName: (format) =>
				({
					es: "index.js",
					umd: "index.umd.js"
				})[format]
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
