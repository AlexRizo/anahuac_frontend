import { 
    DropdownMenu, 
    DropdownMenuTrigger, 
    DropdownMenuContent, 
    DropdownMenuLabel, 
    DropdownMenuSeparator, 
    DropdownMenuCheckboxItem, 
    Button, 
    Badge
} from '@/components/ui';

export const SelectOrigin = ({ filterStatus, setFilterStatus }) => {

    // const [filterStatus, setFilterStatus] = useState([]) // ? This is the original state;

    const handleFilterStatus = (status) => {
        if (filterStatus.includes(status)) {
            setFilterStatus(filterStatus.filter((item) => item !== status));
        } else {
            setFilterStatus([...filterStatus, status]);
        }
    };

    return (
        <div className='flex bg-white border border-dashed border-gray-300 space-x-1'>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="focus:!ring-0 focus:!ring-offset-0">Tipo</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Orígenes</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem
                        checked={ filterStatus.includes('SECUNDARIA') }
                        onCheckedChange={ () => handleFilterStatus('SECUNDARIA') }
                    >
                        Secundaria
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                        checked={ filterStatus.includes('PREPARATORIA') }
                        onCheckedChange={ () => handleFilterStatus('PREPARATORIA') }
                    >
                        Preparatoria
                    </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <span className='text-slate-400 flex items-center pr-1'>|</span>
            <div className="flex items-center justify-center gap-1 pr-3">
                {
                    !filterStatus.includes('SECUNDARIA') && !filterStatus.includes('PREPARATORIA') && <Badge variant="secondary">Sin filtro</Badge>
                }
                {
                    filterStatus.includes('SECUNDARIA') && <Badge variant="secondary">Secundaria</Badge>
                }
                {
                    filterStatus.includes('PREPARATORIA') && <Badge variant="secondary">Preparatoria</Badge>
                }
            </div>
        </div>
    )
}
