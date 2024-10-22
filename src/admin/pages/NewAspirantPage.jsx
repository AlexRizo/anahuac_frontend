import React from 'react'
import { AspirantAdd } from '../views'

export const NewAspirantPage = () => {
    return (
        <main className="w-full">
            <div>
            <nav className="flex items-center gap-5 px-14 py-8">
                    <h1 className="text-3xl font-semibold">Aspirantes</h1>
                    <p className="text-gray-400 pt-1"> / Nuevo aspirante</p>
                </nav>
                <hr />
            </div>
            <div className="px-14 py-6 w-full h-[calc(100%-101px)] flex items-center justify-center animate__animated animate__zoomIn">
                <AspirantAdd />
            </div>
        </main>
    )
}
