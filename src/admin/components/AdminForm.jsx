import { useForm } from 'react-hook-form';
import { Button, Form, FormField, FormItem, FormLabel, FormControl, FormMessage, Input, Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem } from '@/components/ui';
import { CustomAlert, PasswordInput } from '.';
import { LoaderCircle } from 'lucide-react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export const AdminForm = (
    {
        defaultValues = {
            first_name: '',
            last_name: '',
            username: '',
            email: '',
            password: '',
            role: undefined
        },
        isLoadingData = true,
        message = '',
        saveData = () => {},
        id = ''
    }
) => {
    const isPasswordRequired = id ? z.string().optional() : z.string().min(6, { message: 'La contraseña debe tener al menos 6 caracteres.' }); 
    
    const zodSchema = z.object({
        first_name: z.string().min(1, { message: 'El nombre es obligatorio.' }),
        last_name: z.string().min(1, { message: 'El apellido es obligatorio.' }),
        username: z.string().min(1, { message: 'El nombre de usuario es obligatorio.' }),
        email: z.string({
            required_error: 'El correo electrónico es obligatorio.'
        }).email({ message: 'El correo electrónico no es válido.' }),
        password: isPasswordRequired,
        role: z.string({
            required_error: 'El perfil es obligatorio.'
        }).refine(value => ['ADMIN_ROLE', 'MOD_ROLE', 'APPLICATOR_ROLE'].includes(value), { message: 'El perfil no es válido.' })
    });
    
    const { control, handleSubmit, formState: { errors }, reset, ...form } = useForm({
        defaultValues,
        resolver: zodResolver(zodSchema)
    });

    const onSubmit = handleSubmit((data) => {
        if (id) {
            saveData(id, data);
        } else {
            saveData(data);
        }
    });

    return (
        <Form { ...form }>
            <form action="POST" className="flex flex-col gap-4" onSubmit={ handleSubmit(onSubmit) }>
                <FormField
                    control={control}
                    name="first_name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nombre(s)</FormLabel>
                            <FormControl>
                                <Input placeholder="Nombre completo" {...field} type="text" className="transition" />
                            </FormControl>
                            <FormMessage>
                                {errors.first_name && errors.first_name.message}
                            </FormMessage>
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="last_name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Apellido(s)</FormLabel>
                            <FormControl>
                                <Input placeholder="Apellidos" {...field} type="text" className="transition" />
                            </FormControl>
                            <FormMessage>
                                {errors.last_name && errors.last_name.message}
                            </FormMessage>
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Usuario</FormLabel>
                            <FormControl>
                                <Input placeholder="Nombre de usuario" {...field} type="text" className="transition" />
                            </FormControl>
                            <FormMessage>
                                {errors.username && errors.username.message}
                            </FormMessage>
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Correo electrónico</FormLabel>
                            <FormControl>
                                <Input placeholder="Dirección de correo electrónico" {...field} type="text" className="transition" />
                            </FormControl>
                            <FormMessage>
                                {errors.email && errors.email.message}
                            </FormMessage>
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Contraseña</FormLabel>
                            <FormControl>
                                <PasswordInput placeholder="Contraseña" {...field} className="transition" />
                            </FormControl>
                            <FormMessage>
                                {errors.password && errors.password.message}
                            </FormMessage>
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="role"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Perfil</FormLabel>
                            <FormControl>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger className="w-full transition">
                                        <SelectValue placeholder="Selecciona un perfil" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Roles</SelectLabel>
                                            <SelectItem value="ADMIN_ROLE">Administrador</SelectItem>
                                            <SelectItem value="MOD_ROLE">Manejador</SelectItem>
                                            <SelectItem value="APPLICATOR_ROLE">Aplicador</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage>
                                {errors.role && errors.role.message}
                            </FormMessage>
                        </FormItem>
                    )}
                />
                {message && (
                    <CustomAlert variant='destructive' title="Ha ocurrido un error." message={message} />
                )}
                <Button type="submit" disabled={isLoadingData}>
                    {isLoadingData ? (
                        <>
                            <LoaderCircle size={20} className="mr-2 animate-spin" />
                            Registrando...
                        </>
                    ) : 'Registrar'}
                </Button>
            </form>
        </Form>
    );
};
