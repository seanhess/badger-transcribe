module.exports = {
  content:
    [ "./client/**/*.{tsx,ts}"
    , "./client/app.tsx"
    ],
  safelist: [ ],
  theme: {
    extend: {
        colors: {
            "primary-dark": '#1867bd',
            "primary": '#1e83ec',
            "gray-light": '#efeef3',
            "gray": '#BEC0DA',
            "gray-dark": '#666',
        },
        transitionProperty: {
          'width': 'width'
        },
    },
  },
  plugins: [],
}
