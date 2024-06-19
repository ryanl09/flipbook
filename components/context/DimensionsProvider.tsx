'use client';

import { ImageDimensions } from "@/global/types";
import { createContext, useCallback, useContext, useMemo, useState } from "react";

export const DimensionsContext = createContext<ImageDimensions>({ width: 300, height: 225, });
export const useDimensions = () => useContext(DimensionsContext);

export const DimensionsProvider = ({ children }: {
    children: React.ReactNode;
}) => {

    const [dimensions, setDimensions] = useState<ImageDimensions>({
        width: 300,
        height: 225,
    });

    const updateDimensions = useCallback((newDimensions: ImageDimensions): void => {
        setDimensions(newDimensions);
    }, []);

    const contextValue = useMemo(() => ({
        width: dimensions.width,
        height: dimensions.height
    }), [dimensions]);

    return (
        <DimensionsContext.Provider value={contextValue}>
            {children}
        </DimensionsContext.Provider>
    )
}