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
} from "@/components/ui";

import localCustom from "../helpers/localCustom";
import { Input } from "postcss";

export const NewApplicationPage = () => {
    const zodSchema = z.object({
        date: z.date({ 
            required_error: '* Este campo es obligatorio.'
        }).min(new Date(), '* La fecha debe ser mayor a la actual.'),
        applicator: z.string().min(1, '* El aplicador es obligatorio.'),
        name: z.string().min(1, '* Ha ocurrido un error desconocido.')
    });
    
    const { control, handleSubmit, formState: { errors },  ...form } = useForm({
        defaultValues: {
            date: undefined,
            applicator: '',
            name: ''
        },
        resolver: zodResolver(zodSchema)
    });

    const onSubmit = handleSubmit((data) => {
        console.log(data);
    });


    return (
        <main className="w-full">
        <div>
            <nav className="flex items-center gap-5 px-14 py-8">
                <h1 className="text-3xl font-semibold">Aplicaciones</h1>
                <p className="text-gray-400 pt-1"> / Crear nueva</p>
            </nav>
            <hr />
        </div>
        <div className="px-14 py-6 w-full h-[calc(100%-101px)] flex items-center justify-center">
            <Card className="w-[360px] h-min flex flex-col justify-between shadow-sm" > 
                <CardHeader>
                    <CardTitle>Crea una aplicación de examen</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form { ...form }>
                        <form action="POST" onSubmit={ onSubmit } className="flex flex-col gap-5">
                            {/* <FormField
                                name="name"
                                control={ control }
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nombre de la aplicación</FormLabel>
                                        <FormControl>
                                            <Input { ...field } placeholder="Nombre de la aplicación" />
                                        </FormControl>
                                        <FormMessage >
                                            { errors.name && errors.name.message }
                                        </FormMessage>
                                    </FormItem>
                                )}
                            /> */}
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
                                                    <SelectItem value="uid1">Tere Reyes</SelectItem>
                                                    <SelectItem value="uid2">Ramón</SelectItem>
                                                    <SelectItem value="uid3">System32</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage >
                                            { errors.applicator && errors.applicator.message }
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
