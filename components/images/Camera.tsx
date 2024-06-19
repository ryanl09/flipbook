'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { BiChevronRight } from 'react-icons/bi';
import ProgressBar from '../form/ProgressBar';
import { useCaptureCount } from '../context/CaptureCountProvider';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import { useDimensions } from '../context/DimensionsProvider';
import CountdownOverlay from '../form/CountdownOverlay';

const Camera = ({ onCaptured, onReady }: {
    onCaptured: (images: HTMLImageElement[]) => void|Promise<void>;
    onReady: () => void|Promise<void>;
}): JSX.Element => {
    const [running, setRunning] = useState<boolean>(false);
    const canvas = useRef<HTMLCanvasElement|null>(null);
    const [ctx, setCtx] = useState<CanvasRenderingContext2D|null>(null);
    const video = useRef<HTMLVideoElement|null>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout|null>(null);

    const { captureCount, updateCaptureCount } = useCaptureCount();
    /*
    const [captureCount, setCaptureCount] = useState<number>(40);*/
    const updateCount = (e: React.ChangeEvent<HTMLInputElement>): void => updateCaptureCount(parseInt(e.target.value, 10));

    const [captureDelay, setCaptureDelay] = useState<number>(.1); //seconds
    const updateCaptureDelay = (e: React.ChangeEvent<HTMLInputElement>): void => setCaptureDelay(parseInt(e.target.value, 10));

    const [loadingVideo, setLoadingVideo] = useState<boolean>(true);
    const [stream, setStream] = useState<MediaStream|null>(null);

    const [ready, setReady] = useState<boolean>(false);
    const [showCountdown, setShowCountdown] = useState<boolean>(false);

    useEffect(() => {
        if (typeof navigator === 'undefined') {
            return;
        }

        const getMedia = async(): Promise<void> => {
            if (video.current === null){
                return;
            }

            const streamObj = await navigator.mediaDevices.getUserMedia({ video: true });
            setStream(streamObj);

            if(canvas.current === null) {
                return;
            }

            setCtx(canvas.current.getContext('2d'));
        }

        getMedia();
    }, []);

    useEffect(() => {
        if (stream === null || video.current === null){
            return;
        }

        video.current.srcObject = stream;
        onReady();
        setReady(true);

        return () => {
            stream.getTracks().forEach((track: MediaStreamTrack) => track.stop());
            setReady(false);
        }
    }, [stream]);

    useEffect(() => {
        if (images.length < captureCount){
            return;
        }

        setRunning(false);

        if (intervalId === null){
            return;
        }

        clearInterval(intervalId);
        setShowCountdown(false);
        setIntervalId(null);
    }, [images, captureCount, intervalId]);

    const takePhotos = (): void => {
        setImages([]);
        setRunning(true);

        const interval = setInterval((): void => {
            if (ctx === null || video.current === null || canvas.current === null) {
                clearInterval(interval);
                setReady(false);

                if (stream !== null) {
                    stream.getTracks().forEach((track: MediaStreamTrack) => track.stop());
                }
                return;
            }

            ctx.drawImage(video.current, 0, 0, video.current.width, video.current.height);
            const imgUrl = canvas.current.toDataURL();
            const img = new Image();
            img.src = imgUrl;

            img.onload = () => {
                setImages((prev: HTMLImageElement[]) => {
                    if (prev.length >= captureCount){
                        return prev;
                    }
                    return [...prev, img];
                });
            }

        }, captureDelay * 1000);

        setIntervalId(interval);
    }

    const { width, height } = useDimensions();

    return (
        <div className='grid grid-cols-12 gap-2'>
            <div className='col-span-12 sm:col-span-6'>
                <div className='relative' style={{
                    width: `${width}px`,
                    height: `${height}px`,
                }}>
                    <video ref={video} width={width} height={height} 
                        autoPlay={true} muted={true} playsInline={true}></video> 
                    {showCountdown && (
                        <CountdownOverlay
                            seconds={5}
                            onFinished={takePhotos} />
                    )}
                
                </div>
            </div>
            <div className='col-span-12 sm:col-span-6 p-2 border-2 border-[#e6e6e6] rounded-lg  mt-2'>
                {ready ? (
                    <>
                        <div>
                            <label className='font-medium text-sm'>Capture Count</label>
                            <div>
                                <input type='number' value={captureCount} min={10} max={100}
                                    onChange={updateCount} className='px-3 py-1 outline-none bg-background rounded-lg
                                    border border-[#e6e6e6]' />
                            </div>
                            <label className='font-medium text-sm'>Capture Delay (seconds)</label>
                            <div>
                                <input type='number' value={captureDelay} min={0.1} max={10}
                                    onChange={updateCaptureDelay} className='px-3 py-1 outline-none bg-background rounded-lg
                                    border border-[#e6e6e6]' />
                            </div>
                        </div>
                        <button className='rounded-lg transition-colors bg-primary hover:bg-primary-h
                            text-background font-semibold flex items-center gap-2 px-3 py-1 my-2'
                            onClick={() => {
                                setShowCountdown(true)
                            }}>
                            {running ? (
                                <>
                                    <AiOutlineLoading3Quarters className='--spin' />
                                    <span>Capturing</span>
                                </>
                            ) : (
                                <span>Take Photos</span>
                            )}
                        </button>
                    </>
                ) : (
                    <Skeleton count={5} />
                )}
                
                
                <ProgressBar
                    progress={images.length}
                    max={captureCount} />
                    
                {images.length === captureCount && (
                    <div className='col-span-12 flex items-center justify-end'>
                        <button className='px-3 py-1 bg-green-200 hover:bg-green-100 transition-colors flex items-center gap-2
                            font-semibold text-background rounded-lg' onClick={() => {
                                onCaptured(images)
                            }}>
                            Continue
                            <BiChevronRight />
                        </button>
                    </div>
                )}
            </div>

            <canvas width={width} height={height} ref={canvas} className='hidden'></canvas>

            
        </div>
    )
}

export default Camera;