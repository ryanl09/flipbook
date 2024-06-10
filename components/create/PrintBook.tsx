import React from 'react';
import StepContainer from '../form/StepContainer';
import PrintPreview from '../print/PrintPreview';

const PrintBook = ({ images }: {
    images: HTMLImageElement[];
}): JSX.Element => {
    return (
        <StepContainer>
            <h1 className='font-semibold text-2xl'>Print</h1>
            <PrintPreview images={images} />
        </StepContainer>
    )
}

export default PrintBook;