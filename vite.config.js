import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import UnoCSS from '@unocss/svelte-scoped/vite';
import transformerDirectives from '@unocss/transformer-directives';

export default defineConfig({
	plugins: [
		UnoCSS({
			onlyGlobal: true,
			injectReset: '@unocss/reset/tailwind.css',
			cssFileTransformers: [transformerDirectives()]
		}),
		sveltekit()
	]
});
