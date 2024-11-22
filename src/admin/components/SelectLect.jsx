import { Badge, Label } from "@/components/ui"

export const SelectLect = ({ value, onChange }) => {
    const handleSelectLect = (b = '') => {
        if (b !== value ) {
            onChange(b)
        }
    }
    
    return (
        <div className="flex items-center gap-5 py-5">
            <Label>Lectura:</Label>
            <Badge
                variant={`${ value === 1 ? 'default' : 'outline' }`}
                className="cursor-pointer hover:opacity-80"
                onClick={ () => handleSelectLect(1) }
            >Lectura 1</Badge>
            <Badge
                variant={`${ value === 2 ? 'default' : 'outline' }`}
                className="cursor-pointer hover:opacity-80"
                onClick={ () => handleSelectLect(2) }
            >Lectura 2</Badge>
            <Badge
                variant={`${ value === 3 ? 'default' : 'outline' }`}
                className="cursor-pointer hover:opacity-80"
                onClick={ () => handleSelectLect(3) }
            >Lectura 3</Badge>
        </div>
    )
}
