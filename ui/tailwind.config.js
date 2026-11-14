/** @type {import('tailwindcss').Config} */

// Dark design language: near-black violet surfaces, indigo ("iris") accent,
// translucent hairline borders. The default light-theme scales are re-pointed so
// every existing utility class renders correctly on a dark canvas:
//   gray/slate  - inverted (50 = faint surface ... 900 = near-white text)
//   hues        - 50..300 are dark tints (chips, borders), 500 is the solid
//                 colour, 600..900 are light tones for text on those tints.

const mix = (a, b, t) => {
  const p = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16))
  const A = p(a), B = p(b)
  return '#' + A.map((v, i) => Math.round(v * (1 - t) + B[i] * t).toString(16).padStart(2, '0')).join('')
}
const BASE_DARK = '#0b0714'
const hue = (base) => ({
  50:  mix(BASE_DARK, base, 0.11),
  100: mix(BASE_DARK, base, 0.17),
  200: mix(BASE_DARK, base, 0.30),
  300: mix(BASE_DARK, base, 0.46),
  400: mix(base, '#ffffff', 0.12),
  500: base,
  600: mix(base, '#ffffff', 0.34),
  700: mix(base, '#ffffff', 0.52),
  800: mix(base, '#ffffff', 0.68),
  900: mix(base, '#ffffff', 0.80),
  950: mix(base, '#ffffff', 0.90),
})

const iris = {
  50: '#15112e', 100: '#1c1740', 200: '#2a2260', 300: '#3c33a0', 400: '#7d86ff',
  500: '#6247ff', 600: '#6f5aff', 700: '#9aa0ff', 800: '#b6baff', 900: '#d0d3ff', 950: '#e8e9ff',
}
const ink = {
  50: '#150f1d', 100: '#1b1425', 200: '#2a2236', 300: '#3a3149', 400: '#8a8799',
  500: '#a29fb2', 600: '#bcb9c9', 700: '#d3d1de', 800: '#e8e6f0', 900: '#f5f4fa', 950: '#ffffff',
}
const danger = hue('#ff5d3d')
const secure = hue('#25bb49')
const signal = hue('#ff9e2c')

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
        slate: ink,
        zinc: ink,
        neutral: ink,
        red: danger,
        rose: hue('#ff5d7a'),
        emerald: secure,
        green: secure,
        teal: hue('#2dd4bf'),
        orange: signal,
        amber: hue('#f5a524'),
        yellow: hue('#eab308'),
        lime: hue('#84cc16'),
        violet: hue('#8b5cf6'),
        purple: hue('#a855f7'),
        fuchsia: hue('#d946ef'),
        pink: hue('#ec4899'),
        indigo: hue('#6366f1'),
        cyan: hue('#22d3ee'),
        sky: hue('#38bdf8'),
        canvas: '#07010d',
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
        glow: '0 0 0 1px rgba(77,48,255,0.28), 0 8px 32px rgba(77,48,255,0.22)',
      },
    },
  },
  plugins: [],
}
