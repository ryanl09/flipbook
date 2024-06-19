'use client';

import React from 'react';
import { AiFillPrinter } from "react-icons/ai";
import { FaImage } from "react-icons/fa";
import { IoMdCamera } from "react-icons/io";
import { RiBook2Fill } from "react-icons/ri";
import { StepIcon } from '@/global/types';

const StepCounter = ({ step }: {
    step: number;
}) => {

    const icons: StepIcon[] = [
        {
            title: 'image',
            icon: <FaImage />
        }, {
            title: 'camera',
            icon: <IoMdCamera />
        }, {
            title: 'printer',
            icon: <AiFillPrinter />
        }, {
            title: 'book',
            icon: <RiBook2Fill />
        }
    ];

    return (
        <div className='flex items-center justify-between mx-auto' style={{
            width: 'clamp(100px, 50vw, 300px)'
        }}>
            {icons.map((e: StepIcon, index: number) => {
                return (
                    <React.Fragment key={`step-${e.title}`}>
                        <Step isCurrent={index + 1 === step} icon={e.icon} />
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