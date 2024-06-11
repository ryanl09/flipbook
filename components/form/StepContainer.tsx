import React from 'react';

const StepContainer = ({ children, className='' }: {
    children: React.ReactNode;
    className?: string;
}): JSX.Element => {
    return (
        <div style={{
            width: 'clamp(300px, 80%, 1200px)'
        }} className={`bg-[#fff] shadow-sm rounded-lg p-4 relative --fade-in ${className}`}>
            {children}
        </div>
    )
}

export default StepContainer;