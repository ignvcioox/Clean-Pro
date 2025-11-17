/** @type {import('tailwindcss').Config} */
export default {
   content: ["./src/**/*.{html,js}"],
   theme: {
      extend: {
         animation: {
            'slide-in': 'slideIn 0.3s ease-out forwards',
         },
         keyframes: {
            slideIn: {
               '0%': {
                  transform: 'translateX(100%)',
                  opacity: '0'
               },
               '100%': {
                  transform: 'translateX(0)',
                  opacity: '1'
               },
            },
         }
      },
   },
   plugins: [
      require('daisyui'),
   ],
}