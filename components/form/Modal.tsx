'use client';

import React from 'react';
import { BiX } from 'react-icons/bi';

const Modal = ({ showing, hide, children }: {
    showing: boolean;
    hide: () => void;
    children: React.ReactNode;
}): JSX.Element => {
    
    return showing ? (
            <div className="w-screen h-screen overflow-hidden bg-[rgba(0,0,0,.55)]
                fixed top-0 left-0 right-0 bottom-0 z-50 flex items-center gap-2 justify-center" style={{
                    backdropFilter: 'blur(6px)'
                }}>
                <div className="bg-background rounded-xl shadow-md p-4 overflow-y-auto overflow-x-hidden" style={{
                    width: 'clamp(300px, 80%, 1200px)',
                    height:'80%',
                }}>
                    <div className="flex items-center">
                        <h2 className='text-lg font-medium'>Capture Photos</h2>
                        <button className="p-2 bg-red-200 hover:bg-red-100 transition-colors
                        text-white rounded-lg ml-auto" onClick={hide}><BiX /></button>
                    </div>
                    {children}
                </div>
            </div>
        
    ) : (
        <></>
    )
}

export default Modal;