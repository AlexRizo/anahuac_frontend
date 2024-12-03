import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, Label } from "@/components/ui"
import { InfoIcon, LoaderCircle } from "lucide-react"
import { useEffect } from "react";
import { Anahuac } from "../components";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import anahuacApi from '@/api/api.js';
import { Navigate, useParams } from "react-router-dom";
import { useAuthStore } from "@/hooks";

export const ConfirmPassword = () => {
    const { token } = useParams();

    if (!token) return <Navigate to="/admin" />;

    const { startResetPassword, checkResetToken, status } = useAuthStore();

    useEffect(() => {
        checkResetToken(token);
    }, []);

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
                <form onSubmit={ onSubmit } className={`max-w-96 space-y-6 ${ loading && 'opacity-60 pointer-events-none' }`}>
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
                    <div className="flex items-center gap-2 mt-4">
                        <InfoIcon className="" strokeWidth={ 1.25 }/>
                        <p className="text-gray-500 text-sm">Introduce la nueva contraseña para iniciar sesión.</p>
                    </div>
                </form>
            </Form>
        </main>
    )
}
