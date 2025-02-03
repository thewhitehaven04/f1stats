import {
    isRouteErrorResponse,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useNavigation,
    useNavigationType,
} from "react-router"

import type { Route } from "./+types/root"
import "./app.css"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "~/config"
import type { ReactNode } from "react"

export function Layout({ children }: { children: ReactNode }) {
    const navigation = useNavigation()
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <Meta />
            </head>
            <body className="w-screen h-screen flex flex-col items-center bg-base-100 overflow-y-scroll">
                {(navigation.state === "loading" || navigation.state === "submitting") && (
                    <progress className="progress w-screen top-0 left-0 fixed z-50" />
                )}
                {children}
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    )
}

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Outlet />
        </QueryClientProvider>
    )
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
    let message = "Oops!"
    let details = "An unexpected error occurred."
    let stack: string | undefined

    if (isRouteErrorResponse(error)) {
        message = error.status === 404 ? "404" : "Error"
        details = error.status === 404 ? "The requested page could not be found." : error.statusText || details
    } else if (import.meta.env.DEV && error && error instanceof Error) {
        details = error.message
        stack = error.stack
    }

    return (
        <main className="pt-16 p-4 container mx-auto">
            <h1>{message}</h1>
            <p>{details}</p>
            {stack && (
                <pre className="w-full p-4 overflow-x-auto">
                    <code>{stack}</code>
                </pre>
            )}
        </main>
    )
}
