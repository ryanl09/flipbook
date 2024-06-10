import React from 'react';

const StepContainer = ({ children }: {
    children: React.ReactNode;
}): JSX.Element => {
    return (
        <div style={{
            width: 'clamp(300px, 80%, 1200px)'
        }} className='bg-[#fff] shadow-sm rounded-lg p-4 relative --fade-in'>
            {children}
        </div>
    )
}

export default StepContainer;