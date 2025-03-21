import type { Config } from "tailwindcss"

export default {
    content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
    daisyui: {
        themes: ["light"],
    },
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
                "non-personal-best": "#F8D30B",
                best: "#AA3CDC",
                "personal-best": "#4DD346",
                "hard-tyre": "#fdfffe",
                "medium-tyre": "#ffe826",
                "soft-tyre": "#e32526",
                "wet-tyre": "#0e629e",
                "intermediate-tyre": "#148f37",
            },
            gridTemplateColumns: {
                autofill: "repeat(auto-fill, minmax(100fr, 1fr))",
            },
        },
    },
    plugins: [require("@tailwindcss/typography"), require("daisyui")],
} satisfies Config
