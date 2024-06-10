import React, { useState, useEffect } from 'react';
import { loadImage } from '@/lib/util';

const BackgroundImageSet = ({ onSelected }: {
    onSelected: (img: HTMLImageElement) => void|Promise<void>;
}): JSX.Element => {
    const [bgImages, setBgImages] = useState<HTMLImageElement[]>([]);

    useEffect(() => {
        const getImage = async(): Promise<void> => {
            const img = await loadImage('/forest.png');

            setBgImages((prev: HTMLImageElement[]): HTMLImageElement[] => {
                return [...prev, img];
            });
        }

        getImage();
    }, []);

    

    return (
        <div className='grid grid-cols-12 gap-2'>
            {bgImages?.map((e: HTMLImageElement, index: number) => {
                return (
                    <div className='col-span-6 md:col-span-4 lg:col-span-3' key={e.src}>
                        <SelectableImage img={e} onClick={() => {
                            onSelected(bgImages[index])
                        }} />
                    </div>
                )
            })}
        </div>
    )
}

const SelectableImage = ({ img, onClick }: {
    img: HTMLImageElement;
    onClick: () => void|Promise<void>;
}): JSX.Element => {
    return (
        <img src={img.src} width={img.width} height={img.height} alt=''
            className='rounded-lg cursor-pointer hover:scale-105 transition-all hover:shadow-sm' onClick={onClick} />
    )
}

export default BackgroundImageSet;