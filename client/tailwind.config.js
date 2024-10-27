/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        lg: { max: "1440px" }, // `lg` will apply up to 1440px
        xl: "1441px", // `xl` will apply from 1441px and above
      },
      height: {
        "86dvh": "86dvh",
        "87dvh": "87dvh",
        "88dvh": "88dvh",
        "89dvh": "89dvh",
        "90dvh": "90dvh",
      },
      minHeight: {
        "90dvh": "90dvh",
        "91dvh": "91dvh",
        "92dvh": "92dvh",
      },
    },
  },
  plugins: [],
};
