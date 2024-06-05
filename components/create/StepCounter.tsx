import React from 'react';
import { AiFillPrinter } from "react-icons/ai";
import { FaImage } from "react-icons/fa";
import { IoMdCamera } from "react-icons/io";
import { RiBook2Fill } from "react-icons/ri";

const StepCounter = ({ step }: {
    step: number;
}) => {

    const icons = [<IoMdCamera />, <FaImage />, <AiFillPrinter />, <RiBook2Fill />];

    return (
        <div className='flex items-center justify-between mx-auto' style={{
            width: 'clamp(100px, 50vw, 300px)'
        }}>
            {icons.map((icon, index) => {
                return (
                    <React.Fragment key={`step-${index}`}>
                        <Step isCurrent={index + 1 === step} icon={icon} />
                    </React.Fragment>
                )
            })}
        </div>
    )
}

const Step = ({ isCurrent, icon }: {
    isCurrent: boolean;
    icon: React.ReactNode;
}) => {
    let bgColor = isCurrent ? 'bg-[#999]' : 'bg-[#ddd]';
    let textColor = isCurrent ? 'text-[#999]' : 'text-[#ddd]';

    return (
        <div className={`flex flex-col gap-2 items-center ${textColor}`}>
            <div className={`w-[10px] h-[10px] rounded-full ${bgColor}`}></div>
            {icon}
        </div>
    )
}

export default StepCounter;