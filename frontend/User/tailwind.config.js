/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: '#611BF8',
                hover : '#4b0fd4',
                secondary: '#FF6B6B'
            },
        },
    },
    plugins: [],
};
