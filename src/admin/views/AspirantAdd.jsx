import { Button, Card, CardContent, CardHeader, CardTitle, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, Label, RadioGroup, RadioGroupItem } from "@/components/ui"
import { useAspirantsStore } from "@/hooks/useAspirantsStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { toZonedTime } from "date-fns-tz";
import { LoaderCircle } from "lucide-react"
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const AspirantAdd = () => {

    const { loading } = useAspirantsStore();

    const isLoadingData = useMemo(() => loading === 'loading', [loading]);

    const zodSchema = z.object({
        first_name: z.string().min(1, '* Introduce tu nombre.'),
        last_name_1: z.string().min(1, '* Introduce tu apellido paterno.'),
        last_name_2: z.string().optional(),
        sex: z.enum(['MASCULINO', 'FEMENINO'], '* Introduce tu sexo.'),
        key: z.string().min(1, '* Introduce la clave de activación.'),
        birthdate: z.date({
            required_error: '* Introduce tu fecha de nacimiento.',
            invalid_type_error: '* Introduce una fecha válida.' ,
        })
        .min(new Date("1900-01-01"), '* Introduce una fecha válida.'),
        old_school: z.string().min(1, '* Introduce tu escuela de procedencia.')
    });
    
    const { control, formState: { errors }, handleSubmit, ...form } = useForm({
        defaultValues: {
            first_name: '',
            last_name_1: '',
            last_name_2: '',
            sex: 'MASCULINO',
            key: '',
            birthdate: undefined,
            old_school: ''
        },
        resolver: zodResolver(zodSchema)
    });

    const onSubmit = handleSubmit((data) => {
        startSavingAspirant(data);
    });

    const parseDate = (value) => {
        const UTCDate = toZonedTime(value, 'America/Mexico_City')
        return UTCDate
    };
    
    return (
        <Card className={`w-[460px] h-min flex flex-col justify-between shadow-sm ${ isLoadingData && 'opacity-60 pointer-events-none' }`} > 
            <CardHeader>
                <CardTitle>Registro de aspirante</CardTitle>
            </CardHeader>
            <CardContent>
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
                                            <Input placeholder="Clave de activación" { ...field } type="text" className="transition" />
                                        </FormControl>
                                        <FormMessage >
                                            { errors.key && errors.key.message }
                                        </FormMessage>
                                    </FormItem>
                                )}
                            />
                            <div className="space-y-2 w-full">
                                <Label
                                    htmlFor="birthdate"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Fecha de Nacimiento
                                </Label>
                                <input 
                                    type="date"
                                    name="birthdate"
                                    id="birthdate"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition"
                                    { ...form.register('birthdate', 
                                        {
                                            setValueAs: value => value ? parseDate(value) : undefined
                                        }
                                    )}
                                />
                                <FormMessage >
                                    { errors.birthdate && errors.birthdate.message }
                                </FormMessage>
                            </div>
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
                        <Button type="submit" disabled={ isLoadingData }>
                            { isLoadingData ? (
                                <>
                                    <LoaderCircle size={ 20 } className="mr-2 animate-spin" />
                                    Registrando...
                                </>
                            ) : 'Registrar' }
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}