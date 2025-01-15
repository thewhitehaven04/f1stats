import { QueryClient } from '@tanstack/react-query'

export const DEFAULT_YEAR = 2024

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 60 * 60 * 1000,
        },
    },
})