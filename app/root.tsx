import { isRouteErrorResponse, Meta, Outlet, redirect, Scripts, ScrollRestoration } from "react-router"

import type { Route } from "./+types/root"
import "./app.css"
import type { ReactNode } from "react"

export async function loader(props: Route.LoaderArgs) {
    if (!props.params.year) {
        return redirect(`/year/${new Date().getFullYear()}`)
    }
}

export function Layout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <Meta />
            </head>
            <body className="w-screen h-screen flex justify-center bg-gray-50">
                <div id="app" className="w-9/12 max-w-screen-2xl">
                    {children}
                </div>
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    )
}

export default function App() {
    return <Outlet />
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
