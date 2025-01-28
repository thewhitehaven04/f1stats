import type { Config } from "@react-router/dev/config"

const PRERENDERED_YEARS = [2023, 2024]
export default {
    ssr: true,
    async prerender({ getStaticPaths }) {
        return [...getStaticPaths(), ...PRERENDERED_YEARS.map((season) => `/year/${season}`)]
    },
} satisfies Config
