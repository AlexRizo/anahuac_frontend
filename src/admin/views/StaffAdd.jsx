import { Button, Card, CardContent, CardHeader, CardTitle, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui"
import { useForm } from "react-hook-form";
import { CustomAlert, PasswordInput } from "../components";
import { LoaderCircle } from "lucide-react";
import { useAdminsStore } from "@/hooks";
import { useMemo } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const StaffAdd = () => {
    const { loading, message } = useAdminsStore();

    const isLoadingData = useMemo(() => loading === 'loading', [loading]);

    const zodSchema = z.object({
        first_name: z.string({
            required_error: 'El nombre es obligatorio.'
        }),
        last_name: z.string({
            required_error: 'El apellido es obligatorio.'
        }),
        username: z.string({
            required_error: 'El nombre de usuario es obligatorio.'
        }),
        email: z.string({
            required_error: 'El correo electrónico es obligatorio.'
        }).email({ message: 'El correo electrónico no es válido.' }),
        password: z.string({
            required_error: 'La contraseña es obligatoria.'
        }).min(6, { message: 'La contraseña debe tener al menos 6 caracteres.' }),
        role: z.string({
            required_error: 'El perfil es obligatorio.'
        }).refine(value => ['ADMIN_ROLE', 'MODERATOR_ROLE', 'APPLICATOR_ROLE'].includes(value), { message: 'El perfil no es válido.' })
    });

    const { control, handleSubmit, formState: { errors }, reset, ...form } = useForm({
        defaultValues: {
            first_name: '',
            last_name: '',
            username: '',
            email: '',
            password: '',
            role: '',
        },
        resolver: zodResolver(zodSchema)
    });

    const onSubmit = handleSubmit(data => {
        console.log({data});
    });
    
    return (
        <Card className={`w-[500px] h-min flex flex-col justify-between shadow-sm ${ isLoadingData && 'opacity-60 pointer-events-none' }`} > 
            <CardHeader>
                <CardTitle>Registro de staff</CardTitle>
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
                            name="last_name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Apellido(s)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Apellidos" { ...field } type="text" className="transition" />
                                    </FormControl>
                                    <FormMessage >
                                        { errors.last_name && errors.last_name.message }
                                    </FormMessage>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={ control }
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Usuario</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Nombre de usuario" { ...field } type="text" className="transition" />
                                    </FormControl>
                                    <FormMessage >
                                        { errors.username && errors.username.message }
                                    </FormMessage>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={ control }
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Correo electrónico</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Dirección de correo electrónico" { ...field } type="text" className="transition" />
                                    </FormControl>
                                    <FormMessage >
                                        { errors.email && errors.email.message }
                                    </FormMessage>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={ control }
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Usuario</FormLabel>
                                    <FormControl>
                                        <PasswordInput placeholder="Contraseña" { ...field } className="transition" />
                                    </FormControl>
                                    <FormMessage >
                                        { errors.password && errors.password.message }
                                    </FormMessage>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={ control }
                            name="role"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Perfil</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={ field.onChange } value={ field.value } >
                                            <SelectTrigger className="w-full transition">
                                            <SelectValue placeholder="Selecciona un perfil"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Roles</SelectLabel>
                                                <SelectItem value="ADMIN_ROLE">Administrador</SelectItem>
                                                <SelectItem value="MODERATOR_ROLE">Manejador</SelectItem>
                                                <SelectItem value="APPLICATOR_ROLE">Aplicador</SelectItem>
                                            </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage >
                                        { errors.role && errors.role.message }
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
