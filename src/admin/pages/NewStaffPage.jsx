import { useEffect } from 'react'
import { StaffAdd, StaffConfirm } from '../views'
import { CustomAlert } from '../components'
import { useAdminsStore } from '@/hooks';

export const NewStaffPage = () => {
    const { activeAdmin, startClearActiveAdmin } = useAdminsStore();

    useEffect(() => {
        startClearActiveAdmin();
    }, []);
    
    return (
        <main className="w-full h-screen overflow-hidden">
            <div>
                <nav className="flex items-center gap-5 px-14 py-5 2xl:py-8">
                    <h1 className="text-2xl 2xl:text-3xl font-semibold">Staff</h1>
                    <p className="text-gray-400 pt-1"> / Nuevo staff</p>
                </nav>
                <hr />
            </div>
            <div className="px-14 py-6 w-full h-[calc(100%-101px)] flex items-center justify-center animate__animated animate__zoomIn overflow-y-auto">
            {
                    !!activeAdmin ? (
                        <div>
                            <CustomAlert
                                title="Nuevo staff creado"
                                message={`Se ha creado un nuevo staff corréctamente.`}
                                variant="success"
                            />
                            <StaffConfirm/>
                        </div>
                    ) : (
                        <StaffAdd />
                    )
                }
            </div>
        </main>
    )
}
