import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors: {
      'background': '#F2FDFF',
      'primary': '#4797C8',
      'primary-h': '#227CB3',
      'secondary': '#7796bc',
      'red-200': '#DE5543',
      'red-100': '#C64A3A',
      'white': '#fff',
      'green-200': '#4ECA59',
      'green-100': '#45AB4E'
    }
  },
  plugins: [],
};
export default config;
