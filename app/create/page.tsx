'use client';

import GetPhotos from '@/components/create/GetPhotos';
import StepCounter from '@/components/create/StepCounter';
import React, { useState, useEffect } from 'react';
import Logo from '@/components/Logo';
import ChooseBackground from '@/components/create/ChooseBackground';
import PrintBook from '@/components/create/PrintBook';
import { CaptureCountProvider } from '@/components/context/CaptureCountProvider';
import { DimensionsProvider } from '@/components/context/DimensionsProvider';
import { loadImage } from '@/lib/util';

const PageCreate = (): JSX.Element => {
    const [images, setImages] = useState<FlipImage[]>([]);

    const clearImages = (): void => setImages([]);
    const [removedBg, setRemovedBg] = useState<boolean>(false);

    const [backgroundUrl, setBackgroundUrl] = useState<string>('');
    const updateBackgroundUrl = (backgroundUrl: string): void => {
        setBackgroundUrl(backgroundUrl);
    }

    const [step, setStep] = useState<number>(1);

    const onStepCompleted = async (images: HTMLImageElement[]): Promise<void> => {
        setRemovedBg(false);
        setImages(images.map((e: HTMLImageElement): FlipImage[] => {
            return {
                image: e
            }
        }));
    }

    useEffect(() => {
        if (!backgroundUrl){
            return;
        }

        const updateBackgrounds = async (): Promise<void> => {
            const backgroundImage = await loadImage(`https://api.directecllc.com/${backgroundUrl}`);
            
            setImages((prev: FlipImage[]): FlipImage[] => {
                return prev.map((e: FlipImage): FlipImage[] => {
                    return {
                        image: e.image,
                        background: backgroundImage,
                    }
                })
            });
        }

        updateBackgrounds();
    }, [backgroundUrl, images]);

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
                <DimensionsProvider>
                    <div className='md:h-screen flex items-center justify-center'>
                        {step === 1 && (
                            <ChooseBackground
                                proceed={proceed}
                                onBackgroundChanged={updateBackgroundUrl} />
                        )}
                        
                        {step === 2 && (
                            <GetPhotos 
                                onCompleted={onStepCompleted}
                                images={images}
                                proceed={proceed}
                                goBack={goBack}
                                onClear={clearImages}
                                removedBg={removedBg}
                                onRemovedBg={() => {
                                    setRemovedBg(true);
                                }} />
                        )}

                        {step === 3 && (
                            <PrintBook
                                images={images}
                                goBack={goBack}
                                proceed={proceed} />
                        )}

                        <div className='hidden absolute md:flex bottom-0 py-4 w-full items-center justify-center'>
                            <StepCounter step={step} />
                        </div>

                    </div>
                </DimensionsProvider>
            </CaptureCountProvider>
        </>
    )
}

export default PageCreate;