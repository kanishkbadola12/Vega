/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                primary: "var(--color-primary)",
                secondary: "var(--color-secondary)",
                background: "var(--color-background)",
                "background-secondary": "var(--color-background-secondary)",
                text: "var(--color-text)",
                "text-secondary": "var(--color-text-secondary)",
            },
        },
    },
    plugins: [],
}  