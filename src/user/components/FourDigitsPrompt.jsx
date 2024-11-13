import { Button } from '@/components/ui';
import React, { useEffect, useState } from 'react';

export const FourDigitsPrompt = ({ response = [], setResponse }) => {
    const [used, setUsed] = useState([]);
  
    const digits = ['4', '4', '4', '4', '4', '4', '4'];
    const operators = ['+'];

    useEffect(() => {
        if (!response.length) return;

        if (used.length) setUsed([]);

        response.forEach(element => {
            if (element !== '+') {
                setUsed((prevUsed) => [...prevUsed, true]);
            }
        });
    }, [response])
    
    // Función para manejar el drop
    const handleDrop = (e) => {
        if (response.length === 13) return;
        if (e.dataTransfer.getData('text') === '+' && response.length === 0) return;
        if (e.dataTransfer.getData('text') === '+' && response[response.length - 1] === '+') return;
        if (used.length >= 7) return;
    
        const value = e.dataTransfer.getData('text');
        setResponse([...response, value]);
    };
  
    // Función para manejar el drag
    const handleDrag = (e, value) => {
        e.dataTransfer.setData('text', value);
    };

    const handleReset = () => {
        setUsed([]); // Resetear el estado 'used'
        setResponse([]); // Resetear la expresión ingresada
    };
    
    return (
        <div className="flex flex-col items-center text-center mt-12">
            <div className="flex flex-col gap-10">
                <div className="flex gap-4">
                    { digits.map((digit, index) => (
                        <span
                            key={index}
                            draggable
                            hidden={ used[index] }
                            onDragStart={(e) => handleDrag(e, digit)}
                            className="border bg-slate-300 p-5 cursor-grab"
                        >
                            { digit }
                        </span>
                    ))}
                </div>
                <div className="operators">
                    { operators.map((operator, index) => (
                        <span
                            key={index}
                            draggable
                            hidden={ used[6] }
                            onDragStart={(e) => handleDrag(e, operator)}
                            className="border bg-slate-200 p-5 cursor-grab"
                        >
                            { operator }
                        </span>
                    ))}
                </div>
            </div>
                
            <div
                className="border-2 border-dashed border-blue-600 py-5 px-8 my-10 w-[400px]"
                onDragOver={ (e) => e.preventDefault() }
                onDrop={ handleDrop }
            >
                <h2 className='text-gray-500 cursor-default'>Arrastra y suelta los valores aquí:</h2>
                <div className="p-4 text-2xl">
                    {response.join(' ')}
                </div>
            </div>
            
            <Button onClick={ handleReset }>Reestablecer</Button>
        </div>
    )
}
