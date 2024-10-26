import { Button, Input } from "@/components/ui"
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { forwardRef, useState } from "react";

export const PasswordInput = forwardRef(({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const disabled = props.value === '' || props.value === undefined || props.disabled;

    return (
        <div className="relative">
            <Input 
                type={ showPassword ? 'text' : 'password'}
                className={ className }
                { ...props }
                ref={ ref }
            >
            </Input>
            <Button 
                variant="ghost"
                type="button"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={ () => setShowPassword(!showPassword) }
                disabled={ disabled }
            >
                {
                    showPassword ? (
                        <EyeOffIcon className="w-5 h-5" />
                    ) : (
                        <EyeIcon className="w-5 h-5" />
                    )
                }
            </Button>
        </div>
    )
});
