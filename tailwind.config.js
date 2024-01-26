const { nextui } = require("@nextui-org/react");
const typography = require('@tailwindcss/typography');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            color: '#000',
            '--tw-prose-bullets': '#000',
            'ul > li::before': { backgroundColor: 'var(--tw-prose-bullets)' },
          },
        },
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui(),
    typography],
}
