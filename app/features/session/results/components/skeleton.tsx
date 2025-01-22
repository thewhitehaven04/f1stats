export function ResultsSkeleton() {
    return (
        <div className="w-full flex flex-col gap-4">
            <div className="skeleton w-full h-1/6" />
            <div className="skeleton w-full h-1/6" />
            <div className="skeleton w-full h-1/3" />
            <div className="skeleton w-full h-1/3" />
        </div>
    )
}