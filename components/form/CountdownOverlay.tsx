import React, { useEffect, useState } from 'react';

const CountdownOverlay = ({ seconds, onFinished }: {
    seconds: number;
    onFinished: () => void|Promise<void>;
}): JSX.Element => {
    const [counter, setCounter] = useState<number>(seconds);
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout|null>(null);



    useEffect(() => {
        const intervalId = setInterval(() => {
            setCounter((prev: number): number => {
                if (prev - 1 <= 0) {
                    onFinished();
                    clearInterval(intervalId)
                }
                return prev - 1;
            });        
        }, 1000);

        return () => {
            clearInterval(intervalId);
        }
    }, [seconds]);

    return (
        <div className='absolute top-0 left-0 bottom-0 right-0 flex items-center justify-center bg-[rgba(0,0,0,0.2)] w-full z-10'>
            <div className='flex items-center justify-center gap-2 p-4 border-4 border-background rounded-full relative shadow-lg w-20 h-20 z-20
                overflow-hidden'>
                <span className='text-xl font-bold border-background text-background z-20 bg-[#cacaca] rounded-full w-[16px] h-[16px] px-[10px] py-[10px] flex items-center justify-center' style={{
                    lineHeight: '16px'
                }}>{counter}</span>
                <div className='absolute w-2 h-[2px] bg-background/60 z-20' style={{ left: '8%' }}></div>
                <div className='absolute w-2 h-[2px] bg-background/60 z-20' style={{ right: '8%' }}></div>
                <div className='absolute w-[2px] h-2 bg-background/60 z-20' style={{ top: '8%' }}></div>
                <div className='absolute w-[2px] h-2 bg-background/60 z-20' style={{ bottom: '8%' }}></div>

                <div className='bg-background/60 spin-3s'></div>
                <div className='bg-background/60 spin-1s'></div>
            </div>
        </div>
    )
}

export default CountdownOverlay;