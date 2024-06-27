'use client';

import { FlipImage } from '@/global/types';
import { loadImage } from '@/lib/util';
import React, { useRef } from 'react';
import { BiChevronRight, BiCamera } from 'react-icons/bi';

const PhotoUpload = ({ onUploaded }: {
    onUploaded: (images: HTMLImageElement[]) => void;
}): JSX.Element => {
    const uploadRef = useRef<HTMLInputElement|null>(null);

    const openFileDialog = (): void => {
        if (uploadRef.current === null) {
            return;
        }

        uploadRef.current.click();
    }

    const onFilesChanged = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
        const { files } = e.target;
    
        if (!files || !files.length) {
            return;
        }
    
        const loadImage = (file: File): Promise<HTMLImageElement> => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
    
                reader.onload = (e: ProgressEvent<FileReader>): void => {
                    if (!e.target) {
                        reject(new Error('Failed to read file'));
                        return;
                    }
    
                    const { result } = e.target;
    
                    const img = new Image();
                    img.onload = () => resolve(img);
                    img.onerror = reject;
                    img.src = result as string;
                };
    
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        };
    
        // Create an array of promises with their respective indexes
        const promises = Array.from(files).map((file, index) => {
            return loadImage(file).then(img => ({ img, index }));
        });
    
        try {
            const results = await Promise.all(promises);
            
            // Create an array of images in the correct order
            const images = new Array(files.length);
            results.forEach(({ img, index }) => {
                images[index] = img;
            });
    
            console.log(images);
            onUploaded(images);
        } catch (error) {
            console.error('Error loading images:', error);
        }
    };

    return (
        <>
            <div></div>
            <input type="file" className='hidden'
                ref={uploadRef} onChange={onFilesChanged} multiple={true} />
            <button className='px-3 py-1 rounded-lg bg-primary hover:bg-primary-h text-background
                font-semibold flex items-center gap-2 transition-colors' onClick={openFileDialog}>
                    <BiCamera />
                Photos
            </button>
        </>
    )
}

export default PhotoUpload;