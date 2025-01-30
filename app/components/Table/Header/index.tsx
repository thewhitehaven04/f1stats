export const TableHeader = ({ children }: { children: React.ReactNode }) => {
    return (
        <thead className='bg-base-200 text-slate-500'>
            {children}
        </thead>
    )
}