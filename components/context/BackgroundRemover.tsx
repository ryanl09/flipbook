'use client';

import React, { useMemo, createContext, useCallback, useState, useContext } from 'react';

interface IBackgroundRemover {
    url: string;
    updateUrl: (newUrl: string) => void;
}

export const BackgroundRemoverContext = createContext<IBackgroundRemover>({
    url: 'http://localhost:7000',
    updateUrl: ()=>{},
});
export const useBackgroundRemover = () => useContext(BackgroundRemoverContext);

export const BackgroundRemoverProvider = ({ children }: {
    children: React.ReactNode;
}) => {

    const [url, setUrl] = useState<string>('http://localhost:7000')

    return (
        <>
            {children}
        </>
    )
}