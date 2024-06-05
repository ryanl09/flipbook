import React, { useCallback, useEffect, useRef, useState } from 'react';
import { BiPause, BiPlay } from 'react-icons/bi';

const CW = 300,
      CH = 300;

const PLAYBACK_INTERVAL = 50; //ms

const PreviewBook = ({ images }: {
    images: HTMLImageElement[];
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

    useEffect(() => {
        if (ctx === null){
            return;
        }

        ctx.fillStyle = '#ccc';
        ctx.fillRect(0, 0, CW, CH);

        ctx.fillStyle = '#fff';
        ctx.font = '40px Arial'
        ctx.drawImage(images[current], 0, 0);
        ctx.fillText(current.toString(), 10, 10);
    }, [current]);


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

    return (
        <>
            <canvas ref={canvasRef} width={300} height={300}
                className='rounded-lg shadow-sm w-[300px] h-[300px]'></canvas>
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