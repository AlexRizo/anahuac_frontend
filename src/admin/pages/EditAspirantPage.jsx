import { useAspirantsStore } from "@/hooks";
import { CustomAlert } from "../components"
import { AspirantConfirm, AspirantEdit } from "../views"

export const EditAspirantPage = () => {
    const { ok } = useAspirantsStore();
    
    return (
        <main className="w-full h-screen relative overflow-hidden">
            <div>
                <nav className="flex items-center gap-5 px-14 py-8">
                    <h1 className="text-3xl font-semibold">Aspirantes</h1>
                    <p className="text-gray-400 pt-1"> / Editar aspirante</p>
                </nav>
                <hr />
            </div>
            <div className="px-14 py-6 w-full h-[calc(100%-101px)] flex items-center justify-center animate__animated animate__zoomIn overflow-y-auto">
                {
                    ok ? (
                        <div>
                            <CustomAlert
                                title="Aspirante actualizado"
                                message={`Se ha actualizado el aspirante corréctamente.`}
                                variant="success"
                            />
                            <AspirantConfirm/>
                        </div>
                    ) : (
                        <AspirantEdit />
                    )
                }
            </div>
        </main>
    )
}
