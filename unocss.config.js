import { defineConfig, presetIcons, presetTypography, presetUno, presetWebFonts } from 'unocss';

export default defineConfig({
	theme: {
		colors: {
			primary: 'var(--color-primary)',
			secondary: '#6c757d'
		}
	},
	shortcuts: [],
	presets: [
		presetUno(),
		presetIcons({
			cdn: 'https://esm.sh/',
			prefix: 'i-',
			extraProperties: {
				display: 'inline-block',
				'vertical-align': 'middle'
			}
		}),
		presetTypography({
			cssExtend: {}
		}),
		presetWebFonts({
			provider: 'bunny',
			fonts: {
				serif: 'Noto Serif SC'
			}
		})
	],
	safelist: ['prose']
});
