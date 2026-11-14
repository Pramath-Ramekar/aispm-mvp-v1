/** @type {import('tailwindcss').Config} */

// Design language: near-black violet chrome, indigo ("iris") accent, ink-tinted
// neutrals, rounded surfaces, hairline borders. Status colours: danger / secure / signal.
const iris = {
  50:  '#f2f1ff', 100: '#e2e4ff', 200: '#c9ccff', 300: '#a9adff', 400: '#7d86ff',
  500: '#6247ff', 600: '#4d30ff', 700: '#2c20db', 800: '#2519ae', 900: '#1d1580', 950: '#120d52',
}
const ink = {
  50:  '#f7f7f9', 100: '#f1f1f4', 200: '#e6e6ec', 300: '#d3d4dd', 400: '#9097a6',
  500: '#6b7384', 600: '#4f5667', 700: '#373c4b', 800: '#232632', 900: '#12151c', 950: '#07010d',
}
const danger = {
  50:  '#fff1ee', 100: '#ffe1db', 200: '#ffc4b8', 300: '#ff9d8a', 400: '#ff7a5e',
  500: '#ff5d3d', 600: '#e8452a', 700: '#bf351f', 800: '#992d1d', 900: '#7d291e', 950: '#44120b',
}
const secure = {
  50:  '#effcf2', 100: '#d6f7de', 200: '#aeedbf', 300: '#78de95', 400: '#45cb6c',
  500: '#25bb49', 600: '#1a9a3a', 700: '#187a31', 800: '#17612b', 900: '#145026', 950: '#072d14',
}
const signal = {
  50:  '#fff6ea', 100: '#ffeacc', 200: '#ffd29b', 300: '#ffb765', 400: '#ffa63f',
  500: '#ff9e2c', 600: '#ee8310', 700: '#c4650c', 800: '#9b4f10', 900: '#7c4211', 950: '#432206',
}

export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans:    ['Onest', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        display: ['"Space Grotesk"', 'Onest', 'sans-serif'],
      },
      colors: {
        blue: iris,
        gray: ink,
        red: danger,
        emerald: secure,
        green: secure,
        orange: signal,
        canvas: '#f4f4f6',
        void: '#07010d',
        level: '#110b17',
      },
      borderRadius: {
        lg: '0.75rem',
        xl: '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(77,48,255,0.25), 0 8px 32px rgba(77,48,255,0.18)',
      },
    },
  },
  plugins: [],
}
