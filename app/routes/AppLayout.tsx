import { Outlet } from "react-router"
import { Footer } from '~/features/layout/footer'
import { Header } from '~/features/layout/header'

export function meta() {
    return [{ title: "F1 Statistics & Telemetry visualizer" }]
}

export default function Layout() {
    return (
        <div className="flex flex-col gap-8 items-center overflow-y-scroll min-h-full">
            <Header />
            <main className="w-[calc(100vw-36px)] xl:w-[1200px] 2xl:w-[1440px]">
                <Outlet />
            </main>
            <div className="flex flex-col justify-end h-full">
                <Footer />
            </div>
        </div>
    )
}

export function ErrorBoundary() {
    return (
        <main className="flex flex-col justify-center items-center gap-4 w-full h-screen">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-16"
            >
                <title>Error</title>
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                />
            </svg>

            <h1 className="font-bold text-2xl text-gray-800">Something went wrong</h1>
            <span className="text-lg text-gray-600">Unable to load page that you're requesting</span>
        </main>
    )
}
