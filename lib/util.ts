export const convertImageToBlob = (image: HTMLImageElement, canv?: HTMLCanvasElement): Promise<Blob> => {
    return new Promise((resolve, reject) => {
        let canvas = canv ? canv : document.createElement('canvas');
        const ctx = canvas ? canvas.getContext('2d') : document.createElement('canvas').getContext('2d');

        if (ctx === null) {
            reject('Error');
            return;
        }

        canvas.width = image.width;
        canvas.height = image.height;
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

        canvas.toBlob((blob) => {
            if (blob) {
                resolve(blob);
            } else {
                reject(new Error('Blob conversion failed'));
            }
        }, 'image/jpeg'); // You can choose other formats like 'image/png'
    })
}

export const convertBlobToImage = (blob: Blob, canv?: HTMLCanvasElement): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = URL.createObjectURL(blob);
        img.onload = () => {
            resolve(img);
        }

        img.onerror = () => {
            reject('An error occured');
        }
    });
}

export const loadImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = '';
        img.src = src;
        img.onload = () => {
            resolve(img);
        }

        img.onerror = () => {
            reject(img);
        }
    });
}