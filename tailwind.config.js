module.exports = {
  content:
    [ "./client/**/*.{tsx,ts}"
    , "./client/app.tsx"
    ],
  safelist: [ ],
  theme: {
    extend: {
        colors: {
            "primary-dark": '#727CF5',
            "primary": '#1e83ec',
            "gray-light": '#efeef3',
            gray: '#BEC0DA',
        },
    },
  },
  plugins: [],
}
