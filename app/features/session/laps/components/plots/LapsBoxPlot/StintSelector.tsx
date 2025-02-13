import { useState } from "react"
import { PopupCard } from "~/components/PopupCard"

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
                <PopupCard
                    onClose={() => setIsStintSelectorOpen(false)}
                    actions={
                        <button type="button" className="btn btn-sm w-full" onClick={handleReset}>
                            Reset
                        </button>
                    }
                >
                    {stints.map((driver) => (
                        <label className="grid grid-cols-[48px,_128px] gap-2 items-center" key={driver.driver}>
                            <span>{driver.driver}</span>
                            <select
                                className="select select-sm w-full text-end"
                                onChange={(evt) =>
                                    onStintChange({
                                        driver: driver.driver,
                                        stint: Number.parseInt(evt.target.value),
                                    })
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
                </PopupCard>
            )}
        </div>
    )
}
