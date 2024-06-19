'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { BiPause, BiPlay } from 'react-icons/bi';
import { useDimensions } from '../context/DimensionsProvider';
import type { FlipImage } from '@/global/types';

const PLAYBACK_INTERVAL = 50; //ms

const PreviewBook = ({ images }: {
    images: FlipImage[];
}): JSX.Element => {
    const [ctx, setCtx] = useState<CanvasRenderingContext2D|null>(null);
    const intervalId = useRef<NodeJS.Timeout|null>(null);
    const [current, setCurrent] = useState<number>(0);
    const [playing, setPlaying] = useState<boolean>(false);

    const canvasRef = useCallback((canvas: HTMLCanvasElement) => {
        if (canvas !== null) {
            const ctx = canvas.getContext('2d');
            if (ctx === null) return;

            ctx.textBaseline = 'top';
            setCtx(ctx);
        }
    }, []);

    const { width, height } = useDimensions();

    useEffect(() => {
        if (ctx === null){
            return;
        }

        if (!playing){
            return;
        }

        ctx.fillStyle = '#ccc';
        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = '#fff';
        ctx.font = '40px Arial';

        const cur = images[current];

        if (cur.background){
            ctx.drawImage(cur.background, 0, 0);
        }
        ctx.drawImage(cur.image, 0, 0);
        ctx.fillText(current.toString(), 10, 10);

    }, [current, images, playing]);


    const handlePlay = (): void => {
        if (playing) {
            if (intervalId.current !== null) clearInterval(intervalId.current);
            intervalId.current = null;
            setPlaying(false);
            return;
        }

        intervalId.current = setInterval(() => {
            setCurrent(prev => (prev + 1) % images.length);
        }, PLAYBACK_INTERVAL);

        setPlaying(true);
    }

    useEffect(() => {
        if (!ctx || !images.length) {
            return;
        }

        const cur = images[0];

        if (cur.background) {
            ctx.drawImage(cur.background, 0, 0);
        }
        ctx.drawImage(cur.image, 0, 0);
        console.log('draw 1');
    }, []);

    return (
        <>
            <canvas ref={canvasRef} width={width} height={height}
                className='rounded-lg shadow-sm' style={{
                    width: `${width}px`,
                    height: `${height}px`
                }}></canvas>
            <button className='flex items-center gap-2 px-3 py-1 bg-primary hover:bg-primary-h
                transition-colors rounded-lg text-background semibold' onClick={handlePlay}>
                {playing ? (
                    <>
                        <BiPause />
                        Pause
                    </>
                ) : (
                    <>
                        <BiPlay />
                        Play
                    </>
                )}
            </button>
        </>
    )
}

export default PreviewBook;