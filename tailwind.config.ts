import type { Config } from "tailwindcss"

export default {
    content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                sans: [
                    '"Inter"',
                    "ui-sans-serif",
                    "system-ui",
                    "sans-serif",
                    '"Apple Color Emoji"',
                    '"Segoe UI Emoji"',
                    '"Segoe UI Symbol"',
                    '"Noto Color Emoji"',
                ],
            },
            colors: {
                'non-peresonal-best': "#F8D30B",
                best: "#AA3CDC",
                'personal-best': "#4DD346",
            },
            gridTemplateColumns: {
                autofill: 'repeat(auto-fill, minmax(100fr, 1fr))'
            }
        },
    },
    plugins: [require("@tailwindcss/typography"), require("daisyui")],
} satisfies Config
