import { useEffect, useState } from "react";

const AvailableBackgrounds = (): JSX.Element => {

    const [bakckgrounds, setBackgrounds] = useState<string[]>([]);

    useEffect(() => {
        const loadBackgrounds = async(): Promise<void> => {
            //...
        }

        loadBackgrounds();
    }, []);

    return (
        <></>
    )
}

export default AvailableBackgrounds;