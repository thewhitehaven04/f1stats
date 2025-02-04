import { useState } from "react"

export function StintSelector(props: {
    stints: { driver: string; stints: number[] }[]
    onStintChange: ({ driver, stint }: { driver: string; stint: number }) => void
    onReset: () => void
}) {
    const { stints, onStintChange, onReset } = props
    const [isStintSelectorOpen, setIsStintSelectorOpen] = useState(false)

    const handleReset = () => {
        onReset()
        setIsStintSelectorOpen(false)
    }

    return (
        <div className="relative">
            <button type="button" className="btn btn-sm" onClick={() => setIsStintSelectorOpen(!isStintSelectorOpen)}>
                Select stint
            </button>

            {isStintSelectorOpen && (
                <div className="card absolute bg-base-100 border-2 border-neutral-100 border-solid shadow-xl p-4 top-10 left-0 min-w-40 flex flex-col gap-4">
                    {stints.map((driver) => (
                        <label className="flex flex-row gap-4 items-center" key={driver.driver}>
                            {driver.driver}
                            <select
                                className="select select-sm"
                                onChange={(evt) =>
                                    onStintChange({ driver: driver.driver, stint: Number.parseInt(evt.target.value) })
                                }
                            >
                                <option value={undefined}>Select stint</option>
                                {driver.stints.map((stint) => (
                                    <option key={stint} value={stint}>
                                        {stint}
                                    </option>
                                ))}
                            </select>
                        </label>
                    ))}
                    <button type="button" className="btn btn-sm" onClick={handleReset}>
                        Reset
                    </button>
                </div>
            )}
        </div>
    )
}
