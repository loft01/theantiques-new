import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // FF Design System Colors - using RGB CSS variables for opacity support
        'bg-primary': 'rgb(var(--bg-primary-rgb) / <alpha-value>)',
        'bg-secondary': 'rgb(var(--bg-secondary-rgb) / <alpha-value>)',
        'bg-tertiary': 'rgb(var(--bg-tertiary-rgb) / <alpha-value>)',
        'border-primary': 'rgb(var(--border-primary-rgb) / <alpha-value>)',
        'border-secondary': 'rgb(var(--border-secondary-rgb) / <alpha-value>)',
        'text-primary': 'rgb(var(--text-primary-rgb) / <alpha-value>)',
        'text-secondary': 'rgb(var(--text-secondary-rgb) / <alpha-value>)',
        'text-tertiary': 'rgb(var(--text-tertiary-rgb) / <alpha-value>)',
        'accent-primary': 'rgb(var(--accent-primary-rgb) / <alpha-value>)',
        'accent-muted': 'rgb(var(--accent-muted-rgb) / <alpha-value>)',
        'product-bg': 'rgb(var(--product-bg-rgb) / <alpha-value>)',

        // Legacy shadcn compatibility - using RGB CSS variables
        background: 'rgb(var(--bg-primary-rgb) / <alpha-value>)',
        foreground: 'rgb(var(--text-primary-rgb) / <alpha-value>)',
        card: {
          DEFAULT: 'rgb(var(--bg-secondary-rgb) / <alpha-value>)',
          foreground: 'rgb(var(--text-primary-rgb) / <alpha-value>)',
        },
        popover: {
          DEFAULT: 'rgb(var(--bg-secondary-rgb) / <alpha-value>)',
          foreground: 'rgb(var(--text-primary-rgb) / <alpha-value>)',
        },
        primary: {
          DEFAULT: 'rgb(var(--text-primary-rgb) / <alpha-value>)',
          foreground: 'rgb(var(--bg-primary-rgb) / <alpha-value>)',
        },
        secondary: {
          DEFAULT: 'rgb(var(--bg-tertiary-rgb) / <alpha-value>)',
          foreground: 'rgb(var(--text-primary-rgb) / <alpha-value>)',
        },
        muted: {
          DEFAULT: 'rgb(var(--bg-tertiary-rgb) / <alpha-value>)',
          foreground: 'rgb(var(--text-tertiary-rgb) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'rgb(var(--bg-tertiary-rgb) / <alpha-value>)',
          foreground: 'rgb(var(--text-primary-rgb) / <alpha-value>)',
        },
        destructive: {
          DEFAULT: '#EF4444',
          foreground: '#FFFFFF',
        },
        border: 'rgb(var(--border-primary-rgb) / <alpha-value>)',
        input: 'rgb(var(--border-primary-rgb) / <alpha-value>)',
        ring: 'rgb(var(--text-primary-rgb) / <alpha-value>)',
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'sans-serif',
        ],
      },
      spacing: {
        'gutter': '24px',
        'section': '96px',
        'section-mobile': '64px',
      },
      maxWidth: {
        'editorial': '1400px',
      },
      transitionDuration: {
        'fast': '150ms',
        'normal': '200ms',
      },
      transitionTimingFunction: {
        'default': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      zIndex: {
        'base': '0',
        'dropdown': '10',
        'sticky': '20',
        'header': '30',
        'overlay': '40',
        'modal': '50',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
