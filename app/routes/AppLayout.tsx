import { Outlet } from "react-router"
import { WarningIcon } from '~/components/Icons/warning'
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
            <WarningIcon/> 
            <h1 className="font-bold text-2xl text-gray-800">Something went wrong</h1>
            <span className="text-lg text-gray-600">Unable to load page that you're requesting</span>
        </main>
    )
}
