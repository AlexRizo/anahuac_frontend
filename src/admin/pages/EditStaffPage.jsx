import { useAdminsStore } from "@/hooks";
import { CustomAlert } from "../components"
import { StaffConfirm, StaffEdit } from "../views";

export const EditStaffPage = () => {
    const { ok, activeAdmin } = useAdminsStore();
    
    return (
        <main className="w-full h-screen relative overflow-hidden">
            <div>
                <nav className="flex items-center gap-5 px-14 py-5 2xl:py-8">
                    <h1 className="text-2xl 2xl:text-3xl font-semibold">Staff</h1>
                    <p className="text-gray-400 pt-1"> / Editar staff</p>
                </nav>
                <hr />
            </div>
            <div className="px-14 py-6 w-full h-[calc(100%-101px)] flex items-center justify-center animate__animated animate__zoomIn overflow-y-auto">
                {
                    ok ? (
                        <div>
                            <CustomAlert
                                title="Staff actualizado"
                                message={`Se ha actualizado el staff ${ activeAdmin.username } corréctamente.`}
                                variant="success"
                            />
                            <StaffConfirm/>
                        </div>
                    ) : (
                        <StaffEdit />
                    )
                }
            </div>
        </main>
    )
}
