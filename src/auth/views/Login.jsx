import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from "@/components/ui";
import { useAuthStore } from "@/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const Login = () => {
    const { status, startLoginAspirant, errorMessage } = useAuthStore();
    
    const checkingStatus = useMemo(() => status === 'checking', [status]);
    
    const zodSchema = z.object({
        aspirant_id: z.string().min(1, '* El nombre de usuario es obligatorio.'),
        password: z.string().min(1, '* La contraseña es obligatoria.')
    });
    
    const { control, handleSubmit, formState: { errors }, ...form } = useForm({
        defaultValues: {
            aspirant_id: '',
            password: ''
        },
        resolver: zodResolver(zodSchema)
    });

    const onSubmit = handleSubmit((data) => {
        startLoginAspirant(data);
    })
    
    return (
        <Form { ...form } >
            <form action="POST" onSubmit={ onSubmit } className="flex flex-col gap-6 w-full">
                <FormField  
                    control={ control }
                    name="aspirant_id"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nombre de usuario</FormLabel>
                            <FormControl>
                                <Input placeholder="Nombre de usuario" type="text" { ...field } className="transition shadow-sm" />
                            </FormControl>
                            <FormMessage >
                                { errors.aspirant_id && errors.aspirant_id.message }
                            </FormMessage>
                        </FormItem>
                    )}
                />
                <FormField 
                    control={ control }
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Contraseña</FormLabel>
                            <FormControl>
                                <Input placeholder="Contraseña" type="password" { ...field } className="transition shadow-sm" />
                            </FormControl>
                            <FormMessage >
                                { errors.password && errors.password.message }
                            </FormMessage>
                        </FormItem>
                    )}
                />
                <Button 
                    disabled={ checkingStatus } 
                    type="submit" 
                    className="w-full"
                >
                    { checkingStatus ? 'Cargando...' : 'Iniciar Sesión' }
                </Button>
                { errorMessage && <p className="text-red-500 text-sm text-center">{ errorMessage }</p> }
            </form>
        </Form>
    )
}
