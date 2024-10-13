module.exports = {
  content: [
    './content/**/*.{md,yml,json,json5,csv}', // Enable Tailwind to scan your content
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './app.vue',
  ],
  theme: {
    extend: {
      // Custom theme styles go here
    },
  },
  plugins: [],
}
