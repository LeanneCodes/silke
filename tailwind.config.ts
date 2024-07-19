import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        playwrite: ['Playwrite BE VLG', 'sans-serif'],
      },
      colors: {
        white: '#FFFFFF',
        mustard: '#d2a767',
        sage: '#9ca490',
        offBlack: '#040c13',
        darkGrey: '#2e343c'
      },
      screens: {
        xxs: '360px',  // Extra extra small devices
        xs: '480px',   // Extra small devices
        sm: '640px',   // Small devices
        md: '768px',   // Medium devices
        lg: '1024px',  // Large devices
        xl: '1280px',  // Extra large devices
        xxl: '1536px', // Extra extra large devices
      },
    },
  },
  plugins: [],
};

export default config;
