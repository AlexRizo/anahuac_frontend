import { useEffect } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui";
import { useAppStore } from "@/hooks";

export const SelectApp = ({ selectedApp, setSelectedApp }) => {
    const { applications, startLoadingAllApps } = useAppStore();
    // const [selectedApp, setSelectedApp] = useState(null); // ? This is the original state;
    
    useEffect(() => {
        startLoadingAllApps();
    }, []);

    const handleSelectApp = (id) => {
        if (id === 'todas') {
            setSelectedApp('');
            return;
        }
        setSelectedApp(id);
    };
    
    return (
        <Select onValueChange={ handleSelectApp } value={ selectedApp } >
            <SelectTrigger className="w-auto">
            <SelectValue placeholder="Selecciona una aplicación"/>
            </SelectTrigger>
            <SelectContent>
            <SelectGroup>
                <SelectLabel>Fechas de aplicación</SelectLabel>
                <SelectItem value="todas" className="text-slate-500">
                        Sin filtro de aplicación
                </SelectItem>
                {
                    applications.map((app) => (
                        <SelectItem key={ app.id } value={ app.id }>
                            { app.name }
                        </SelectItem>
                    ))
                }
            </SelectGroup>
            </SelectContent>
        </Select>
    )
}