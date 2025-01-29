import { useFetcher, useNavigate, useParams } from "react-router"
import { SUPPORTED_SEASONS } from "~/routes/constants"

export function SeasonSelector() {
    const { year } = useParams<{ year: string }>()
    const navigate = useNavigate()

    return (
        <select
            className="select select-md w-max text-lg"
            onChange={(evt) => navigate(`/year/${evt.target.value}`)}
            value={year}
        >
            {SUPPORTED_SEASONS.map((season) => (
                <option key={season} value={season}>
                    {season}
                </option>
            ))}
        </select>
    )
}
