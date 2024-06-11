import { convertBlobToImage, convertImageToBlob } from '@/lib/util';
import React, { useEffect, useMemo, useState } from 'react';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import ProgressBar from '../form/ProgressBar';
import PreviewBook from './Preview';
import { AiOutlineLoading3Quarters, AiFillCloseCircle, AiFillCheckCircle } from 'react-icons/ai';
import RemoveBackground from '../background/RemoveBackground';
import BackgroundImageSet from '../images/BackgroundImageSet';
import StepContainer from '../form/StepContainer';
import CountdownOverlay from '../form/CountdownOverlay';

const ChooseBackground = ({ images, onCompleted, goBack, proceed, onBackgroundChanged }: {
    images: HTMLImageElement[];
    onCompleted: (images: HTMLImageElement[], bgImage?: HTMLImageElement|null) => void|Promise<void>;
    goBack: () => void;
    proceed: () => void;
    onBackgroundChanged: (background: HTMLImageElement) => void;
}): JSX.Element => {
    const [removedBgs, setRemovedBgs] = useState<boolean>(false);
    const [backgroundImage, setBackgroundImage] = useState<HTMLImageElement|null>(null);

    const hasBackground = useMemo(() => {
        return backgroundImage !== null;
    }, [backgroundImage]);

    
    const confirmBack = (): void => {
        /*
        if (isProcessingImages) {
            const conf = confirm('Your images are currently being processed and all progress will be lost if you leave this step. Are you sure you wish to continue?');
    
            if (!conf){
                return;
            }
        }*/

        goBack();
    }

    const onBgRemovalCompleted = (images: HTMLImageElement[]): void => {
        setRemovedBgs(true);
        onCompleted(images, backgroundImage);
    }

    const onBackgroundSelected = (backgroundImage: HTMLImageElement): void => {
        setBackgroundImage(backgroundImage);
        onBackgroundChanged(backgroundImage)
    }

    return (
        <StepContainer>
            <h1 className='font-semibold text-2xl'>Background</h1>
            <div className='grid grid-cols-12 gap-2'>
                <div className='col-span-12'>
                    <RemoveBackground
                        images={images}
                        onCompleted={onBgRemovalCompleted} />


                    
                        <div className='w-[200px] h-[120px] relative col-span-12'>
                            <CountdownOverlay
                                seconds={5}
                                onFinished={()=> { console.log('countdown finished')}} />
                        </div>
                </div>
                {removedBgs && (
                    <>
                        <div className='col-span-12'>
                            <div className={`flex items-center gap-2 ${hasBackground ? 'text-green-200' : 'text-gray-100'}`}>
                                {hasBackground ? (
                                    <AiFillCheckCircle />
                                ) : (
                                    <AiFillCloseCircle />
                                )}
                                <span>Select background</span>
                            </div>
                        </div>
                        <div className='col-span-12 md:col-span-6'>
                            <BackgroundImageSet
                                onSelected={onBackgroundSelected} />
                        </div>
                        {backgroundImage !== null && (
                            <div className='col-span-12 md:col-span-6'>
                                <PreviewBook
                                    images={images}
                                    backgroundImage={backgroundImage} />
                            </div>
                        )}
                        
                    </>
                )}
            </div>
            <div className='mx-5 my-3'>&nbsp;</div>
            <div className='absolute p-2 left-0 bottom-0 right-0 flex items-center '>
                <button className='px-3 py-1 flex items-center gap-2 text-background
                    bg-primary rounded-lg disabled:bg-[#bababc]' onClick={confirmBack}>
                    <BiChevronLeft />
                    Back
                </button>
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