import { useEffect, useMemo } from "react";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { CalendarDays, LoaderCircle, Save } from "lucide-react"
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { addDays, format } from "date-fns";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppStore } from "@/hooks";
import localCustom from "../helpers/localCustom";
import {
  Button,
  Calendar,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { CustomAlert } from "../components";

export const ApplicationEdit = () => {
    const { id:appId } = useParams();
    const navigate = useNavigate();
    const { activeApplication:app, startUpdateApp, startLoadActiveApplication, message, isLoading } = useAppStore();
    const { admins } = useSelector( state => state.users );

    const isLoadingApp = useMemo(() => isLoading === 'loading', [isLoading]);

    const zodSchema = z.object({
        date: z.date({ 
            required_error: '* Este campo es obligatorio.'
        }).min(new Date(), '* La fecha debe ser mayor a la actual.'),
        user: z.string().min(1, '* El aplicador es obligatorio.'),
    });
    
    const { control, formState: { errors }, reset, handleSubmit, ...form } = useForm({
        defaultValues: {
            date: app?.date ? new Date(app.date) : new Date(),
            user: app?.user._id || ''
        },
        resolver: zodResolver(zodSchema)
    });

    useEffect(() => {
        if (!app) startLoadActiveApplication(appId);
    }, []);

    useEffect(() => {
        if (app) {
            reset({
                date: new Date(app.date),
                user: app.user._id
            });
        }
    }, [app, reset]);

    const handleNavigate = (path) => navigate(path);

    const onSubmit = handleSubmit((data) => {
        const { date, user } = data;
        startUpdateApp({ id: appId, date, user });
    });


    if (!app) {
        return (
            <div className="flex items-center justify-center">
                <LoaderCircle size={24} strokeWidth={1.25} absoluteStrokeWidth className="animate-spin" />
                <h1>Cargando...</h1>
            </div>
        );
    }
    
    return (        
        <Card className={`w-[550px] mt-10 ${ isLoadingApp && 'opacity-60 pointer-events-none' } transition`}>
            <Form {...form} >
                <form method="PUT" onSubmit={ onSubmit }>
                    <CardHeader>
                        <CardTitle className="text-base">Datos de la aplicación</CardTitle>
                    </CardHeader>
                    <CardContent>
                            <div className="flex border-b pb-4 pt-6">
                                <p className="w-full">ID de aplicación</p>
                                <p className="w-full">{ app.name }</p>
                            </div>
                            <div className="flex border-b pb-4 pt-6">
                                <p className="w-full">Fecha de aplicación</p>
                                <FormField
                                    name="date"
                                    control={ control }
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormControl>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <Button
                                                            variant={"outline"}
                                                            className={cn(
                                                                "w-full pl-3 text-left font-normal",
                                                                !field.value && "text-muted-foreground"
                                                            )}
                                                        >
                                                            <CalendarDays className="mr-auto opacity-50" size={20} strokeWidth={1.5} absoluteStrokeWidth />
                                                            {field.value ? (
                                                                format(field.value, "PPP", { locale: localCustom })
                                                            ) : (
                                                                <span>Selecciona una fecha</span>
                                                            )}
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0" align="start">
                                                        <Calendar
                                                            mode="single"
                                                            selected={ field.value }
                                                            onSelect={ field.onChange }
                                                            disabled={(date) =>
                                                                date < addDays(new Date().setHours(0, 0, 0, 0), 1)
                                                            }
                                                            initialFocus
                                                            locale={ localCustom }
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                            </FormControl>
                                            <FormMessage >
                                                { errors.date && errors.date.message }
                                            </FormMessage>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="flex border-b pb-4 pt-6 mb-3">
                                <p className="w-full">Aplicador</p>
                                <FormField
                                    name="user"
                                    control={ control }
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormControl>
                                                <Select 
                                                    value={ field.value } 
                                                    onValueChange={ field.onChange }
                                                >
                                                    <SelectTrigger className={cn(!field.value && "text-muted-foreground")}>
                                                        <SelectValue placeholder="Selecciona un aplicador" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        { admins.map((admin) => (
                                                            <SelectItem key={ admin.id } value={ admin.id }>
                                                                { admin.name }
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage >
                                                { errors.applicator && errors.applicator.message }
                                            </FormMessage>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            {
                                message && (
                                    <CustomAlert variant='destructive' title="Ha ocurrido un error." message={ message } />
                                )
                            }
                    </CardContent>
                    <CardFooter className="gap-2">
                        <Button className="gap-2" variant="outline" onClick={() => handleNavigate('/aplicaciones') } type="button">
                            <CalendarDays size={20} strokeWidth={1.25} />
                            Ver aplicaciones
                        </Button>
                        <Button className="gap-2" type="submit" disabled={ isLoadingApp }>
                            {
                                isLoadingApp ? (
                                    <>
                                        <LoaderCircle size={20} strokeWidth={1.25} />
                                        GUARDANDO...
                                    </>
                                ) : (
                                    <>
                                        <Save size={20} strokeWidth={1.25}/>
                                        GUARDAR
                                    </>
                                )
                            }
                        </Button>
                    </CardFooter>
                </form>
            </Form>
        </Card>
    )
}
