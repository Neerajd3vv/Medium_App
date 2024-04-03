/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        Hind:["Manrope", "sans-serif"],
        Actor:["Actor", "sans-serif"],
        Afacad:["Afacad", "sans-serif"],
        Fjalla:["Fjalla One", "sans-serif"],
        Abril:["Abril Fatface", "serif"],
        Protest:["Protest Strike", "sans-serif"],
        Merri:["Merriweather", "serif"],
        Poppins:["Manrope", "sans-serif"],
        Poppins:["Poppins", "sans-serif"],
        Mullish:["Mulish", "sans-serif"],
        Bebus:["Bebas Neue", "sans-serif"],
        Kanit:["Kanit", "sans-serif"],
        Sora : ["Sora", "sans-serif"],
        rowdies: ["Rowdies", "sans-serif"],
        proteststrike: ["Protest Strike", "sans-serif"],
        passion: ["Passion One", "sans-serif"]
      },
      colors: {
        "MainBlack": "#111111",
        "Myblue" : "#1F75FE",
        "heheblu" : "#6F00FF",
        "dukeblue" : "#012169",
        "redMe": "#fb8500",
        "bubblyblue": "#003049",
        "peela": "#f7b801",
        "tans": "#e5e5e5",
        "oceangreen" : "#a8dadc",
        "pata": "#4361ee",
        "mast" :"#eae2b7",
        "chuma": "#c4fff9",
        "skin": "#fefae0",
        "hehe": "#8ecae6",
        "hehetwo" : "#219ebc",
        "kuch" :"#f4f1de",
        "kuch1" : "#284b63"
      }
      
    },
    
  },
  plugins: [],
}

