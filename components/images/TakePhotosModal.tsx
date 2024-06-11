import React, { useState } from 'react';
import Modal from '../form/Modal';
import { BiCamera } from 'react-icons/bi';
import Camera from './Camera';

const TakePhotosModal = ({ onCaptured }: {
    onCaptured: (images: HTMLImageElement[]) => void|Promise<void>;
}): JSX.Element => {
    const [showing, setShowing] = useState<boolean>(false);
    const show = (): void => setShowing(true);
    const hide = (): void => setShowing(false);

    const [isReady, setIsReady] = useState<boolean>(false);

    const acceptPhotos = (images: HTMLImageElement[]): void => {
        hide();
        onCaptured(images);
    }

    const onCameraReady = ():void => {
        setIsReady(true);
    }

    return (
        <>
            <Modal showing={showing} hide={hide}>
                {showing && (
                    <Camera
                        onCaptured={acceptPhotos}
                        onReady={onCameraReady} />
                )}
            </Modal>
            
            <button className='px-3 py-1 rounded-lg bg-primary hover:bg-primary-h text-background
                font-semibold flex items-center gap-2 transition-colors' onClick={show}>
                    <BiCamera />
                Take photos
            </button>
        </>
    )
}

export default TakePhotosModal;