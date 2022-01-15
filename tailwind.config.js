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
        '150': '40rem'
      },
      borderWidth: {
        '2': '2px',
        '20': '20px',
        '8': '8px',
      },
      
    },
  },
  plugins: [],
}
