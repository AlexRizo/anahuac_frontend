import { Input } from "@/components/ui";

export const MagicTriangle = ({ response, setResponse }) => {
    // const [triangle, setTriangle] = useState({
    //     a1: '',
    //     a2: '',
    //     a3: '',
    //     b1: '',
    //     b2: '',
    //     b3: '',
    //     c1: '',
    //     c2: '',
    //     c3: '',
    // });

    const handleChange = (e, origin) => {
        if (e.target.value > 9) return;
        setResponse([{ ...response[0], [origin]: e.target.value }]);
        console.log(response);
    };

    return (
        <div className="mt-10">
            <div className="flex flex-col items-center gap-10">
                <div>
                    <Input 
                        onChange={ (e) => handleChange(e, 'b1') }
                        type='number'
                        className='size-14 transition text-center border-gray-500 button-number-decoration'
                        maxLength="1"
                        value={ response[0]?.b1 ?? '' }
                    />
                </div>
                <div className="flex gap-14">
                    <Input 
                        onChange={ (e) => handleChange(e, 'a3') }
                        type='number'
                        className='size-14 transition text-center border-gray-500 button-number-decoration'
                        maxLength="1"
                        value={ response[0]?.a3 ?? '' }
                    />
                    <Input 
                        onChange={ (e) => handleChange(e, 'b2') }
                        type='number'
                        className='size-14 transition text-center border-gray-500 button-number-decoration'
                        maxLength="1"
                        value={ response[0]?.b2 ?? '' }
                    />
                </div>
                <div className="flex gap-44">
                    <Input 
                        onChange={ (e) => handleChange(e, 'a2') }
                        type='number'
                        className='size-14 transition text-center border-gray-500 button-number-decoration'
                        maxLength="1"
                        value={ response[0]?.a2 ?? '' }
                    />
                    <Input 
                        onChange={ (e) => handleChange(e, 'b3') }
                        type='number'
                        className='size-14 transition text-center border-gray-500 button-number-decoration'
                        maxLength="1"
                        value={ response[0]?.b3 ?? '' }
                    />
                </div>
                <div className="flex gap-16">
                    <Input 
                        onChange={ (e) => handleChange(e, 'a1') }
                        type='number'
                        className='size-14 transition text-center border-gray-500 button-number-decoration'
                        maxLength="1"
                        value={ response[0]?.a1 ?? '' }
                    />
                    <Input 
                        onChange={ (e) => handleChange(e, 'c3') }
                        type='number'
                        className='size-14 transition text-center border-gray-500 button-number-decoration'
                        maxLength="1"
                        value={ response[0]?.c3 ?? '' }
                    />
                    <Input 
                        onChange={ (e) => handleChange(e, 'c2') }
                        type='number'
                        className='size-14 transition text-center border-gray-500 button-number-decoration'
                        maxLength="1"
                        value={ response[0]?.c2 ?? '' }
                    />
                    <Input 
                        onChange={ (e) => handleChange(e, 'c1') }
                        type='number'
                        className='size-14 transition text-center border-gray-500 button-number-decoration'
                        maxLength="1"
                        value={ response[0]?.c1 ?? '' }
                    />
                </div>
            </div>
        </div>
    );
}
