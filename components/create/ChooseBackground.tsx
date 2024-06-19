'use client';

import React, { useMemo, useState } from 'react';
import { BiChevronRight } from 'react-icons/bi';
import BackgroundImageSet from '../images/BackgroundImageSet';
import StepContainer from '../form/StepContainer';

const ChooseBackground = ({ proceed, onBackgroundChanged }: {
    proceed: () => void;
    onBackgroundChanged: (background: string) => void;
}): JSX.Element => {
    const [backgroundImage, setBackgroundImage] = useState<string>('');

    const hasBackground = useMemo(() => {
        return !!backgroundImage;
    }, [backgroundImage]);

    const onBackgroundSelected = (backgroundImage: string): void => {
        setBackgroundImage(backgroundImage);
        onBackgroundChanged(backgroundImage)
    }

    return (
        <StepContainer>
            <h1 className='font-semibold text-2xl'>Select background</h1>
            <div className='grid grid-cols-12 gap-2 mt-2'>
                <div className='col-span-12 md:col-span-6'>
                    <BackgroundImageSet
                        onSelected={onBackgroundSelected} />
                </div>
            </div>
            <div className='mx-5 my-3'>&nbsp;</div>
            <div className='absolute p-2 left-0 bottom-0 right-0 flex items-center '>
                <button className='px-3 py-1 flex items-center gap-2 text-background
                    bg-primary rounded-lg disabled:bg-[#bababc] ml-auto' disabled={!hasBackground} onClick={proceed}>
                    Next
                    <BiChevronRight />
                </button>
            </div>
        </StepContainer>
    )
}

export default ChooseBackground;