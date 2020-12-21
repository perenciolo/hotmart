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
        'custom-light-blue':'#00d7ce',
        'custom-blue':'#00c5fc',
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
