import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from "@/components/ui";
import { useAuthStore } from "../../hooks";
import { Anahuac, ModeloEducativo } from "../components";
import { EXHA } from "@/components";
import { NavLink } from "react-router-dom";

export const LoginAdmin = () => {
    const { startLogin, errorMessage, status } = useAuthStore();

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
        <section className="h-screen w-screen flex justify-center items-center bg-orange-50">
            <div className="pt-10 2xl:pt-16 pb-5 2xl:pb-10 px-28 bg-gradient-to-br from-[#4062D2] to-[#1F2274] h-full w-[55%] relative">
                <div className="absolute top-0 left-0 h-full w-full bg-[url('/img/login_admin/login-background.jpg')] opacity-20 bg-cover bg-center"></div>
                <div className="flex flex-col justify-between h-full w-full relative z-10 text-white">
                    <div>
                        <Anahuac/>
                    </div>
                    <div>
                        <ModeloEducativo className="w-[234px] h-[280px] 2xl:size-auto"/>
                        <p className="2xl:text-lg w-4/5 2xl:w-auto 2xl:max-w-[579px]">
                            Guíamos a nuestros estudiantes para que construyan su proyecto 
                            de vida y los apoyamos a descubrir sus potencialidades, 
                            ofreciendo cinco áreas de especialidad.
                        </p>
                    </div>
                    <div>
                        <p className="text-sm font-light">© 2025 Colegio Anáhuac Colima. Todos los derechos Reservados.</p>
                    </div>
                </div>
            </div>
            <div className={`border shadow p-6 w-[45%] h-full bg-white ${ checkingStatus && 'opacity-50 pointer-events-none' } transition flex relative`}>
                <div className="w-[493px] m-auto">
                    <div className="flex flex-col gap-2 mb-7 2xl:mb-14">
                        <EXHA className="w-[230px] h-[56px] 2xl:w-[274px] 2xl:h-[67px]"/>
                        <h1 className="text-xs uppercase">Examen de habilidades para el aprendizaje</h1>
                    </div>
                    <div className="mb-4 2xl:mb-6 flex flex-col gap-1">
                        <h1 className="text-xl 2xl:text-2xl font-medium text-primary">Bienvenido/a</h1>
                        <h2 className="text-xs 2xl:text-sm text-slate-500">Introduce tus credenciales</h2>
                    </div>
                    <Form { ...form } >
                    <form action="POST" onSubmit={ onSubmit } className="flex flex-col gap-4 2xl:gap-6 w-full">
                        <FormField  
                            control={ control }
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Correo</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Correo electrónico" type="email" { ...field } className="transition shadow-sm" />
                                    </FormControl>
                                    <FormMessage className="text-xs 2xl:text-sm">
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
                                    <FormMessage className="text-xs 2xl:text-sm">
                                        { errors.password && errors.password.message }
                                    </FormMessage>
                                </FormItem>
                            )}
                        />
                        <Button disabled={ checkingStatus } type="submit" className="w-full" >{ checkingStatus ? 'Cargando...' : 'Iniciar Sesión' }</Button>
                        { errorMessage && <p className="text-red-500 text-xs 2xl:text-sm text-center">{ errorMessage }</p> }
                        <NavLink to="/admin/reset-password" className="text-xs 2xl:text-sm text-primary text-center underline text-blue-950">¿Olvidaste tu contraseña?</NavLink>
                    </form>
                </Form>
                <div className="absolute bottom-5">
                    <Anahuac fill="#2B3844" width={140} />
                    <p className="text-sm font-light mt-2">© 2025 Colegio Anáhuac Colima. Todos los derechos Reservados.</p>
                </div>
                </div>
            </div>
        </section>
    )
}