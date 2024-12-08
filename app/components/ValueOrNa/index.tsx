export const ValueOrNa = ({value}: { value: number | string | null }) => {
    return value ? value : <span className="text-gray-700">N/A</span>
}