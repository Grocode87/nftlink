module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
   
    extend: {
      width: {
        '128': '32rem',
        '256': '64rem'
      },
      height: {
        '128': '32rem',
        '150': '36rem'
      },
      borderWidth: {
        '2': '2px',
        '8': '8px',
        '12': '12px',
        '20': '20px',
      },
      borderRadius: {
        '4xl': '38px',
      }
      
    },
  },
  plugins: [],
}
