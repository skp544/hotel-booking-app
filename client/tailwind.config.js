/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    container: {
      padding: {
        xl: "10rem",
        md: "5rem",
        "340px": "2rem",
      },
    },
  },
  plugins: [],
};
