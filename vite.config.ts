import { reactRouter } from "@react-router/dev/vite"
import autoprefixer from "autoprefixer"
import tailwindcss from "tailwindcss"
import { defineConfig, loadEnv } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"

export default defineConfig(({ command, isSsrBuild }) => {
    return {
        css: {
            postcss: {
                plugins: [tailwindcss, autoprefixer],
            },
        },
        plugins: [reactRouter(), tsconfigPaths()],
        define: {
          
        }
    }
})
