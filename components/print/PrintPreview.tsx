import { FlipImage } from '@/global/types';
import React, { createRef, useEffect, useMemo, useRef } from 'react';

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

    const canvasContainer = useRef<HTMLDivElement|null>(null);

    const print = (): void => {
        console.log(canvasContainer.current?.children)

        const canvases = document.querySelectorAll('canvas');

        let windowContent = `<html><head><title>Print Barcode</title></head><body>`;

        canvases.forEach((e: HTMLCanvasElement, index: number) => {
            windowContent += `<div style='page-break-after: always;'><img src="${e.toDataURL('image/png')}" width="${pageSize.width * .8}" height="${pageSize.height * .8}"></div>`;
        });

        windowContent += '</body></html>';

        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.srcdoc = windowContent;
        iframe.onload = function() {
            if (iframe.contentWindow === null) {
                return;
            }
            iframe.contentWindow.print();
            setTimeout(() => document.body.removeChild(iframe), 100); // Delay for print dialog
          };
          document.body.appendChild(iframe);
      
          // Set iframe content using srcdoc attribute to avoid cross-origin issues
    }

    return (
        <>
            <div className='grid grid-cols-12' ref={canvasContainer}>
                {pages?.map((e: Page, index: number) => {
                    return (
                        <React.Fragment key={`${e.index}-page`}>
                            <PagePreview page={e} />
                        </React.Fragment>
                    )
                })}
            </div>
            <button onClick={print}>print</button>
        </>
    )
}

const PagePreview = ({ page }: { page: Page }) => {
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

        page.images.forEach((pageImage: PageImage, index: number) => {
            const row = index % rowCount;
            const col = Math.floor(index / rowCount);
            const x = col * (width + imagePadding * 2);
            const y = row * (height + imagePadding * 2);

            ctx.fillStyle = '#ffccbb';
            ctx.textBaseline = 'top';
            ctx.font = '150px Arial';

            if (pageImage.img.background) {
                ctx.drawImage(pageImage.img.background, x, y, width, height);
            }

            ctx.drawImage(pageImage.img.image, x, y, width, height);

            ctx.fillText(pageImage.rootIndex.toString(), x, y);

            //console.log(xPos, yPos);
        });
    }, [page]);

    return (
        <canvas width={pageSize.width} height={pageSize.height} id={`canvas-${page.index}`}
            ref={canvasRef} className='col-span-12 sm:col-span-6 md:col-span-4' style={{
                width: `${Math.floor(pageSize.width * displayRatio)}px`,
                height: `${Math.floor(pageSize.height * displayRatio)}px`
            }}></canvas>
    )
};

export default PrintPreview;