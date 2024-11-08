import { Label, RadioGroup, RadioGroupItem } from "@/components/ui"

export const MathematicAnswers = ({ answers, value, onChange }) => {
    
    const handleChange = (checkVal) => {
        return onChange([checkVal]);
    }
    
    return (
        <RadioGroup value={ value[0] || null } onValueChange={ handleChange }>
        {
            answers.map((answer, index) => (
                <div 
                    key={ index }
                    className={`flex items-center gap-3 border ${ value[0] === answer.opt ? 'bg-teal-200/60 border-teal-400 text-black' : 'border-transparent text-gray-600'} rounded-xl px-5 py-3 transition`}
                >
                    <RadioGroupItem value={ answer.opt } id={ answer.opt } />
                    <Label className="uppercase" htmlFor={ answer.opt }>{ answer.opt }</Label>
                    <label className="cursor-pointer" htmlFor={ answer.opt }>
                        { answer.answer }
                    </label>
                </div>
            ))
        }
    </RadioGroup>
    )
}
