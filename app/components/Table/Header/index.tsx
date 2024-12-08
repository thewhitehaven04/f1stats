export const TableHeader = ({ children }: { children: React.ReactNode }) => {
    return (
        <thead className='rounded-lg bg-slate-200'>
            {children}
        </thead>
    )
}