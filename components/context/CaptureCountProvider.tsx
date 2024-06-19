'use client';

import { createContext, useCallback, useContext, useMemo, useState } from "react";

export const CaptureCountContext = createContext<CountContext>({ captureCount: 40, updateCaptureCount: () => {} });
export const useCaptureCount = () => useContext(CaptureCountContext);

interface CountContext {
    captureCount: number;
    updateCaptureCount: (newCount: number) => void;
}

export const CaptureCountProvider = ({ children }: {
    children: React.ReactNode;
}) => {

    const [count, setCount] = useState<number>(40);
    const updateCount = useCallback((newCount: number): void => {
        setCount(newCount);
    }, []);

    const contextValue = useMemo(() => ({
        captureCount: count,
        updateCaptureCount: updateCount,
    }), [count, updateCount]);

    return (
        <CaptureCountContext.Provider value={contextValue}>
            {children}
        </CaptureCountContext.Provider>
    )
}