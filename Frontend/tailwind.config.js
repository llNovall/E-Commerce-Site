/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{html,ts,scss}"],
  theme: {
    fontFamily: {
      sans: ["Josefin Sans", "Roboto", "sans-serif"]
    },
    extend: {
      colors: {
        "c1" : "#594545",
        "c2" : "#815B5B",
        "c3" : "#9E7676",
        "c4" : "#FFF8EA"
      },
      animation:{
        "fadeIn" : 'fadeIn 2s ease-in-out'
      },

      keyframes: theme => (
        {
          fadeIn: {
            '0%': { opacity:0},
            '100%': { opacity:1},
          },
        }
      )
    },
    
  },
  plugins: [],
}

