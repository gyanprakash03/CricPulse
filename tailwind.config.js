/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        changa: ['Changa', 'sans-serif'],
      },
      boxShadow: {
        navBox: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
        matchCard: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
      },
    },
  },
  plugins: [],
};
