//  /** @type {import('tailwindcss').Config} */
// export default {
//    content: ["./src/**/*.{html,js}"],
//    theme: {
//      extend: {},
//    },
//    plugins: [],
//  }
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
