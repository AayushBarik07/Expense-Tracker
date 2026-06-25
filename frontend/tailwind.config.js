/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'app-bg': 'var(--bg-main)',
        'secondary-bg': 'var(--bg-sec)',
        'sidebar-bg': 'var(--panel)',
        'primary-card': 'var(--card)',
        'elevated-card': 'var(--card-hover)',
        'borders': 'var(--border)',
        'primary-text': 'var(--text-primary)',
        'secondary-text': 'var(--text-secondary)',
        'muted-text': 'var(--text-muted)',
        
        'dark-bg-main': 'var(--bg-main)',
        'dark-bg-sec': 'var(--bg-sec)',
        'dark-panel': 'var(--panel)',
        'dark-card': 'var(--card)',
        'dark-card-hover': 'var(--card-hover)',
        'dark-border': 'var(--border)',
        'dark-text-primary': 'var(--text-primary)',
        'dark-text-secondary': 'var(--text-secondary)',
        'dark-text-muted': 'var(--text-muted)',
        
        'light-bg-main': 'var(--bg-main)',
        'light-bg-sec': 'var(--bg-sec)',
        'light-panel': 'var(--panel)',
        'light-card': 'var(--card)',
        'light-card-hover': 'var(--card-hover)',
        'light-border': 'var(--border)',
        'light-text-primary': 'var(--text-primary)',
        'light-text-secondary': 'var(--text-secondary)',
        'light-text-muted': 'var(--text-muted)',

        'accent-electric': 'var(--accent-electric)',
        'accent-electric-light': 'var(--accent-electric)',
        'accent-violet': 'var(--accent-violet)',
        'accent-violet-light': 'var(--accent-violet)',
        'accent-cyan': 'var(--accent-cyan)',
        'accent-cyan-light': 'var(--accent-cyan)',
        'accent-mint': 'var(--accent-mint)',
        'accent-mint-light': 'var(--accent-mint)',
      },
      animation: {
        'fadeIn': 'fadeIn 0.5s ease-out',
        'slideUp': 'slideUp 0.6s ease-out',
        'slideInLeft': 'slideInLeft 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      boxShadow: {
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [],
}
