import { Checkbox, Label } from "@/components/ui"

export const MultipleSelectionAnswer = ({ answers, value = [], onChange }) => {
    const handleChange = (checkVal) => {
        if (value.includes(checkVal)) {
            return value.filter(val => val !== checkVal);
        }

        if (value.length >= 2) {
            return value;
        }
        
        return [...value, checkVal];
    };
    
    return (
        <div>
            {
                answers.map((answer, index) => (
                    <div 
                        key={ index }
                        className={`flex items-center text-sm 2xl:text-base gap-3 border ${ value.includes(answer.opt) ? 'bg-teal-200/60 border-teal-400 text-black' : 'border-transparent text-gray-600'} rounded-xl px-2.5 2xl:px-5 py-1.5 2xl:py-3 transition`}
                    >
                        <Checkbox
                            checked={ value.includes(answer.opt) }
                            onCheckedChange={ () => onChange(handleChange(answer.opt)) }
                            value={ answer.opt }
                            id={ answer.opt }
                        />
                        <Label className="uppercase" htmlFor={ answer.opt }>{ answer.opt }</Label>
                        <label className="cursor-pointer" htmlFor={ answer.opt }>
                            { answer.answer }
                        </label>
                    </div>
                ))
            }
        </div>
    )
}
