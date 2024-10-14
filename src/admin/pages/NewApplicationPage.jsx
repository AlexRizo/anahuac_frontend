import { cn } from "@/lib/utils";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDays, format } from "date-fns";
import { CalendarDays, CalendarPlus } from "lucide-react";
import { useForm } from "react-hook-form";

import {
    Button,
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    Popover,
    PopoverTrigger,
    PopoverContent,
    Calendar,
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
    Input,
    RadioGroup,
    RadioGroupItem
} from "@/components/ui";

import localCustom from "../helpers/localCustom";
import { useAppStore, useUsersStore } from "@/hooks";
import { useEffect } from "react";

export const NewApplicationPage = () => {
    const { startCreateApp } = useAppStore();
    const { admins, startLoadingAdmins } = useUsersStore();
    
    useEffect(() => {
        startLoadingAdmins();
    }, []);
    
    const zodSchema = z.object({
        date: z.date({ 
            required_error: '* Este campo es obligatorio.'
        }).min(new Date(), '* La fecha debe ser mayor a la actual.'),
        applicator: z.string().min(1, '* El aplicador es obligatorio.'),
        origin: z.enum(['SECUNDARIA', 'PREPARATORIA'], '* Este campo es obligatorio.'),
        keys: z.preprocess((val) => Number(val), z.number().max(100, '* Sólo se permiten 100 claves por aplicación.').optional()),
    });
    
    const { control, handleSubmit, formState: { errors },  ...form } = useForm({
        defaultValues: {
            date: undefined,
            applicator: '',
            origin: 'SECUNDARIA',
            keys: 20
        },
        resolver: zodResolver(zodSchema)
    });

    const onSubmit = handleSubmit((data) => {
        startCreateApp(data);
    });


    return (
        <main className="w-full relative">
            <div>
                <nav className="flex items-center gap-5 px-14 py-8">
                    <h1 className="text-3xl font-semibold">Aplicaciones</h1>
                    <p className="text-gray-400 pt-1"> / Crear nueva</p>
                </nav>
                <hr />
            </div>
            <div className="px-14 py-6 w-full h-[calc(100%-101px)] flex items-center justify-center animate__animated animate__zoomIn">
                <Card className="w-[360px] h-min flex flex-col justify-between shadow-sm" > 
                    <CardHeader>
                        <CardTitle>Crea una aplicación de examen</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Form { ...form }>
                            <form action="POST" onSubmit={ onSubmit } className="flex flex-col gap-5">
                                <FormField
                                    name="origin"
                                    control={ control }
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Tipo de aplicación de examen:</FormLabel>
                                            <FormControl>
                                                <RadioGroup
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                    className="flex gap-10"
                                                    >
                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem value="SECUNDARIA" />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">
                                                            Secundaria
                                                        </FormLabel>
                                                    </FormItem>
                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem value="PREPARATORIA" />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">
                                                            Preparatoria
                                                        </FormLabel>
                                                    </FormItem>
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage >
                                                { errors.origin && errors.origin.message }
                                            </FormMessage>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    name="date"
                                    control={ control }
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Día que se aplicará el examen</FormLabel>
                                            <FormControl>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-full pl-3 text-left font-normal",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                        >
                                                        {field.value ? (
                                                            format(field.value, "PPP", { locale: localCustom })
                                                        ) : (
                                                            <span>Selecciona una fecha</span>
                                                        )}
                                                        <CalendarDays className="ml-auto opacity-50" size={20} strokeWidth={1.5} absoluteStrokeWidth />
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0" align="start">
                                                        <Calendar
                                                            mode="single"
                                                            selected={field.value}
                                                            onSelect={field.onChange}
                                                            disabled={(date) =>
                                                            date < addDays(new Date().setHours(0, 0, 0, 0), 1)
                                                            }
                                                            initialFocus
                                                            locale={ localCustom }
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                            </FormControl>
                                            <FormMessage >
                                                { errors.date && errors.date.message }
                                            </FormMessage>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    name="applicator"
                                    control={ control }
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>¿Quién aplicará el examen?</FormLabel>
                                            <FormControl>
                                                <Select 
                                                    defaultValue={ field.value } 
                                                    onValueChange={ field.onChange }
                                                >
                                                    <SelectTrigger className={cn(!field.value && "text-muted-foreground")}>
                                                        <SelectValue placeholder="Seleccione aplicador" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        { admins.map((admin) => (
                                                            <SelectItem key={ admin.id } value={ admin.id }>
                                                                { admin.name }
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage >
                                                { errors.applicator && errors.applicator.message }
                                            </FormMessage>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    name="keys"
                                    control={ control }
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Número de claves de admisión</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    max={ 100 }
                                                    value={ field.value }
                                                    { ...field }
                                                />
                                            </FormControl>
                                            <FormMessage >
                                                { errors.keys && errors.keys.message }
                                            </FormMessage>
                                        </FormItem>
                                    )}
                                />
                                <div>
                                    <p className="text-muted-foreground text-sm mb-3">
                                        Se creará un id de aplicación con estos datos.
                                    </p>
                                    <Button className="gap-2 w-min px-7" type="submit" >
                                        <CalendarPlus size={20} strokeWidth={1.25} absoluteStrokeWidth />
                                        Crear fecha
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </main>
    )
}
