import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, Label, Toaster } from "@/components/ui"
import { InfoIcon, LoaderCircle } from "lucide-react"
import { Anahuac } from "../components";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAuthStore } from "@/hooks";
import { EXHA } from "@/components";
import { NavLink } from "react-router-dom";

export const ResetPassword = () => {
    const { startCheckEmailForResetPassword, status } = useAuthStore();

    const loading = status === 'checking';
    
    const zodSchema = z.object({
        email: z.string().min(1, '* Ingresa tu correo electrónico.')
    });
    
    const { control, handleSubmit, formState: { errors }, ...form } = useForm({
        defaultValues: {
            email: ''
        },
        resolver: zodResolver(zodSchema)
    });

    const onSubmit = handleSubmit(async ({ email }) => {
        startCheckEmailForResetPassword(email);
    });
    
    return (
        <main className="flex flex-col h-screen w-screen items-center justify-center">
            <Toaster />

            <Form { ...form }>
                <h1 className="font-semibold text-2xl mb-10">Recuperación de cuenta</h1>
                <form onSubmit={ onSubmit } className={`max-w-96 space-y-6 ${ loading && 'opacity-60 pointer-events-none' } ${ status === 'reset-requested' && 'hidden' }`}>
                    <FormField
                        control={ control }
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Correo electrónico de tu cuenta</FormLabel>
                                <FormControl>
                                <Input className="mt-1 mb-4 transition" type="email" placeholder="Correo electrónico" { ...field } />
                                </FormControl>
                                <FormMessage >
                                    { errors.email && errors.email.message }
                                </FormMessage>
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full">
                        { loading ? (
                            <>
                                <LoaderCircle size={ 20 } className="mr-2 animate-spin" />
                                Enviando...
                            </>
                        ) : 'Enviar' }
                    </Button>
                    <div className="flex items-center gap-2 mt-4">
                        <InfoIcon className="" strokeWidth={ 1.25 }/>
                        <p className="text-gray-500 text-sm">Se enviará un correo con las indicaciones para la recuperación.</p>
                    </div>
                </form>
                {
                    status === 'reset-requested' && (
                        <div>
                            <p className="text-lg font-light text-gray-600 max-w-96">
                                Si tu correo coincide con una cuenta existente, habrás recibido las instrucciones para recuperar tu contraseña. Revisa tu bandeja de entrada.
                            </p>
                            <NavLink to="/admin" className="text-primary underline mt-4">
                                <Button className="w-full mt-4">
                                    Iniciar sesión
                                </Button>
                            </NavLink>
                        </div>
                    )
                }
            </Form>
            <div className="absolute bottom-5 flex justify-between w-full px-10">
                <Anahuac fill="#2B3844" width={140} />
                <p className="text-sm font-light mt-2">© 2025 Colegio Anáhuac Colima. Todos los derechos Reservados.</p>
            </div>
        </main>
    )
}
