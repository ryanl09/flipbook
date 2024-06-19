'use client';

import { createContext, useCallback, useContext, useMemo, useState } from "react";

export const IsAdminContext = createContext<boolean>(true);
export const useIsAdmin = () => useContext(IsAdminContext);

export const IsAdminProvider = ({ children }: {
    children: React.ReactNode;
}) => {

    const [isAdmin, setIsAdmin] = useState<boolean>(true);
    const updateIsAdmin = useCallback((newVal: boolean): void => {
        setIsAdmin(newVal);
    }, []);

    const contextValue = useMemo(() => {
        return isAdmin;
    }, [isAdmin, updateIsAdmin]);

    return (
        <IsAdminContext.Provider value={contextValue}>
            {children}
        </IsAdminContext.Provider>
    )
}