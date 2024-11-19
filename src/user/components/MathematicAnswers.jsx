import { Label, RadioGroup, RadioGroupItem } from "@/components/ui"

export const MathematicAnswers = ({ answers, value, type, onChange }) => {
    
    const handleChange = (checkVal) => {
        return onChange([checkVal]);
    }
    
    return (
<RadioGroup value={ value[0] || null } onValueChange={ handleChange } className={`${ type === 'single-image' && 'grid grid-cols-2 grid-rows-2' }`} >
            {
                answers.map((answer, index) => (
                    <div 
                        key={ index }
                        className={`flex items-center gap-3 border ${ value[0] === answer.opt ? 'bg-teal-200/60 border-teal-400 text-black' : 'border-transparent text-gray-600'} rounded-xl px-5 py-3 transition`}
                    >
                        <RadioGroupItem value={ answer.opt } id={ answer.opt } />
                        <Label className="uppercase" htmlFor={ answer.opt }>{ answer.opt }</Label>
                        {
                            type === 'single-image' ? (
                                <img 
                                    className="size-28 object-cover cursor-pointer"
                                    src={ answer.answer }
                                    onClick={ () => handleChange(answer.opt) }
                                    alt={ answer.opt }
                                />
                            ) : (
                                <label className="cursor-pointer" htmlFor={ answer.opt }>
                                    { answer.answer }
                                </label>
                            )
                        }
                    </div>
                ))
            }
        </RadioGroup>
    )
}
