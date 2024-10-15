import { useEffect, useMemo } from "react";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDays, format } from "date-fns";
import { CalendarDays, CalendarPlus, LoaderCircle } from "lucide-react";
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
    RadioGroupItem,
} from "@/components/ui";

import localCustom from "../helpers/localCustom";
import { useAppStore, useUsersStore } from "@/hooks";
import { CustomAlert } from "../components";

export const ApplicationForm = () => {
    const { startCreateApp, isLoading, message } = useAppStore();
    const { admins, startLoadingAdmins } = useUsersStore();

    const isLoadingData = useMemo(() => isLoading === 'loading', [isLoading]);

    useEffect(() => {
        startLoadingAdmins();
    }, []);
    
    const zodSchema = z.object({
        date: z.date({ 
            required_error: '* Este campo es obligatorio.'
        }).min(new Date(), '* La fecha debe ser mayor a la actual.'),
        user: z.string().min(1, '* El aplicador es obligatorio.'),
        type: z.enum(['SECUNDARIA', 'PREPARATORIA'], '* Este campo es obligatorio.'),
        keys: z.preprocess((val) => Number(val), z.number().max(100, '* Sólo se permiten 100 claves por aplicación.').optional()),
    });
    
    const { control, handleSubmit, formState: { errors },  ...form } = useForm({
        defaultValues: {
            date: undefined,
            user: '',
            type: 'SECUNDARIA',
            keys: 20
        },
        resolver: zodResolver(zodSchema)
    });

    const onSubmit = handleSubmit((data) => {
        startCreateApp(data);
    });
    return (
        <Card className={`w-[360px] h-min flex flex-col justify-between shadow-sm ${ isLoadingData && 'opacity-60' }`} > 
            <CardHeader>
                <CardTitle>Crea una aplicación de examen</CardTitle>
            </CardHeader>
            <CardContent>
                <Form { ...form }>
                    <form action="POST" onSubmit={ onSubmit } className="flex flex-col gap-5">
                        <FormField
                            name="type"
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
                            name="user"
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
                            {
                                message && (
                                    <CustomAlert variant='destructive' message={ message } />
                                )
                            }
                            <p className="text-muted-foreground text-sm mb-3">
                                Se creará un id de aplicación con estos datos.
                            </p>
                            <Button className="gap-2 w-min px-7" type="submit" disabled={ isLoadingData } >
                                {
                                    isLoadingData ? (
                                        <>
                                            <LoaderCircle size={20} strokeWidth={1.25} absoluteStrokeWidth className="animate-spin" />
                                            Creando...
                                        </>
                                    ) : (
                                        <>
                                            <CalendarPlus size={20} strokeWidth={1.25} absoluteStrokeWidth />
                                            Crear fecha
                                        </>
                                    )   
                                }
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
