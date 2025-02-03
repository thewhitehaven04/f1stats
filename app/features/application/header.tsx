import { Link } from 'react-router'
import { Breadcrumbs } from '~/components/Breadcrumbs'
import { SeasonSelector } from '~/features/navigation/components/SeasonSelector'

export function Header() {
    return (
        <div className="sticky backdrop-blur-sm z-50 top-0">
            <header className="bg-base-100 opacity-80 shadow-sm w-screen flex flex-row gap-8 justify-between items-center py-2 pl-4">
                <div className="pl-4 flex flex-row gap-8 items-center">
                    <div className="text-xl font-semibold opacity-80">
                        <Link to="/">F1Stats</Link>
                    </div>
                    <Breadcrumbs />
                </div>
                <SeasonSelector />
            </header>
        </div>
    )
}
