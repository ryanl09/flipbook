import React, { useEffect, useMemo } from 'react';
import { BiChevronRight } from 'react-icons/bi';

const ChooseBackground = ({ images, onCompleted, goBack, proceed }: {
    images: HTMLImageElement[];
    onCompleted: (images: HTMLImageElement[]) => void|Promise<void>;
    goBack: () => void;
    proceed: () => void;
}): JSX.Element => {

    const hasBackground = useMemo(() => {
        return false;
    }, []);
    
    useEffect(() => {

    }, [images]);

    return (
        <div style={{
            width: 'clamp(300px, 80%, 1200px)'
        }} className='bg-[#fff] shadow-sm rounded-lg p-4 relative'>
            <h1 className='font-semibold text-2xl'>Background</h1>
            
            <div className='mx-5 my-3'>&nbsp;</div>
            <div className='absolute p-2 bottom-0 right-0'>
                <button className='px-3 py-1 flex items-center gap-2 text-background
                    bg-primary rounded-lg disabled:bg-[#bababc]' disabled={!hasBackground} onClick={proceed}>
                    Next
                    <BiChevronRight />
                </button>
            </div>
        </div>
    )
}

export default ChooseBackground;