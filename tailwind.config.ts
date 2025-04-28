import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'eerie-black': 'hsl(var(--eerie-black))',
        'floral-white': 'hsl(var(--floral-white))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        tertiary: {
          DEFAULT: 'hsl(var(--tertiary))',
          foreground: 'hsl(var(--tertiary-foreground))',
          border: 'hsl(var(--tertiary-border))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        modules: {
          blue: {
            DEFAULT: 'hsl(var(--modules-blue))',
            foreground: 'hsl(var(--modules-blue-foreground))',
          },
          green: {
            DEFAULT: 'hsl(var(--modules-green))',
            foreground: 'hsl(var(--modules-green-foreground))',
          },
          red: {
            DEFAULT: 'hsl(var(--modules-red))',
            foreground: 'hsl(var(--modules-red-foreground))',
          },
          yellow: {
            DEFAULT: 'hsl(var(--modules-yellow))',
            foreground: 'hsl(var(--modules-yellow-foreground))',
          },
          orange: {
            DEFAULT: 'hsl(var(--modules-orange))',
            foreground: 'hsl(var(--modules-orange-foreground))',
          },
          pink: {
            DEFAULT: 'hsl(var(--modules-pink))',
            foreground: 'hsl(var(--modules-pink-foreground))',
          },
          purple: {
            DEFAULT: 'hsl(var(--modules-purple))',
            foreground: 'hsl(var(--modules-purple-foreground))',
          },
          beige: {
            DEFAULT: 'hsl(var(--modules-beige))',
            foreground: 'hsl(var(--modules-beige-foreground))',
            dark: 'hsl(var(--modules-beige-dark))',
            light: 'hsl(var(--modules-beige-light))',
            completion: 'hsl(var(--modules-beige-completion))',
          },
          'gray-light': 'hsl(var(--modules-gray-light))',
          'soft-dark': 'hsl(var(--modules-soft-dark))',
        },
        rose: 'hsl(var(--rose))',
        'text-detail': 'hsl(var(--text-detail))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
