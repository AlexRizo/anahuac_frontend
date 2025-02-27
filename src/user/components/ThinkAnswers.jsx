import { Label, RadioGroup, RadioGroupItem } from "@/components/ui"
import { FourDigitsPrompt, MagicTriangle } from ".";

export const ThinkAnswers = ({ answers, value, type, onChange }) => {
    
    const handleChange = (checkVal) => {
        return onChange([checkVal]);
    }
    
    if (type === 'four-digits') {
        return <FourDigitsPrompt response={ value } setResponse={ onChange } />
    } else if (type === 'triangle') {
        return <MagicTriangle response={ value } setResponse={ onChange } />
    }

    return (
        <RadioGroup value={ value[0] || null } onValueChange={ handleChange } className={`${ type === 'single-image' && 'grid grid-cols-2 grid-rows-2' }`} >
            {
                answers.map((answer, index) => (
                    <div 
                        key={ index }
                        className={`flex items-center gap-3 border ${ value[0] === answer.opt ? 'bg-teal-200/60 border-teal-400 text-black' : 'border-transparent text-gray-600'} rounded-xl px-2.5 2xl:px-5 py-1.5 2xl:py-3 transition`}
                    >
                        <RadioGroupItem value={ answer.opt } id={ answer.opt } />
                        <Label className="uppercase" htmlFor={ answer.opt }>{ answer.opt }</Label>
                        {
                            type === 'single-image' ? (
                                <img 
                                    className="size-32 2xl:size-36 object-cover cursor-pointer"
                                    src={ answer.answer }
                                    onClick={ () => handleChange(answer.opt) }
                                    alt={ answer.opt }
                                />
                            ) : (
                                <label className="text-base 2xl:text-lg cursor-pointer" htmlFor={ answer.opt }>
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
