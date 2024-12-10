import { useEffect, useState } from "react";
import { Button, Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, Popover, PopoverContent, PopoverTrigger, Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui";
import { useAppStore } from "@/hooks";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

export const SelectApp = ({ selectedApp, setSelectedApp }) => {
    const { applications, startLoadingAllApps } = useAppStore();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        startLoadingAllApps();
    }, []);

    const handleSelectApp = (name) => {
        // Busca el id correspondiente al name seleccionado
        const appId = applications.find((app) => app.name === name)?.id;

        // Si no se encuentra, limpia la selección
        if (!appId) {
            setSelectedApp("");
            return;
        }

        // Almacena el id en selectedApp
        setSelectedApp(appId);
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[220px] justify-between"
                >
                    {selectedApp
                        ? applications.find((app) => app.id === selectedApp)?.name
                        : "Selecciona una aplicación..."}
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Busca una aplicación..." />
                    <CommandList>
                        <CommandEmpty>No se encontró una aplicación.</CommandEmpty>
                        <CommandGroup>
                            { applications.map((app) => (
                                <CommandItem
                                    key={app.id}
                                    value={app.name} // Busca por el nombre
                                    onSelect={(currentValue) => {
                                        handleSelectApp(currentValue);
                                        setOpen(false);
                                    }}
                                >
                                    {app.name}
                                    <Check
                                        className={cn(
                                            "ml-auto",
                                            selectedApp === app.id ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};