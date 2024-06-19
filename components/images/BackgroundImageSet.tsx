'use client';

import React, { useState, useEffect } from 'react';
import { loadImage } from '@/lib/util';
import { AiFillPlusCircle } from 'react-icons/ai';
import AddBackground from '../form/AddBackground';
import { Background } from '@/global/types';
import { useApolloClient } from '@apollo/client';
import { useIsAdmin } from '../context/IsAdminContext';
import { getBackgrounds } from '@/graphql/queries';
import { deleteBackground } from '@/graphql/mutations';
import { useDimensions } from '../context/DimensionsProvider';

const BackgroundImageSet = ({ onSelected }: {
    onSelected: (img: string) => void|Promise<void>;
}): JSX.Element => {

    const [backgrounds, setBackgrounds] = useState<Background[]>([]);
    const [selectedIndex, setSelectedIndex] = useState<number>(-1);
    const apolloClient = useApolloClient();
    const isAdmin = useIsAdmin();
    const { width, height } = useDimensions();

    useEffect(() => {
        const getImages = async(): Promise<void> => {
            const { data } = await apolloClient.query({
                query: getBackgrounds,
            });

            if (!data?.backgrounds) {
                //
                return;
            }

            setBackgrounds(data.backgrounds);
        }

        getImages();
    }, []);

    const onImageSelected = async (index: number): Promise<void>  => {
        onSelected(backgrounds[index].url);
        setSelectedIndex(index);
    }

    const onBackgroundAdded = async (background: Background): Promise<void> => {
        setBackgrounds((prev: Background[]) => {
            return [...prev, background];
        });
    }

    const onBackgroundDeleted = (backgroundId: string) => {
    }

    
    const removeBackground = async (backgroundId: string): Promise<void> => {
        const { data } = await apolloClient.mutate({
            mutation: deleteBackground,
            variables: {
                backgroundId: backgroundId,
            }
        });

        if (!data?.deleteBackground) {
            //error
            return;
        }
        
        setBackgrounds((prev: Background[]): Background[] => {
            return prev.filter((background: Background) => {
                return background.background_id !== backgroundId;
            })
        })
    } 

    return (
        <div className='grid grid-cols-12 gap-2'>
            {isAdmin && (
                <div className='col-span-6 md:col-span-4 lg:col-span-3'>
                    <AddBackground
                        onBackgroundAdded={onBackgroundAdded} />
                </div>
            )}
            {backgrounds?.map((e: Background, index: number) => {
                return (
                    <div className='col-span-6 md:col-span-4 lg:col-span-3' key={e.background_id}>
                        <SelectableImage isSelected={index === selectedIndex}>      
                            <img src={`https://api.directecllc.com/${e.url}`} width={width} height={width} alt=''
                                className={`rounded-lg cursor-pointer hover:scale-105 transition-all hover:shadow-sm`}
                                onClick={() => {
                                    onImageSelected(index)
                                }} />
                        </SelectableImage>
                    </div>
                )
            })}
        </div>
    )
}

const SelectableImage = ({ isSelected, children }: {
    isSelected: boolean;
    children: React.ReactNode;
}): JSX.Element => {

    let borderStyle = isSelected ? 'border-2 border-gray-100 p-1 rounded-lg transition-all' : '';
    
    return (
        <div className={borderStyle}>
            {children}
        </div>
    )
}

export default BackgroundImageSet;