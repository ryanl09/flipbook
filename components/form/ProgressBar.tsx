'use client';

const ProgressBar = ({ progress, max }: {
    progress: number;
    max: number;
}): JSX.Element => {
    const loaded = progress / max;
    const width = `${Math.round(loaded * 100)}%`;
    return (
        <div className="h-[30px] w-full py-1">
            <div className="relative bg-[#dcdcdc] rounded-lg w-full h-[2px]">
                <div className="h-[2px] bg-primary rounded-lg absolute transition-all" style={{
                    width: width,
                    transition: '.1s width ease'
                }}></div>
            </div>
            <div className="justify-end text-sm font-semibold">
                <span>{progress}</span>
                <span>/</span>
                <span>{max}</span>
            </div>
        </div>
    )
}

export default ProgressBar;