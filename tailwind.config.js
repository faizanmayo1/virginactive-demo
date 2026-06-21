import animate from 'tailwindcss-animate'

// Virgin Active — "Pulse". Athletic charcoal structure on a near-white canvas,
// one electric AZURE accent carrying brand energy + the AI / computer-vision layer.
// Green / amber / red are reserved STRICTLY for compliance status (pass / at-risk / breach).
// Token keys kept as steel/amber (+ navy/red/sky aliases) so shared shadcn primitives
// stay wired unedited; only the VALUES are remapped to the Pulse palette.

// Structure / primary — athletic charcoal-graphite (echoes Virgin Active's bold black)
const steel = {
  DEFAULT: '#1B1E24',
  raised: '#23262E',
  line: '#30343D',
  muted: '#8A9099',
  soft: '#C4C8CE',
  fore: '#EEF0F2',
  50: '#F4F5F7',
  100: '#E7E9EC',
  200: '#CDD1D7',
  300: '#A7ADB6',
  400: '#737A85',
  500: '#4A5059',
  600: '#2E333B',
  700: '#23262E',
  800: '#1B1E24',
  900: '#121419',
}

// Electric AZURE accent — brand highlight + AI / computer-vision moments + live pulse
const azure = {
  DEFAULT: '#1F6FEB',
  deep: '#1858C4',
  soft: '#E1ECFD',
  glow: '#5B93F3',
  50: '#EFF5FE',
  100: '#DDEAFD',
  200: '#BBD4FB',
  300: '#8FB8F8',
  400: '#5B93F3',
  500: '#1F6FEB',
  600: '#1A5FD0',
  700: '#1A4FA8',
}

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    container: { center: true, padding: '2rem', screens: { '2xl': '1400px' } },
    extend: {
      fontFamily: {
        display: ['"Hanken Grotesk"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"Spline Sans Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: { DEFAULT: 'hsl(var(--primary))', foreground: 'hsl(var(--primary-foreground))' },
        secondary: { DEFAULT: 'hsl(var(--secondary))', foreground: 'hsl(var(--secondary-foreground))' },
        destructive: { DEFAULT: 'hsl(var(--destructive))', foreground: 'hsl(var(--destructive-foreground))' },
        muted: { DEFAULT: 'hsl(var(--muted))', foreground: 'hsl(var(--muted-foreground))' },
        accent: { DEFAULT: 'hsl(var(--accent))', foreground: 'hsl(var(--accent-foreground))' },
        popover: { DEFAULT: 'hsl(var(--popover))', foreground: 'hsl(var(--popover-foreground))' },
        card: { DEFAULT: 'hsl(var(--card))', foreground: 'hsl(var(--card-foreground))' },

        // Virgin Active "Pulse" palette
        canvas: { DEFAULT: '#FAFBFC', subtle: '#F1F3F5', raised: '#FFFFFF' },
        ink: { DEFAULT: '#14161A', muted: '#4A4F57', subtle: '#6B7280', faint: '#9AA0A8' },
        hairline: { DEFAULT: '#E7E9ED', strong: '#D6D9DE' },
        // Structure — charcoal
        steel,
        // Electric azure — brand + AI
        amber: azure,
        azure,
        volt: azure,
        // Back-compat aliases so shared shadcn components stay on-brand
        navy: steel,
        red: azure,
        sky: azure,
        // Compliance status — RESERVED traffic-light semantics
        signal: {
          positive: '#16A34A',
          'positive-soft': '#DCFCE7',
          warning: '#D97706',
          'warning-soft': '#FEF3C7',
          risk: '#DC2626',
          'risk-soft': '#FEE2E2',
          info: '#2563EB',
          'info-soft': '#DBEAFE',
          neutral: '#64748B',
          'neutral-soft': '#F1F5F9',
        },
      },
      borderRadius: { lg: 'var(--radius)', md: 'calc(var(--radius) - 2px)', sm: 'calc(var(--radius) - 4px)' },
      boxShadow: {
        'card-sm': '0 1px 2px rgba(20, 22, 26, 0.04), 0 2px 6px rgba(20, 22, 26, 0.04)',
        card: '0 2px 4px rgba(20, 22, 26, 0.05), 0 8px 20px -4px rgba(20, 22, 26, 0.07)',
        'card-md': '0 4px 10px rgba(20, 22, 26, 0.06), 0 14px 32px -6px rgba(20, 22, 26, 0.10)',
        'card-lg': '0 18px 50px -10px rgba(20, 22, 26, 0.22), 0 6px 14px -4px rgba(20, 22, 26, 0.08)',
        inset: 'inset 0 0 0 1px rgba(20, 22, 26, 0.05)',
        'volt-glow': '0 0 0 4px rgba(31, 111, 235, 0.14)',
        'volt-lift': '0 10px 30px -8px rgba(31, 111, 235, 0.28), 0 4px 10px -4px rgba(20, 22, 26, 0.12)',
        'cta': '0 6px 18px -4px rgba(31, 111, 235, 0.42), inset 0 1px 0 rgba(255, 255, 255, 0.18)',
        'device': '0 30px 60px -18px rgba(20, 22, 26, 0.42), 0 12px 24px -10px rgba(20, 22, 26, 0.22)',
      },
      letterSpacing: { 'tight-bank': '-0.02em', 'wide-eyebrow': '0.08em' },
      keyframes: {
        'accordion-down': { from: { height: '0' }, to: { height: 'var(--radix-accordion-content-height)' } },
        'accordion-up': { from: { height: 'var(--radix-accordion-content-height)' }, to: { height: '0' } },
        'fade-in': { from: { opacity: '0', transform: 'translateY(4px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        'scan-sweep': { '0%': { transform: 'translateY(-10%)', opacity: '0' }, '15%': { opacity: '1' }, '85%': { opacity: '1' }, '100%': { transform: 'translateY(940%)', opacity: '0' } },
        'slide-in-right': { from: { opacity: '0', transform: 'translateX(16px)' }, to: { opacity: '1', transform: 'translateX(0)' } },
        'pulse-soft': { '0%, 100%': { opacity: '1' }, '50%': { opacity: '0.45' } },
        'pulse-ring': { '0%': { transform: 'scale(0.7)', opacity: '0.7' }, '100%': { transform: 'scale(2.2)', opacity: '0' } },
        'stream-in': { from: { opacity: '0', transform: 'translateY(-8px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        'ring-fill': { from: { strokeDashoffset: 'var(--ring-circ)' }, to: { strokeDashoffset: 'var(--ring-offset)' } },
        'box-in': { from: { opacity: '0', transform: 'scale(0.92)' }, to: { opacity: '1', transform: 'scale(1)' } },
        ticker: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.4s ease-out both',
        shimmer: 'shimmer 2.4s linear infinite',
        'scan-sweep': 'scan-sweep 2.4s cubic-bezier(0.4,0,0.2,1) infinite',
        'slide-in-right': 'slide-in-right 0.28s ease-out both',
        'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 1.8s ease-out infinite',
        'stream-in': 'stream-in 0.5s ease-out both',
        'ring-fill': 'ring-fill 1.1s cubic-bezier(0.4,0,0.2,1) both',
        'box-in': 'box-in 0.4s cubic-bezier(0.34,1.56,0.64,1) both',
      },
    },
  },
  plugins: [animate],
}
