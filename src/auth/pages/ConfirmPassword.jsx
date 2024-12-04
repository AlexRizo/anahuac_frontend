import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, Label } from "@/components/ui"
import { InfoIcon, LoaderCircle } from "lucide-react"
import { useEffect, useState } from "react";
import { Anahuac } from "../components";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Navigate, NavLink, useParams } from "react-router-dom";
import { useAuthStore } from "@/hooks";

export const ConfirmPassword = () => {
    const { token } = useParams();

    if (!token) return <Navigate to="/admin" />;

    const { startResetPassword, checkResetToken, status } = useAuthStore();
    const [expiredMessage, setExpiredMessage] = useState(undefined);

    useEffect(() => {
        checkResetToken(token);
    }, []);

    useEffect(() => {
        if (status === 'token-expired') {
            setExpiredMessage('El enlace de recuperación ha expirado o no existe. Solicita uno nuevo.');
        }
    }, [status]);

    const loading = status === 'checking';

    const zodSchema = z.object({
        password: z.string({
            required_error: '* Ingresa la nueva contraseña.'
        }).min(6, '* La contraseña debe tener al menos 6 caracteres.'),
    });
    
    const { control, handleSubmit, formState: { errors }, ...form } = useForm({
        defaultValues: {
            password: ''
        },
        resolver: zodResolver(zodSchema)
    });

    const onSubmit = handleSubmit(async ({ password }) => {
        startResetPassword(token, password);
    });
    
    return (
        <main className="flex flex-col h-screen w-screen items-center justify-center">
            <Anahuac fill="orange" className="mx-auto mb-14"/>

            <Form { ...form }>
                {
                    expiredMessage ? (
                        <div className="max-w-96">
                            <p className="text-lg font-light text-gray-600">{ expiredMessage }</p>
                            <NavLink to="/admin/reset-password">
                                <Button className="w-full mt-4" >
                                    Nueva solicitud
                                </Button>
                            </NavLink>
                        </div>
                    ) : (<>
                        {
                            status === 'reset-success' ? (
                            <div className="max-w-96">
                            <p className="text-lg font-light text-gray-600">Ya puedes iniciar sesión con tu nueva contraseña.</p>
                                <NavLink to="/admin">
                                    <Button className="w-full mt-4" >
                                        Iniciar sesión
                                    </Button>
                                </NavLink>
                            </div>
                            ) : (
                                <form onSubmit={ onSubmit } className={`max-w-96 w-full space-y-6 ${ loading && 'opacity-60 pointer-events-none' }`}>
                                    <FormField
                                        control={ control }
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Ingresa tu nueva contraseña</FormLabel>
                                                <FormControl>
                                                <Input className="mt-1 mb-4 transition" type="text" placeholder="Nueva contraseña" { ...field } />
                                                </FormControl>
                                                <FormMessage >
                                                    { errors.password && errors.password.message }
                                                </FormMessage>
                                            </FormItem>
                                        )}
                                    />
                                    <Button type="submit" className="w-full">
                                        { loading ? (
                                            <>
                                                <LoaderCircle size={ 20 } className="mr-2 animate-spin" />
                                                Cambiando...
                                            </>
                                        ) : 'Cambiar' }
                                    </Button>
                                </form>
                            )
                        }
                    </>)
                }
            </Form>
        </main>
    )
}
