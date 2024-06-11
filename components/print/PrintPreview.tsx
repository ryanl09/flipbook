import { FlipImage } from '@/global/types';
import React, { useEffect, useMemo, useRef } from 'react';

const IMAGES_PER_PAGE = 8;
const pageSize = {
    width: 2550,
    height: 3300,
}

const imagePadding = 20;
const rowCount = 4;
const colCount = 2;

const rowRatio = rowCount / IMAGES_PER_PAGE;
const colRatio = colCount / IMAGES_PER_PAGE;

const width = pageSize.width / (IMAGES_PER_PAGE * colRatio) - imagePadding * 2;
const height = pageSize.height / (IMAGES_PER_PAGE * rowRatio) - imagePadding * 2;

const displayRatio = 0.1;

type PageImage = {
    img: FlipImage;
    rootIndex: number;
}

interface Page {
    index: number;
    images: PageImage[];
}

const PrintPreview = ({ images }: {
    images: FlipImage[];
}): JSX.Element => {

    const pages = useMemo((): Page[] => {
        if (!images?.length) {
            return [];
        }

        const numPages = Math.ceil(images.length / IMAGES_PER_PAGE);
        const pageObjects: Page[] = [];

        // when pages are vertically stacked, have images aligned 
        for (let i = 0; i < images.length; i++) {
            const pageIdx = i % numPages;
            if (!pageObjects[pageIdx]?.images) {
                pageObjects[pageIdx] = {
                    index: pageIdx,
                    images: [],
                }
            }

            pageObjects[pageIdx].images.push({
                img: images[i],
                rootIndex: i,
            });
        }

        return pageObjects;
    }, [images]);

    return (
        <div className='grid grid-cols-12'>
            {pages?.map((e: Page) => {
                return (
                    <div key={`${e.index}-page`} className='col-span-12 sm:col-span-6 md:col-span-4'>
                        <PagePreview
                            page={e} />
                    </div>
                )
            })}
        </div>
    )
}

const PagePreview = ({ page }: {
    page: Page;
}): JSX.Element => {

    const canvasRef = useRef<HTMLCanvasElement|null>(null);

    useEffect(() => {
        if (canvasRef.current === null) {
            return;
        }

        const ctx = canvasRef.current.getContext('2d');
        if (!ctx) {
            return;
        }

        /*
        1 5
        2 6
        3 7
        4 8
        */
        page.images.forEach((image: PageImage, index: number) => {
            const row = index % rowCount;
            const col = Math.floor(index / rowCount);
            const x = col * (width + imagePadding * 2);
            const y = row * (height + imagePadding * 2);

            ctx.fillStyle = '#ffccbb';
            ctx.textBaseline = 'top';
            ctx.font = '150px Arial';

            if (image.img.background) {
                ctx.drawImage(image.img.background, x, y, width, height);
            }

            ctx.drawImage(image.img.image, x, y, width, height);

            ctx.fillText(image.rootIndex.toString(), x, y);

            //console.log(xPos, yPos);
        });
    }, [page]);

    return (
        <div className='w-[255px] h-[330px] ' style={{
            width: `${Math.floor(pageSize.width * displayRatio)}px`,
            height: `${Math.floor(pageSize.height * displayRatio)}px`
        }}>
            <canvas width={pageSize.width} height={pageSize.height}
                className='w-full h-full' ref={canvasRef}></canvas>
        </div>
    )
}

export default PrintPreview;