import { useAuthStore, useKeysStore } from "@/hooks"
import localCustom from "../helpers/localCustom"
import { Button, Calendar, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, Popover, PopoverContent, PopoverTrigger, RadioGroup, RadioGroupItem } from "@/components/ui"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { cn } from "@/lib/utils"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

export const RegisterUser = () => {
    const { key, isValidating } = useKeysStore();
    const { startSavingAspirant } = useAuthStore();

    const zodSchema = z.object({
        first_name: z.string().min(1, '* Introduce tu nombre.'),
        last_name_1: z.string().min(1, '* Introduce tu apellido paterno.'),
        last_name_2: z.string().min(1, '* Introduce tu apellido materno.'),
        sex: z.enum(['MASCULINO', 'FEMENINO'], '* Introduce tu sexo.'),
        key: z.string().min(1, '* Introduce la clave de activación.'),
        birthdate: z.date({
            required_error: '* Introduce tu fecha de nacimiento.',
        }).min(new Date("1900-01-01"), '* Introduce una fecha válida.'),
        old_school: z.string().min(1, '* Introduce tu escuela de procedencia.')
    });
    
    const { control, formState: { errors }, handleSubmit, ...form } = useForm({
        defaultValues: {
            first_name: '',
            last_name_1: '',
            last_name_2: '',
            sex: 'MASCULINO',
            key,
            birthdate: undefined,
            old_school: ''
        },
        resolver: zodResolver(zodSchema)
    });

    const onSubmit = handleSubmit((data) => {
        startSavingAspirant(data);
    });
    
    return (
        <Form { ...form }>
            <form action="POST" className="flex flex-col gap-4" onSubmit={ onSubmit }>
                <FormField
                    control={ control }
                    name="first_name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nombre(s)</FormLabel>
                            <FormControl>
                                <Input placeholder="Nombre completo" { ...field } type="text" className="transition" />
                            </FormControl>
                            <FormMessage >
                                { errors.first_name && errors.first_name.message }
                            </FormMessage>
                        </FormItem>
                    )}
                />
                <FormField
                    control={ control }
                    name="last_name_1"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Apellido Paterno</FormLabel>
                            <FormControl>
                                <Input placeholder="Apellido paterno" { ...field } type="text" className="transition" />
                            </FormControl>
                            <FormMessage >
                                { errors.last_name_1 && errors.last_name_1.message }
                            </FormMessage>
                        </FormItem>
                    )}
                />
                <FormField
                    control={ control }
                    name="last_name_2"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Apellido Materno</FormLabel>
                            <FormControl>
                                <Input placeholder="Apellido materno" { ...field } type="text" className="transition" />
                            </FormControl>
                            <FormMessage >
                                { errors.last_name_2 && errors.last_name_2.message }
                            </FormMessage>
                        </FormItem>
                    )}
                />
                <FormField
                    name="sex"
                    control={ control }
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Sexo:</FormLabel>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={ field.onChange }
                                    defaultValue={ field.value }
                                    className="flex gap-10"
                                    >
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="MASCULINO" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            Masculino
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="FEMENINO" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            Femenino
                                        </FormLabel>
                                    </FormItem>
                                </RadioGroup>
                            </FormControl>
                            <FormMessage >
                                { errors.sex && errors.sex.message }
                            </FormMessage>
                        </FormItem>
                    )}
                />
                <div className="flex gap-2">
                    <FormField
                        control={ control }
                        name="key"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Clave de Activación</FormLabel>
                                <FormControl>
                                    <Input placeholder="Nombre completo" { ...field } type="text" className="transition" />
                                </FormControl>
                                <FormMessage >
                                    { errors.key && errors.key.message }
                                </FormMessage>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={ control }
                        name="birthdate"
                        render={({ field }) => (
                            <FormItem className="w-full">
                            <FormLabel>Fecha de Nacimiento</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                <FormControl>
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
                                        <span>Introduce una fecha</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={ field.value }
                                    onSelect={ field.onChange }
                                    disabled={ (date) =>
                                    date > new Date() || date < new Date("1900-01-01")
                                    }
                                    initialFocus
                                    locale={ localCustom }
                                />
                                </PopoverContent>
                            </Popover>
                                <FormMessage >
                                    { errors.birthdate && errors.birthdate.message }
                                </FormMessage>
                            </FormItem>
                        )}
                        />
                </div>
                <FormField
                        control={ control }
                        name="old_school"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Escuela de Procedencia</FormLabel>
                                <FormControl>
                                    <Input placeholder="Escuela de procedencia" { ...field } type="text" className="transition" />
                                </FormControl>
                                <FormMessage >
                                    { errors.old_school && errors.old_school.message }
                                </FormMessage>
                            </FormItem>
                        )}
                />
                <Button type="submit">
                    { isValidating ? (
                        <>
                            <LoaderCircle size={ 20 } className="mr-2 animate-spin" />
                            Registrando...
                        </>
                    ) : 'Registrar' }
                </Button>
            </form>
        </Form>
    )
}
