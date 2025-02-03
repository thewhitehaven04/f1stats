import { SiGithub, SiGmail, SiTelegram } from "@icons-pack/react-simple-icons"
import { Link } from "react-router"

export function Footer() {
    return (
        <footer className="w-screen footer bg-base-200 py-4 px-12 flex flex-col items-center text-gray-500 font-medium">
            <div className="flex flex-row justify-between w-full">
                <div className="flex flex-col">
                    <p>
                        This site is a passion project and is not affiliated with, endorsed by, or sponsored by Formula
                        1.
                    </p>
                    <p>All trademarks and copyrights belong to their respective owners.</p>
                    <p className="mt-3">Built by thewhitehaven04, {new Date().getFullYear()}</p>
                </div>
                <div className="flex flex-col items-start gap-2">
                    <Link to="https://github.com/thewhitehaven04" className="link link-hover">
                        <SiGithub />
                    </Link>
                    <Link to="mailto:thewhitehaven04@gmail.com" className="link link-hover">
                        <SiGmail />
                    </Link>
                    <Link to="https://t.me/Northern_L1ghts" className="link link-hover">
                        <SiTelegram />
                    </Link>
                </div>
            </div>
        </footer>
    )
}
