import type { Config } from "@react-router/dev/config"

export default {
    ssr: true,
    async prerender() {
        return ['/year/2021', '/year/2022', '/year/2023', '/year/2024']
    },
} satisfies Config
