'use client';

import React, { useRef } from 'react';
import { AiFillPlusCircle } from 'react-icons/ai';
import { useApolloClient } from '@apollo/client';
import type { BackgroundApiResponse } from '@/global/types';
import { createBackground } from '@/graphql/mutations';
import type { Background } from '@/global/types';

const reqUrl = 'https://api.directecllc.com/zp/background/create/9dba1c4f-a312-41fd-8c61-e2b6a38c8356';

const AddBackground = ({ onBackgroundAdded }: {
    onBackgroundAdded: (background: Background) => void;
}): JSX.Element => {

    const fileRef = useRef<HTMLInputElement|null>(null);
    const apolloClient = useApolloClient();

    const openFileDialog = () => {
        if (fileRef.current === null) {
            return;
        }

        fileRef.current.click();
    }

    const onFileChanged = (e: React.ChangeEvent<HTMLInputElement>): void =>{
        const { files } = e.target;

        if (!files?.length) {
            return;
        }

        const req = new XMLHttpRequest();
        const formData = new FormData();
        formData.append('file', files[0]);

        req.open('POST', reqUrl, true);
        req.onreadystatechange = () => {
            if (req.readyState === 4 && req.status === 200) {
                const data: BackgroundApiResponse = JSON.parse(req.responseText);
                if (!data.status && data.url) {
                    addBackground(data.url)
                }
            }
        }
        
        req.send(formData);
    }

    const addBackground = async(url: string): Promise<void> => {
        const { data } = await apolloClient.mutate({
            mutation: createBackground,
            variables: {
                url: url
            },
        });

        if (!data?.createBackground){
            //error
            return;
        }

        onBackgroundAdded(data.createBackground);
    }

    return (
        <>
            <input type='file' className='hidden' ref={fileRef} accept='image/png, image/jpeg'
                onChange={onFileChanged} />
            
            <button className=' border-2 border-dashed border-[#bbb] rounded-lg text-[#bbb] flex items-center justify-center gap-2 w-full h-full
                hover:bg-[rgba(0,0,0,0.07)] transition-all hover:scale-105' onClick={openFileDialog}>
                <AiFillPlusCircle />
                <span className='font-semibold'>Add</span>
            </button>
        </>
    )
}

export default AddBackground;