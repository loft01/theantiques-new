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
        // FF Design System Colors
        'bg-primary': '#0E0E0E',
        'bg-secondary': '#141414',
        'bg-tertiary': '#1B1B1B',
        'border-primary': '#2A2A2A',
        'border-secondary': '#333333',
        'text-primary': '#EDEDED',
        'text-secondary': '#B5B5B5',
        'text-tertiary': '#7A7A7A',
        'accent-primary': '#EDEDED',
        'accent-muted': '#8A8A8A',

        // Legacy shadcn compatibility
        background: '#0E0E0E',
        foreground: '#EDEDED',
        card: {
          DEFAULT: '#141414',
          foreground: '#EDEDED',
        },
        popover: {
          DEFAULT: '#141414',
          foreground: '#EDEDED',
        },
        primary: {
          DEFAULT: '#EDEDED',
          foreground: '#0E0E0E',
        },
        secondary: {
          DEFAULT: '#1B1B1B',
          foreground: '#EDEDED',
        },
        muted: {
          DEFAULT: '#1B1B1B',
          foreground: '#7A7A7A',
        },
        accent: {
          DEFAULT: '#1B1B1B',
          foreground: '#EDEDED',
        },
        destructive: {
          DEFAULT: '#EF4444',
          foreground: '#EDEDED',
        },
        border: '#2A2A2A',
        input: '#2A2A2A',
        ring: '#EDEDED',
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
