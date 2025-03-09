import { Form, useParams, useSubmit } from "react-router"
import { SUPPORTED_SEASONS } from "~/routes/constants"

export function SeasonSelector() {
    const { year } = useParams<{ year: string }>()
    const submit = useSubmit()

    return (
        <Form
            onChange={(evt) => {
                submit(evt.currentTarget)
            }}
            method="post"
        >
            <select className="select select-md w-max" name="year" value={year}>
                {SUPPORTED_SEASONS.map((season) => (
                    <option key={season} value={season}>
                        {season}
                    </option>
                ))}
            </select>
        </Form>
    )
}
