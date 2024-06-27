'use client';

import React, { useEffect, useRef, useState } from 'react';
import { BiChevronRight, BiCamera } from 'react-icons/bi';
import { useCaptureCount } from '../context/CaptureCountProvider';
import { useDimensions } from '../context/DimensionsProvider';

const VideoUpload = (): JSX.Element => {
    const  { captureCount } = useCaptureCount();
    const [duration, setDuration] = useState<number>(0);

    const uploadRef = useRef<HTMLInputElement|null>(null);

    const { width, height } = useDimensions();

    const onFileChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files }: { files: FileList|null } = e.target;
        if (files === null){
            return;
        }

        const video: HTMLVideoElement = document.createElement('video');

        const file: File = files[0];
        const videoUrl = URL.createObjectURL(file);

        video.src = videoUrl;

        const canvas: HTMLCanvasElement = document.createElement('canvas');
        canvas.width=width;
        canvas.height=height;

        const ctx = canvas.getContext('2d');

        video.addEventListener('seeked', () => {
            if (!ctx) {
                return;
            }

            ctx.drawImage(video, 0, 0, width, height);
            const canvasImg = canvas.toDataURL();
        });

        video.addEventListener('loadedmetadata', () => {
            video.pause();
            setDuration(video.duration);

            const time = video.duration / captureCount;
            for (let i = 0; i < captureCount; i++){
                video.currentTime = i * time;
            }
        });
    }

    const openFileDialog = (): void => {
        if (!uploadRef.current) {
            return;
        }

        uploadRef.current.click();
    }

    return (
        <>
            <div></div>
            <input type='file' accept='video/mp4' onChange={onFileChanged}
                className='hidden' ref={uploadRef} />
            <button className='px-3 py-1 rounded-lg bg-primary hover:bg-primary-h text-background
                font-semibold flex items-center gap-2 transition-colors' onClick={openFileDialog}>
                    <BiCamera />
                Video
            </button>
        </>
    )
}

export default VideoUpload;