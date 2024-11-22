import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, HoverCard, HoverCardContent, HoverCardTrigger, Label } from '@/components/ui'
import { useExamStore } from '@/hooks';
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { SelectBlock, SelectLect } from '.';

export const QuestionsTable = () => {
    const { questions, isLoadingApp, startLoadingAllQuestionsWithCorrectAnswer } = useExamStore();

    const { id } = useParams();

    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [selectedBlock, setSelectedBlock] = useState('');
    const [selectedLect, setSelectedLect] = useState(1); // El id de la lectura 1
    const [blockPoints, setBlockPoints] = useState(0);

    useEffect(() => {
        startLoadingAllQuestionsWithCorrectAnswer(id);
    }, []);

    useEffect(() => {
        if (selectedBlock === 'lectura') {
            setSelectedQuestions(questions.filter(q => q.block === selectedBlock.toUpperCase() && q.relation.number === selectedLect));
        } else {
            setSelectedQuestions(questions.filter(q => q.block === selectedBlock.toUpperCase()));
        }

        setBlockPoints(selectedBlock === 'lectura' ? 440 : selectedBlock === 'matematicas' ? 470 : selectedBlock === 'pensamiento' ? 390 : 0);
    }, [selectedBlock, selectedLect]);

    if (!id) return <h1>Selecciona un examen</h1>;
    
    return (
        <div>
            <div className='flex justify-between'>
                <div>
                    <SelectBlock value={ selectedBlock } onChange={ setSelectedBlock } />
                    {
                        selectedBlock === 'lectura' && <SelectLect value={ selectedLect } onChange={ setSelectedLect } />
                    }
                </div>
                <div className='flex gap-10'>
                    <span className='flex gap-1 items-center'>
                        <Label>Puntos del bloque:</Label>
                        <p className='font-semibold text-blue-600'>{ blockPoints }</p>
                    </span>
                    <span className='flex gap-1 items-center'>
                        <Label>Reactivos del bloque:</Label>
                        <p className='font-semibold text-blue-600'>20</p>
                    </span>
                    <span className='flex gap-1 items-center'>
                        <Label>Porcentaje:</Label>
                        <p className='font-semibold text-blue-600'>{((blockPoints * 100) / 1300).toPrecision(4)}%</p>
                    </span>
                </div>
            </div>
            <div className='border rounded-md'>
                <div className='flex gap-10 pl-[68px] border-b py-3 shadow-sm'>
                    <span className='w-[110px]'>ID Reactivo</span>
                    <span className='w-[110px]'>No. Reactivo</span>
                    <span className='w-[110px]'>Valor</span>
                    <span className='w-[110px]'>Porcentaje</span>
                </div>
                <Accordion type="single" collapsible className='max-h-[570px] overflow-y-auto'>
                    {
                        selectedQuestions?.map(q => (
                            <AccordionItem key={ q.id } value={`item-${ q.id }`} className="border-0 border-t">
                                <AccordionTrigger>
                                    <div className='flex gap-10 text-left'>
                                        {
                                            q.block === 'LECTURA' ? (
                                                <span className='w-[110px]'>
                                                    {`E${ q.exam.origin[0] }-B${ q.block[0].toUpperCase() }-L${ q.relation.number }-R${ q.questionNumber }`}
                                                </span>
                                            ) : (
                                                <span className='w-[110px]'>
                                                    {`E${ q.exam.origin[0] }-B${ q.block[0].toUpperCase() }-R${ q.questionNumber }`}
                                                </span>
                                            )
                                        }
                                        <span className='w-[110px]'>{ (q.questionNumber < 10 ? `0${ q.questionNumber }` : q.questionNumber) }</span>
                                        <span className='w-[110px]'>{ q.points }</span>
                                        <span className='w-[110px]'>{ ((q.points * 100) / 1300).toPrecision(3) }%</span>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <div className='max-w-[700px] pt-10 px-5 text-base'>
                                        {
                                            q.attachment ? (
                                                <HoverCard>
                                                    <HoverCardTrigger className='cursor-help font-semibold underline'>{ q.question }</HoverCardTrigger>
                                                    <HoverCardContent>
                                                        <img src={ q.attachment } alt="image" />
                                                    </HoverCardContent>
                                                </HoverCard>
                                            ) : (
                                                <p>{ q.question }</p>
                                            )
                                        }

                                        <div className='mt-10'>
                                            <span className='font-semibold text-gray-500'>Respuestas ................................</span>
                                            <span className='font-semibold text-gray-500 ml-5'>
                                                Correcta: 
                                                &nbsp;
                                                {
                                                    q.correctAnswer.map((c, i) => (
                                                        <span key={i} className='text-blue-600'>
                                                            { `${i === 1 ? ', ' + c.toUpperCase() : c.toUpperCase()}` }
                                                        </span>
                                                    ))
                                                }
                                            </span>
                                        </div>
                                        <ul className={`${ q.type === 'single-image' && 'grid grid-cols-2 justify-normal w-max gap-x-10' }`}>
                                            {
                                                q.answers.map((o, i) => (
                                                    <li key={ i } className='flex items-center gap-5 my-5'>
                                                        <span className='font-extrabold'>{ o.opt.toUpperCase() }</span>
                                                        {
                                                            q.type === 'single-image' ? (
                                                                <img src={ o.answer } alt={ o.opt } className='w-10 h-10' />
                                                            ) : (
                                                                <span>{ o.answer }</span>
                                                            )
                                                        }
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        ))
                    }
                </Accordion>
            </div>
        </div>
    )
}
