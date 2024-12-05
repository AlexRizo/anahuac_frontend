import { Activity, CalendarPlus, CirclePlus, ClipboardList, FileBadge, Users } from "lucide-react"
import { CardOption } from "../components"

const dashboardOptions = [
    {
        title: 'Aplicaciones',
        description: 'Agrega una aplicación de examen',
        icon: <CalendarPlus className="size-[95px] 2xl:size-[115px]" strokeWidth={ .60 } absoluteStrokeWidth />,
        button: 'Nueva Fecha',
        iconButton: <CirclePlus size={20} strokeWidth={1.25} absoluteStrokeWidth />,
        path: '/aplicaciones'
    },
    {
        title: 'Aspirantes',
        description: 'Registra un nuevo aspirante',
        icon: <Users className="size-[95px] 2xl:size-[115px]" strokeWidth={ .60 } absoluteStrokeWidth />,
        button: 'Nuevo Aspirante',
        iconButton: <CirclePlus size={20} strokeWidth={1.25} absoluteStrokeWidth />,
        path: '/aspirantes'
    },
    {
        title: 'Resultados',
        description: 'Consulta los resultados de la aplicación',
        icon: <FileBadge className="size-[95px] 2xl:size-[115px]" strokeWidth={ .60 } absoluteStrokeWidth />,
        button: 'Ver Resultados',
        iconButton: <FileBadge size={20} strokeWidth={1.25} absoluteStrokeWidth />,
        path: '/resultados'
    },
    {
        title: 'Reactivos',
        description: 'Visualiza los reactivos del examen',
        icon: <ClipboardList className="size-[95px] 2xl:size-[115px]" strokeWidth={ .60 } absoluteStrokeWidth />,
        button: 'Ver Reactivos',
        iconButton: <ClipboardList size={20} strokeWidth={1.25} absoluteStrokeWidth />,
        path: '/examenes'
    },
    // {
    //     title: 'Estadisticas',
    //     description: 'Segunda etapa',
    //     icon: <Activity size={115} absoluteStrokeWidth />,
    //     button: 'Ver Estadisticas',
    //     iconButton: <Activity size={20} strokeWidth={1.25} absoluteStrokeWidth />,
    //     path: '/estadisticas'
    // }
]


export const HomePage = () => {
    return (
        <main className="py-10 2xl:py-20 px-12 2xl:px-24 overflow-y-auto h-screen">
            <h1 className="text-3xl font-semibold text-[#09090B]">Dashboard</h1>
            <div className="flex flex-wrap gap-8 2xl:gap-10 mt-7 2xl:mt-14">
                {
                    dashboardOptions.map((option, index) => (
                        <CardOption 
                            key={index}
                            title={option.title}
                            description={option.description}
                            icon={option.icon}
                            button={option.button}
                            iconButton={option.iconButton}
                            path={option.path}
                        />
                    ))
                }
            </div>
        </main>
    )
}