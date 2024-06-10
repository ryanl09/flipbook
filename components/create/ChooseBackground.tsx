import { convertBlobToImage, convertImageToBlob } from '@/lib/util';
import React, { useEffect, useMemo, useState } from 'react';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import ProgressBar from '../form/ProgressBar';
import PreviewBook from './Preview';
import { AiOutlineLoading3Quarters, AiFillCloseCircle } from 'react-icons/ai';
import RemoveBackground from '../background/RemoveBackground';
import BackgroundImageSet from '../images/BackgroundImageSet';

const ChooseBackground = ({ images, onCompleted, goBack, proceed }: {
    images: HTMLImageElement[];
    onCompleted: (images: HTMLImageElement[]) => void|Promise<void>;
    goBack: () => void;
    proceed: () => void;
}): JSX.Element => {

    const hasBackground = useMemo(() => {
        return false;
    }, []);

    const [removedBgs, setRemovedBgs] = useState<boolean>(false);
    const [backgroundImage, setBackgroundImage] = useState<HTMLImageElement|null>(null);
    
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
        onCompleted(images);
    }

    const onBackgroundSelected = (backgroundImage: HTMLImageElement): void => {

    }

    return (
        <div style={{
            width: 'clamp(300px, 80%, 1200px)'
        }} className='bg-[#fff] shadow-sm rounded-lg p-4 relative'>
            <h1 className='font-semibold text-2xl'>Background</h1>
            <div className='grid grid-cols-12 gap-2'>
                <div className='col-span-12'>
                    <RemoveBackground
                        images={images}
                        onCompleted={onBgRemovalCompleted} />
                </div>
                <div className="col-span-12 md:col-span-6">
                    {removedBgs && (
                        <>
                            <div className='col-span-12 md:col-span-6'>
                                <div className='flex items-center gap-2 text-gray-100'>
                                    <AiFillCloseCircle />
                                    Select background
                                </div>
                            </div>
                            <div className='col-span-12 md:col-span-6'>
                                <BackgroundImageSet
                                    onSelected={onBackgroundSelected} />
                            </div>
                        </>
                    )}
                </div>
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
        </div>
    )
}

export default ChooseBackground;