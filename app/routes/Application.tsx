import { Link } from "react-router"

export default function Hero() {
    return (
        <div className="h-screen flex flex-col justify-center items-center">
            <section className="hero">
                <div className="hero-content flex flex-col items-center">
                    <h1 className="hero-title text-5xl font-semibold">F1Stats</h1>
                    <span className='text-2xl'>F1 Statistics and Telemetry data at your fingertips</span>
                    <Link to="year/2024" className="btn btn-lg btn-neutral btn-wide">
                        Get started
                    </Link>
                </div>
            </section>
        </div>
    )
}
