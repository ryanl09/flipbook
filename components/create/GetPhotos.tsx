import React, { useState, useMemo } from 'react';
import { BiChevronRight, BiCamera } from 'react-icons/bi';
import Camera from '../images/Camera';
import PhotoUpload from '../upload/PhotoUpload';
import VideoUpload from '../upload/VideoUpload';
import TakePhotosModal from '../images/TakePhotosModal';
import PreviewBook from '@/components/create/Preview';
import { AiFillMinusCircle } from 'react-icons/ai';
import StepContainer from '../form/StepContainer';

const GetPhotos = ({ onCompleted, onClear, images, proceed }: {
    onCompleted: (images: HTMLImageElement[]) => void|Promise<void>;
    onClear: () => void;
    images: HTMLImageElement[];
    proceed: () => void;
}): JSX.Element => {

    const hasImages = useMemo(() => {
        return images.length > 0;
    }, [images]);

    const processImages = (images: HTMLImageElement[]) => {
        onCompleted(images);
    }

    return (
        <StepContainer>
            <h1 className='font-semibold text-2xl'>Photos</h1>
            <div className='grid grid-cols-12 gap-2'>
                {!hasImages ? (
                    <>
                        <div className="col-span-12 sm:col-span-4 sm:border-r-2 border-[#ccc]">
                            <h2 className='text-lg'>Capture</h2>
                            <TakePhotosModal onCaptured={processImages} />
                        </div>
                        <div className="col-span-12 sm:col-span-8">
                            <h2 className='text-lg'>Upload</h2>
                            <div className='grid grid-cols-12 gap-2'>
                                <div className='col-span-12 sm:col-span-6'>
                                    <PhotoUpload />
                                </div>
                                <div className='col-span-12 sm:col-span-6'>
                                    <VideoUpload />
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                    
                        <div className="col-span-12 md:col-span-6">
                            <PreviewBook images={images} />
                        </div>
                        <div className="col-span-12 md:col-span-6">
                            <button className=' flex items-center gap-2 bg-red-200 hover:bg-red-100 transition-colors rounded-lg text-white
                                px-3 py-1' onClick={onClear}>
                                <AiFillMinusCircle />
                                Clear Images
                            </button>
                        </div>
                    </>
                )}
            </div>
            <div className='mx-5 my-3'>&nbsp;</div>
            <div className='absolute p-2 bottom-0 right-0'>
                <button className='px-3 py-1 flex items-center gap-2 text-background
                    bg-primary rounded-lg disabled:bg-[#bababc]' disabled={!hasImages} onClick={proceed}>
                    Next
                    <BiChevronRight />
                </button>
            </div>
        </StepContainer>
    )
}

export default GetPhotos;