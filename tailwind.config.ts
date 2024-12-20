import type { Config } from "tailwindcss";
import flowbitePlugin from "flowbite/plugin";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
        backgroundImage: {
        'split-1-3': 'linear-gradient(to right, #1e293b 40%, white 40%)',
      },
    },
  },
  plugins: [
    flowbitePlugin,
    // Otros plugins
  ],
};
export default config;
