import { useSelector } from "react-redux";
import { ApplicationConfirm, ApplicationEdit } from "../views"
import { CustomAlert } from "../components";

export const EditApplicationPage = () => {
    const { ok } = useSelector( state => state.app );
    
    return (
        <main className="w-full relative">
            <div>
                <nav className="flex items-center gap-5 px-14 py-8">
                    <h1 className="text-3xl font-semibold">Aplicaciones</h1>
                    <p className="text-gray-400 pt-1"> / Editar aplicación</p>
                </nav>
                <hr />
            </div>
            <div className="px-14 py-6 w-full h-[calc(100%-101px)] flex items-center justify-center animate__animated animate__zoomIn">
                {
                    ok ? (
                        <div>
                            <CustomAlert
                                title="Aplicación actualizada"
                                message={`Se ha actualizado la aplicación corréctamente.`}
                                variant="success"
                            />
                            <ApplicationConfirm/>
                        </div>
                    ) : (
                        <ApplicationEdit />
                    )
                }
            </div>
        </main>
    )
}
