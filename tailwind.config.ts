import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'soft-terracotta': '#E8B4A0',
        'deep-sage': '#7A918D',
        'warm-white': '#FDFBF7',
        'warm-blush': '#F5E6E3',
      },
      fontFamily: {
        heading: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
