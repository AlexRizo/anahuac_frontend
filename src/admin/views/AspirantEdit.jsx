import { useEffect, useMemo } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toZonedTime } from "date-fns-tz";
import { LoaderCircle } from "lucide-react"
import { useForm } from "react-hook-form";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Label,
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui";
import { useAspirantsStore } from "@/hooks";
import { getAspirantKey, parseDateForInput } from "../helpers";
import { CustomAlert } from "../components";
import { useParams } from "react-router-dom";

export const AspirantEdit = () => {
    const { id:aspirantId } = useParams();

    const { loading, startUpdateAspirant, startLoadingActiveAspirant, activeAspirant:aspirant, message } = useAspirantsStore();

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
    
    const { control, formState: { errors }, handleSubmit, reset, ...form } = useForm({
        defaultValues: {
            first_name: aspirant?.first_name || '',
            last_name_1: aspirant?.last_name_1 || '',
            last_name_2: aspirant?.last_name_2 || '',
            sex: aspirant?.sex || '',
            key: getAspirantKey(aspirant?.aspirant_id) || '',
            birthdate: undefined,
            old_school: aspirant?.origin || ''
        },
        resolver: zodResolver(zodSchema)
    });

    useEffect(() => {
        if (!aspirant) startLoadingActiveAspirant(aspirantId);
    }, []);

    useEffect(() => {
        if (aspirant) {
            reset({
                first_name: aspirant.first_name,
                last_name_1: aspirant.last_name_1,
                last_name_2: aspirant.last_name_2,
                sex: aspirant.sex,
                key: getAspirantKey(aspirant.aspirant_id),
                birthdate: parseDateForInput(new Date(aspirant.birthdate)),
                old_school: aspirant.origin
            });
            console.log(aspirant);
        }
    }, [aspirant, reset]);

    const onSubmit = handleSubmit((data) => {
        startUpdateAspirant(data);
    });

    const parseDate = (value) => {
        const UTCDate = toZonedTime(value, 'America/Mexico_City')
        return UTCDate
    };
    
    if (!aspirant) {
        return (
            <div className="flex items-center justify-center">
                <LoaderCircle size={24} strokeWidth={1.25} absoluteStrokeWidth className="animate-spin" />
                <h1>Cargando...</h1>
            </div>
        );
    }
    
    return (
        <Card className={`w-[500px] h-min flex flex-col justify-between shadow-sm ${ isLoadingData && 'opacity-60 pointer-events-none' }`} > 
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
                                        <FormLabel>Clave de activación</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Clave de activación" { ...field } type="text" className="transition" disabled />
                                        </FormControl>
                                        <FormDescription className="text-xs">
                                            Selecciona una fecha de aplicación.
                                            Se le asignará una clave de activación automáticamente.
                                        </FormDescription>
                                        <FormMessage />
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
                        {
                            message && (
                                <CustomAlert variant='destructive' title="Ha ocurrido un error." message={ message } />
                            )
                        }
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