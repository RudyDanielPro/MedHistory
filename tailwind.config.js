/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'footer-bg': 'hsl(209.14, 26.32%, 26.08%)',
        'footer-text':'hsl(0 0% 100%)',
        'text-inicio':'hsl(187 64% 30%)',
        'text-inicio-border':'hsl(240 20% 90%)',
        'text-rest-navVar':'hsl(0 0% 20%)',
        'register-border-button':'hsl(240 20% 90%)',
        'register-bg-hover':'hsl(145 63% 42%)',
        'register-bg':'hsl(240 20% 97%)',
        'sign-bg':'hsl(187 64% 30%)',
        'logo-primary':'hsl(145 63% 42%)',
        'logo-gradien':'hsl(187 64% 30%)'

      }
    },
  },
  plugins: [],
}