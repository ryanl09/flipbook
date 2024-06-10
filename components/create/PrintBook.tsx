import React from 'react';
import StepContainer from '../form/StepContainer';

const PrintBook = ({ images }: {
    images: HTMLImageElement[];
}): JSX.Element => {
    return (
        <StepContainer>
            <h1 className='font-semibold text-2xl'>Print</h1>
        </StepContainer>
    )
}

export default PrintBook;