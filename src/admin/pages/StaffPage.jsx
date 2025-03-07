import { Button } from '@/components/ui'
import { CirclePlus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { StaffTable } from '../components'

export const StaffPage = () => {
    return (
        <main className="w-full">
            <div>
                <nav className="flex justify-between px-14 py-5 2xl:py-8">
                    <h1 className="text-2xl 2xl:text-3xl font-semibold">Staff</h1>
                    <Link to={'/staff/nuevo'}>
                        <Button className="gap-2">
                            <CirclePlus size={20} strokeWidth={1.25} absoluteStrokeWidth />
                            Nuevo staff
                        </Button>
                    </Link>
                </nav>
                <hr />
            </div>
            <div className="px-14 py-6">
                <StaffTable />
            </div>
        </main>
    )
}
