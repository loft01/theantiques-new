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
        // Background colors
        background: '#09090B',
        'bg-primary': '#09090B',
        'bg-secondary': '#18181B',
        'bg-tertiary': '#27272A',
        'bg-elevated': '#3F3F46',

        // Text colors
        foreground: '#FAFAFA',
        'text-primary': '#FAFAFA',
        'text-secondary': '#A1A1AA',
        'text-tertiary': '#71717A',
        'text-muted': '#52525B',

        // Border colors
        border: '#27272A',
        'border-default': '#27272A',
        'border-subtle': '#3F3F46',

        // Semantic colors
        success: '#22C55E',
        'success-muted': 'rgba(34, 197, 94, 0.1)',
        warning: '#F59E0B',
        'warning-muted': 'rgba(245, 158, 11, 0.1)',
        error: '#EF4444',
        'error-muted': 'rgba(239, 68, 68, 0.1)',
        info: '#3B82F6',

        // Legacy shadcn compatibility
        card: {
          DEFAULT: '#18181B',
          foreground: '#FAFAFA',
        },
        popover: {
          DEFAULT: '#18181B',
          foreground: '#FAFAFA',
        },
        primary: {
          DEFAULT: '#FAFAFA',
          foreground: '#09090B',
        },
        secondary: {
          DEFAULT: '#27272A',
          foreground: '#FAFAFA',
        },
        muted: {
          DEFAULT: '#27272A',
          foreground: '#A1A1AA',
        },
        accent: {
          DEFAULT: '#27272A',
          foreground: '#FAFAFA',
        },
        destructive: {
          DEFAULT: '#EF4444',
          foreground: '#FAFAFA',
        },
        input: '#27272A',
        ring: '#FAFAFA',
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'SF Pro',
          'Segoe UI',
          'sans-serif',
        ],
      },
      fontSize: {
        // Typography scale from design tokens
        'display': ['32px', { lineHeight: '40px', letterSpacing: '-0.02em', fontWeight: '700' }],
        'title-1': ['24px', { lineHeight: '32px', letterSpacing: '-0.01em', fontWeight: '700' }],
        'title-2': ['20px', { lineHeight: '28px', fontWeight: '600' }],
        'title-3': ['18px', { lineHeight: '24px', fontWeight: '600' }],
        'body': ['16px', { lineHeight: '24px', fontWeight: '400' }],
        'body-medium': ['16px', { lineHeight: '24px', fontWeight: '500' }],
        'body-bold': ['16px', { lineHeight: '24px', fontWeight: '600' }],
        'caption': ['14px', { lineHeight: '20px', fontWeight: '400' }],
        'caption-medium': ['14px', { lineHeight: '20px', fontWeight: '500' }],
        'small': ['12px', { lineHeight: '16px', fontWeight: '400' }],
        'small-medium': ['12px', { lineHeight: '16px', fontWeight: '500' }],
      },
      borderRadius: {
        'none': '0px',
        'sm': '6px',
        'md': '12px',
        'lg': '16px',
        'xl': '20px',
        '2xl': '24px',
        'full': '9999px',
      },
      spacing: {
        // Design token spacing
        '0': '0px',
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '5': '20px',
        '6': '24px',
        '7': '28px',
        '8': '32px',
        '9': '36px',
        '10': '40px',
        '11': '44px',
        '12': '48px',
        '14': '56px',
        '16': '64px',
      },
      boxShadow: {
        'none': 'none',
        'sm': '0 1px 2px rgba(0, 0, 0, 0.1)',
        'md': '0 4px 12px rgba(0, 0, 0, 0.15)',
        'lg': '0 8px 24px rgba(0, 0, 0, 0.2)',
        'xl': '0 12px 40px rgba(0, 0, 0, 0.25)',
      },
      transitionDuration: {
        'fast': '100ms',
        'normal': '200ms',
        'slow': '300ms',
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
        'popover': '60',
        'toast': '70',
      },
      height: {
        'button': '56px',
        'button-sm': '36px',
        'input': '56px',
        'header': '64px',
        'touch': '44px',
      },
      minHeight: {
        'touch': '44px',
      },
      minWidth: {
        'touch': '44px',
      },
      maxWidth: {
        'modal': '360px',
        'content': '480px',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
