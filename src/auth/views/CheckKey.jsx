import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from "@/components/ui";
import { useKeysStore } from "@/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const CheckKey = () => {
    const { keys, validateKeyStatus, startValidateKey, errorMessage } = useKeysStore();

    const isValidating = useMemo(() => validateKeyStatus === 'validating', [validateKeyStatus]);
    
    const zodSchema = z.object({
        key: z.string().min(1, '* Introduce la clave de admisión.')
    });
    
    const { control, handleSubmit, formState: { errors }, ...form } = useForm({
        defaultValues: {
            key: ''
        },
        resolver: zodResolver(zodSchema)
    });

    const onSubmit = handleSubmit(({ key }) => {
        startValidateKey(key);
    });

    return (
        <Form { ...form }>
            <form onSubmit={ onSubmit } className={`w-full space-y-6 ${ isValidating && 'opacity-60 pointer-events-none' }`}>
                <FormField
                    control={ control }
                    name="key"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Clave de admisión</FormLabel>
                            <FormControl>
                                <Input placeholder="Introduce tu clave de admisión" { ...field } type="text" className="transition" />
                            </FormControl>
                            <FormMessage >
                                { errors.key && errors.key.message }
                            </FormMessage>
                        </FormItem>
                    )}
                />
                <Button type="submit">
                    { isValidating ? (
                        <>
                            <LoaderCircle size={ 20 } className="mr-2 animate-spin" />
                            Validando...
                        </>
                    ) : 'Validar' }
                </Button>
            </form>
        </Form>
    )
}
