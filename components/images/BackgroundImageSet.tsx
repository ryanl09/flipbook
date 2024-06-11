import React, { useState, useEffect } from 'react';
import { loadImage } from '@/lib/util';

const BackgroundImageSet = ({ onSelected }: {
    onSelected: (img: HTMLImageElement) => void|Promise<void>;
}): JSX.Element => {
    const [bgImages, setBgImages] = useState<HTMLImageElement[]>([]);
    const [selectedIndex, setSelectedIndex] = useState<number>(-1);

    useEffect(() => {
        const getImage = async(): Promise<void> => {
            const img = await loadImage('/forest.png');

            setBgImages([img]);
        }

        getImage();
    }, []);

    const onImageSelected = (index: number): void  => {
        onSelected(bgImages[index]);
        setSelectedIndex(index);
    }
    

    return (
        <div className='grid grid-cols-12 gap-2'>
            {bgImages?.map((e: HTMLImageElement, index: number) => {
                return (
                    <div className='col-span-6 md:col-span-4 lg:col-span-3' key={e.src}>
                        <SelectableImage img={e} onClick={() => {
                            onImageSelected(index)
                        }} isSelected={index === selectedIndex} />
                    </div>
                )
            })}
        </div>
    )
}

const SelectableImage = ({ img, onClick, isSelected }: {
    img: HTMLImageElement;
    onClick: () => void|Promise<void>;
    isSelected: boolean;
}): JSX.Element => {

    let borderStyle = isSelected ? 'border-2 border-gray-100 p-1 rounded-lg transition-all' : ''
    
    return (
        <div className={borderStyle}>
            <img src={img.src} width={img.width} height={img.height} alt=''
                className={`rounded-lg cursor-pointer hover:scale-105 transition-all hover:shadow-sm`} onClick={onClick} />
        </div>
    )
}

export default BackgroundImageSet;