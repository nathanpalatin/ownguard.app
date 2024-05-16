/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./App.{ts,tsx}', './src/**/*.{ts,tsx}'],
	presets: [require('nativewind/preset')],
	theme: {
		extend: {
			colors: {
				primary: '#ADFF87',
				secondary: '#E1E1E6',
			},
			backgroundColor: {
				primary: '#ADFF87',
				bluevariant: '#24B2E2',
				header: '#01A6DE',
			},
			fontFamily: {
				bold: 'Inter_700Bold',
				medium: 'Inter_500Medium',
				regular: 'Inter_400Regular',
			},
		},
	},
	plugins: [],
}
