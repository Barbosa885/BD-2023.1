/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.tsx", "./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        regular: "Poppins_400Regular",
        medium: "Poppins_500Medium",
        bold: "Poppins_700Bold",
      }
    },
  },
  plugins: [],
}

