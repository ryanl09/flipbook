import React from 'react';
import StepContainer from '../form/StepContainer';
import PrintPreview from '../print/PrintPreview';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { FlipImage } from '@/global/types';

const PrintBook = ({ images, goBack, proceed }: {
    images: FlipImage[];
    goBack: () => void;
    proceed: () => void;
}): JSX.Element => {
    
    return (
        <StepContainer>
            <h1 className='font-semibold text-2xl'>Print</h1>
            <div className='preview max-h-96 overflow-y-auto'>
                <PrintPreview
                    images={images} />
            </div>
            <div className='mx-5 my-3'>&nbsp;</div>
            <div className='absolute p-2 left-0 bottom-0 right-0 flex items-center '>
                <button className='px-3 py-1 flex items-center gap-2 text-background
                    bg-primary rounded-lg disabled:bg-[#bababc]' onClick={goBack}>
                    <BiChevronLeft />
                    Back
                </button>
                <button className='px-3 py-1 flex items-center gap-2 text-background
                    bg-primary rounded-lg disabled:bg-[#bababc] ml-auto' onClick={proceed}>
                    Next
                    <BiChevronRight />
                </button>
            </div>
        </StepContainer>
    )
}

export default PrintBook;