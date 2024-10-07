import { useForm } from "react-hook-form";
import { useAuthStore } from "../hooks";

export const LoginAdmin = () => {
    const { startLogin, errorMessage } = useAuthStore();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = handleSubmit((data) => {
        startLogin({...data});
    })
    
    return (
        <section className="h-screen w-screen flex justify-center items-center bg-orange-50">
            <div className="border shadow p-6 bg-white w-[460px]">
                <div className="text-center">
                    <h1 className="text-2xl font-medium">Bienvenido/a, Profesor</h1>
                    <h2 className="text-xl">Secundaria Anáhuac</h2>
                </div>
                <form action="POST" onSubmit={ onSubmit }>
                    <div className="flex flex-col my-5 gap-1">
                        <label htmlFor="email" className="text-lg">Correo</label>
                        <input 
                            type="email" 
                            name="email" 
                            id="email" 
                            className="p-3 border focus:outline-none focus:border-orange-500 focus:bg-orange-50 transition-colors"
                            {...register("email", { required: true })}
                        />
                    </div>
                    <div className="flex flex-col my-5 gap-1">
                        <label htmlFor="password" className="text-lg">Contraseña</label>
                        <input 
                            type="password"
                            name="password"
                            id="password"
                            className="p-3 border focus:outline-none focus:border-orange-500 focus:bg-orange-50 transition-colors"
                            {...register("password", { required: true })}
                        />
                    </div>
                    <div>
                        <button type="submit" className="bg-orange-500 text-white w-full p-3 text-lg hover:bg-orange-600 focus:bg-orange-50 focus:opacity-90 transition-colors">Ingresar</button>
                        { errors.email && <p className="text-red-500 text-sm">{ errors.email.message }</p> }
                        { errors.password && <p className="text-red-500 text-sm">{ errors.password.message }</p> }
                    </div>
                </form>
            </div>
        </section>
    )
}
