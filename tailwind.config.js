module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      zIndex: {
        '1': '1',
        '4': '4',
        '2': '2',
      },
      borderRadius:{
        'xl':'1rem'
      },
      dropShadow:{
        'sl':"0px 5px 15px 0px rgba(0, 0, 0, 10%)"
      },
      minHeight:{
        '100px':'100px'
      }
    },
  },
  plugins: [],
}