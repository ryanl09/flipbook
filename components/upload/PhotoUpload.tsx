import React from 'react';
import { BiChevronRight, BiCamera } from 'react-icons/bi';

const PhotoUpload = (): JSX.Element => {
    return (
        <>
            <div></div>
            <button className='px-3 py-1 rounded-lg bg-primary hover:bg-primary-h text-background
                font-semibold flex items-center gap-2 transition-colors'>
                    <BiCamera />
                Photos
            </button>
        </>
    )
}

export default PhotoUpload;