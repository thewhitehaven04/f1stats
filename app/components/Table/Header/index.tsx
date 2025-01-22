export const TableHeader = ({ children }: { children: React.ReactNode }) => {
    return (
        <thead className='bg-gray-200 text-md'>
            {children}
        </thead>
    )
}