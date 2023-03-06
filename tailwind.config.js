module.exports = {
  content:
    [ "./client/**/*.{tsx,ts}"
    , "./client/app.tsx"
    ],
  safelist: [ ],
  theme: {
    extend: {
        colors: {
            "primary-dark": '#5F62F2',
            "primary": '#727CF5',
            "gray-light": '#efeef3',
            gray: '#BEC0DA',
        },
    },
  },
  plugins: [],
}
