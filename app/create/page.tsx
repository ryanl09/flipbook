'use client';

import GetPhotos from '@/components/create/GetPhotos';
import StepCounter from '@/components/create/StepCounter';
import React, { useEffect, useState } from 'react';
import Logo from '@/components/Logo';
import ChooseBackground from '@/components/create/ChooseBackground';
import PrintBook from '@/components/create/PrintBook';
import { CaptureCountProvider } from '@/components/context/CaptureCountProvider';

const PageCreate = (): JSX.Element => {
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const clearImages = (): void => setImages([]);

    const [step, setStep] = useState<number>(1);

    const onStepCompleted = (images: HTMLImageElement[]): void => {
        setImages(images);
    }

    const goBack = (): void => setStep((prev: number): number => { return prev - 1; });
    const proceed = (): void => setStep((prev: number): number => { return prev + 1; });

    return (
        <>
            <div className='grid md:hidden align-items p-4 grid-cols-12 gap-2'>
                <div className="col-span-12 sm:col-span-4">
                    <Logo />
                </div>
                <div className='col-span-12 sm:col-span-8'>
                    <StepCounter step={step} />
                </div>
            </div>
            <div className='hidden md:block md:absolute md:left-0 md:top-0 p-4'>
                <Logo />
            </div>
            <CaptureCountProvider>
                <div className='md:h-screen flex items-center justify-center'>
                    {step === 1 && (
                        <GetPhotos 
                            onCompleted={onStepCompleted}
                            images={images}
                            proceed={proceed}
                            onClear={clearImages} />
                    )}

                    {step === 2 && (
                        <ChooseBackground
                            onCompleted={onStepCompleted}
                            images={images}
                            goBack={goBack}
                            proceed={proceed} />
                    )}

                    {step === 3 && (
                        <PrintBook
                            images={images} />
                    )}

                    <div className='hidden absolute md:flex bottom-0 py-4 w-full items-center justify-center'>
                        <StepCounter step={step} />
                    </div>

                </div>
            </CaptureCountProvider>
        </>
    )
}

export default PageCreate;