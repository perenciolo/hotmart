module.exports = {
  purge: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Nunito Sans', 'Arial', 'sans-serif'],
    },
    extend: {
      colors: {
        navy: '#053d4e',
        hotgray: '#f4f6fa',
        'hotgray-dark': '#f0f3f7',
        primary: '#51c1c3',
        'slate-grey': '#5f6772',
        'custom-light-blue': '#00d7ce',
        'custom-blue': '#00c5fc',
        'success-100': '#edfff5',
        'success-400': '#4acc82',
        'success-500': '#009d43',
        'tealish-green': '#0fc75e',
        'nice-blue': '#0f68bd',
        'pale-blue': '#e7f2fd',
        offwhite: 'fafbfc',
      },
    },
  },
  variants: {},
  plugins: [],
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
};
