import { Badge, Label } from "@/components/ui"

export const SelectBlock = ({ value, onChange }) => {
    const handleSelectBlock = (b = '') => {
        if (b !== value ) {
            onChange(b)
        }
    }
    
    return (
        <div className="flex items-center gap-5 py-5">
            <Label>Bloque:</Label>
            <Badge
                variant={`${ value === 'lectura' ? 'default' : 'outline' }`}
                className="cursor-pointer hover:opacity-80"
                onClick={ () => handleSelectBlock('lectura') }
            >Comprensión lectora y escritura</Badge>
            <Badge
                variant={`${ value === 'matematicas' ? 'default' : 'outline' }`}
                className="cursor-pointer hover:opacity-80"
                onClick={ () => handleSelectBlock('matematicas') }
            >Habilidades lógico-matemáticas</Badge>
            <Badge
                variant={`${ value === 'pensamiento' ? 'default' : 'outline' }`}
                className="cursor-pointer hover:opacity-80"
                onClick={ () => handleSelectBlock('pensamiento') }
            >Habilidades del pensamiento</Badge>
        </div>
    )
}
