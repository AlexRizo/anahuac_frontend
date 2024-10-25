import React, { useEffect } from 'react'
import { AspirantAdd, AspirantConfirm } from '../views'
import { CustomAlert } from '../components'
import { useAspirantsStore } from '@/hooks';

export const NewStaffPage = () => {
    const { activeAspirant, startClearActiveAspirant } = useAspirantsStore();

    useEffect(() => {
        startClearActiveAspirant();
    }, []);
    
    return (
        <main className="w-full h-screen overflow-hidden">
            <div>
                <nav className="flex items-center gap-5 px-14 py-8">
                    <h1 className="text-3xl font-semibold">Aspirantes</h1>
                    <p className="text-gray-400 pt-1"> / Nuevo aspirante</p>
                </nav>
                <hr />
            </div>
            <div className="px-14 py-6 w-full h-[calc(100%-101px)] flex items-center justify-center animate__animated animate__zoomIn overflow-y-auto">
            {
                    !!activeAspirant ? (
                        <div>
                            <CustomAlert
                                title="Nuevo aspirante creado"
                                message={`Se ha creado un nuevo aspirante a ${ activeAspirant.exam.name } exitosamente.`}
                                variant="success"
                            />
                            <AspirantConfirm/>
                        </div>
                    ) : (
                        <AspirantAdd />
                    )
                }
            </div>
        </main>
    )
}
