module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        'home-bg': "url('/public/game-screen-image.jpg')",
        'about-bg': "url('./public/card-back-dark.jpg')",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
