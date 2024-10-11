import { useAuthStore, useUiStore } from "@/hooks";
import { Anahuac } from "../components"
import { useMemo } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from "@/components/ui";
import { LoaderCircle } from "lucide-react";

export const LoginUser = () => {

    const { startLogin, errorMessage, status } = useAuthStore();
    const { systemStatus } = useUiStore();

    const checkingStatus = useMemo(() => status === 'checking', [status]);

    const zodSchema = z.object({
        email: z.string().email('* El correo electrónico no es válido.').min(1, '* El correo electrónico es obligatorio.'),
        password: z.string().min(1, '* La contraseña es obligatoria.')
    });

    const { control, handleSubmit, formState: { errors }, ...form } = useForm({
        defaultValues: {
            email: '',
            password: ''
        },
        resolver: zodResolver(zodSchema)
    });

    const onSubmit = handleSubmit((data) => {
        startLogin(data.email, data.password);
    })

    return (
        <section className="h-screen w-screen flex justify-end items-center bg-orange-50 animate__animated animate__fadeIn overflow-hidden relative">
            <div className={`absolute pt-16 pb-10 px-28 bg-[url('/img/login_user/login-user.jpg')] bg-cover bg-center h-full left-0 ${ systemStatus ? "w-[55%]" : "w-[100%]" } transition-[width] duration-1000 ease-in-out`}>
                <div className="absolute top-0 left-0 h-full w-full  bg-gradient-to-br from-[#FF9D26B2] to-[#FF8706B2]"></div>
                <div className="absolute top-0 left-0 h-full w-full bg-[url('/img/login_user/login-user-bg.jpg')] opacity-20 bg-cover bg-center z-10"></div>
                <div className="flex flex-col justify-between h-full w-full relative z-20 text-white">
                    <div className="uppercase text-center drop-shadow-xl">
                        <h1 className="text-[40px]">La experiencia</h1>
                        <h2 className="font-black text-[70px]">Anáhuac</h2>
                    </div>
                    <div>
                        <h1 className="text-[70px] permanent-maker text-center drop-shadow-xl">Comienza hoy</h1>
                    </div>
                </div>
            </div>
            { systemStatus &&
                <div className={`border shadow p-6 h-full bg-white ${ checkingStatus && 'opacity-50 pointer-events-none' } flex w-[45%]`}>
                    <div className="w-[493px] m-auto">
                        <div className="mb-6 flex flex-col gap-4">
                            <Anahuac fill="#2B3844" className="mb-8" />
                            <h1 className="text-2xl font-medium text-primary">Bienvenido/a al Examen de Admisión de Prepa Anáhuac</h1>
                            <h2 className="text-sm text-slate-500">Atiende las instrucciones del aplicador, él te proporcionara tu usuario y contraseña para acceder a la prueba.</h2>
                        </div>
                        <Form { ...form } >
                            <form action="POST" onSubmit={ onSubmit } className="flex flex-col gap-6 w-full">
                                <FormField  
                                    control={ control }
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Correo</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Correo electrónico" type="email" { ...field } className="transition shadow-sm" />
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
                                <Button disabled={ checkingStatus } type="submit" className="w-full" >
                                    
                                    { checkingStatus 
                                        ? <> <LoaderCircle strokeWidth={1} className="animate-spin" /> Autenticando... </>
                                        : 'Iniciar Sesión'
                                    }
                                </Button>
                                { errorMessage && <p className="text-red-500 text-sm text-center">{ errorMessage }</p> }
                            </form>
                        </Form>
                    </div>
                </div>
            }
        </section>
    )
}
