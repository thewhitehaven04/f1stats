import { SUPPORTED_SEASONS } from "~/routes/constants"

export interface ISeasonSelectorProps extends React.HTMLAttributes<HTMLSelectElement> {
    onSeasonChange: (evt: React.ChangeEvent<HTMLSelectElement>) => void
    value: string
}

export function SeasonSelector({ onSeasonChange, value }: ISeasonSelectorProps) {
    return (
        <li>
            <div className="menu-title">Season</div>
            <select className="select select-md w-32" onChange={onSeasonChange} value={value}>
                {SUPPORTED_SEASONS.map((season) => (
                    <option key={season} value={season}>
                        {season}
                    </option>
                ))}
            </select>
        </li>
    )
}
