import { convertBlobToImage, convertImageToBlob } from "@/lib/util";
import { useCallback, useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import ProgressBar from "../form/ProgressBar";
import PreviewBook from "../create/Preview";
import { useCaptureCount } from "../context/CaptureCountProvider";
import { AiFillCheckCircle } from "react-icons/ai";

const RemoveBackground = ({ images, onCompleted }: {
    images: HTMLImageElement[];
    onCompleted: (images: HTMLImageElement[]) => void|Promise<void>;
}): JSX.Element => {
    const [isRemoving, setIsRemoving] = useState<boolean>(false);
    const [completed, setCompleted] = useState<number>(0);

    const { captureCount } = useCaptureCount();

    const processImages = async (): Promise<void> => {
        setCompleted(0);
        if (!images.length) {
            onCompleted([]);
            return;
        }

        setIsRemoving(true);

        const imgs: HTMLImageElement[] = [];

        const canvas = document.createElement('canvas');

        for (var img of images) {
            const stream = await convertImageToBlob(img, canvas);
            const formdata = new FormData();

            formdata.append('file', stream);

            const data = await fetch('http://localhost:7000/api/remove', {
                method: 'POST',
                body: formdata,
            });
            
            if (!data.ok) {
                //error
            }

            const imageBlob = await data.blob();
            const imageNoBg = await convertBlobToImage(imageBlob, canvas);

            imgs.push(imageNoBg);

            setCompleted((prev: number): number => {
                return prev + 1;
            });
        }

        onCompleted(imgs);
        setIsRemoving(false);
    };

    return isRemoving ? (
        <>
            <div className='flex items-center gap-2'>
                <AiOutlineLoading3Quarters className='--spin text-primary' />
                Removing image backgrounds...
            </div>
            <ProgressBar
                progress={completed}
                max={captureCount} />
        </>
    ) : (
        <>
            {completed === captureCount ? (
                <>
                    <div className="flex items-center gap-2 text-green-200 mt-2">
                        <AiFillCheckCircle />
                        Remove backgrounds
                    </div>
                </>
            ) : (

                <button className="text-background bg-primary hover:bg-primary-h transition-colors px-3 py-1 rounded-lg"
                    onClick={processImages}>
                    Remove Backgrounds
                </button>
            )}
        </>
    )
}

export default RemoveBackground;