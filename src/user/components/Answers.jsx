import { Label, RadioGroup, RadioGroupItem } from "@/components/ui"

export const Answers = ({ answers, value, onChange }) => {

    return (
        <RadioGroup value={ value } onValueChange={ onChange }>
        {
            answers.map((answer, index) => (
                <div 
                    key={ index }
                    className={`flex items-center gap-3 border border-transparent text-gray-600 ${ value === answer.opt && 'bg-teal-200/60 border border-teal-400 text-black'} rounded-xl px-5 py-3 transition`}
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
