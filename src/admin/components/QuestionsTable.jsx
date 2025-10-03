import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, HoverCard, HoverCardContent, HoverCardTrigger, Label } from '@/components/ui'
import { useExamStore } from '@/hooks';
import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import { LecturaCard, SelectBlock, SelectLect } from '.';
import { BookOpenCheck, Eye } from 'lucide-react';

export const QuestionsTable = () => {
    const { currentExam, questions, specials, startLoadingSpecials } = useExamStore();

    const { id } = useParams();

    const itemsRef = useRef([]);
    const tableRef = useRef(null);

    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [selectedBlock, setSelectedBlock] = useState('');
    const [selectedLect, setSelectedLect] = useState(1); // El id de la lectura 1
    const [blockPoints, setBlockPoints] = useState(0);
    const [special, setSpecial] = useState([]);

    const scrollToItem = (index) => {
        const container = tableRef.current;
        const item = itemsRef.current[index];
        if (item) {
            setTimeout(() => {
                container.scrollTo({ top: item.offsetTop - container.offsetTop, behavior: 'smooth' });
            }, 300);
        }
    }

    useEffect(() => {
        if (specials.length === 0) return;
        setSpecial(specials.find(s => s.number === selectedLect));
    }, [specials, selectedLect]);

    useEffect(() => {
        itemsRef.current = [];

        if (selectedBlock === 'lectura') {
            setSelectedQuestions(questions.filter(q => q.block === selectedBlock.toUpperCase() && q.relation.number === selectedLect));
            if (specials.length === 0) {
                startLoadingSpecials();
            }
        } else {
            setSelectedQuestions(questions.filter(q => q.block === selectedBlock.toUpperCase()));
        }

        setBlockPoints(currentExam?.score?.[selectedBlock] || 0);
    }, [selectedBlock, selectedLect]);

    if (!id) return <h1>Selecciona un examen</h1>;
    
    return (
        <div>
            <div className='flex justify-between items-start'>
                <div>
                    <SelectBlock value={ selectedBlock } onChange={ setSelectedBlock } />
                    {
                        selectedBlock === 'lectura' && (
                            <div className='flex'>
                                <SelectLect value={ selectedLect } onChange={ setSelectedLect } />
                                <LecturaCard { ...special } >
                                    <span className='flex items-center gap-2 ml-6 underline cursor-pointer'>
                                        <Label className="font-semibold">Ver lectura</Label>
                                        <BookOpenCheck size={ 18 } />
                                    </span>
                                </LecturaCard>
                            </div>
                        )
                    }
                </div>
                <div className='flex gap-10'>
                    <span className='flex gap-1 items-center'>
                        <Label>Puntos del bloque:</Label>
                        <p className='font-semibold text-blue-600'>{ blockPoints }</p>
                    </span>
                    <span className='flex gap-1 items-center'>
                        <Label>Reactivos del bloque:</Label>
                        <p className='font-semibold text-blue-600'>{ selectedQuestions.length > 1 ? 20 : 0 }</p>
                    </span>
                    <span className='flex gap-1 items-center'>
                        <Label>Porcentaje:</Label>
                        <p className='font-semibold text-blue-600'>{ ((blockPoints * 100) / 1300).toPrecision(4) }%</p>
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
                <Accordion ref={ tableRef } type="single" collapsible className='max-h-[570px] overflow-y-auto'>
                    {
                        selectedQuestions?.map((q, index) => (
                            <AccordionItem 
                                key={ q.id } 
                                value={ `item-${ q.id }` } 
                                className="border-0 border-t"
                                ref={ el => itemsRef.current[index] = el }
                                onClick={ () => scrollToItem(index) }
                            >
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
                                                    <HoverCardTrigger className='cursor-help font-semibold'>
                                                        <span className='underline mr-1' dangerouslySetInnerHTML={{ __html: q.question }}></span>
                                                        &nbsp;
                                                        <span className='no-underline !text-gray-500 flex items-center gap-1 text-sm'>
                                                            <Eye size={ 18 } />
                                                            (Ver imágen)
                                                        </span>
                                                        </HoverCardTrigger>
                                                    <HoverCardContent>
                                                        <img src={ q.attachment } alt="image" />
                                                    </HoverCardContent>
                                                </HoverCard>
                                            ) : (
                                                <p dangerouslySetInnerHTML={{ __html: q.question }}></p>
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
                                                                <span dangerouslySetInnerHTML={{ __html: o.answer }}></span>
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
