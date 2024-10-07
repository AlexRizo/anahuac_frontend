export const LoginUser = () => {
    return (
        <section className="h-screen w-screen flex justify-center items-center bg-orange-50">
            <div className="border shadow p-6 bg-white w-[460px]">
                <div className="text-center">
                    <h1 className="text-2xl font-medium">Examen de Admisión</h1>
                    <h2 className="text-xl">Secundaria Anáhuac</h2>
                    <p className="mt-5 text-gray-700">Ingresa con los datos entregados por tu maestro/a</p>
                </div>
                <form action="POST">
                    <div className="flex flex-col my-5 gap-1">
                        <label htmlFor="username" className="text-lg">Usuario</label>
                        <input type="text" name="username" id="username" className="p-3 border focus:outline-none focus:border-orange-500 focus:bg-orange-50 transition-colors "/>
                    </div>
                    <div className="flex flex-col my-5 gap-1">
                        <label htmlFor="password" className="text-lg">Contraseña</label>
                        <input type="password" name="password" id="password" className="p-3 border focus:outline-none focus:border-orange-500 focus:bg-orange-50 transition-colors "/>
                    </div>
                    <div>
                        <button type="submit" className="bg-orange-500 text-white w-full p-3 text-lg hover:bg-orange-600 focus:bg-orange-50 focus:opacity-90 transition-colors">Ingresar</button>
                    </div>
                </form>
            </div>
        </section>
    )
}
