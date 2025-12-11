import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        neon: {
          pink: '#ff00ff',
          cyan: '#00ffff',
          green: '#00ff00',
          yellow: '#ffff00',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: '0px',
        md: '0px',
        sm: '0px',
      },
      fontFamily: {
        system: ['"MS Sans Serif"', 'Arial', 'sans-serif'],
        pixel: ['"Press Start 2P"', 'cursive'],
      },
      boxShadow: {
        'win98-inset': 'inset -1px -1px 0 0 #fff, inset 1px 1px 0 0 #000, inset -2px -2px 0 0 #dfdfdf, inset 2px 2px 0 0 #808080',
        'win98-outset': 'inset -1px -1px 0 0 #000, inset 1px 1px 0 0 #fff, inset -2px -2px 0 0 #808080, inset 2px 2px 0 0 #dfdfdf',
        'win98-button': 'inset -1px -1px 0 0 #000, inset 1px 1px 0 0 #fff, inset -2px -2px 0 0 #808080, inset 2px 2px 0 0 #dfdfdf',
        'win98-pressed': 'inset -1px -1px 0 0 #fff, inset 1px 1px 0 0 #000',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
