import { useEffect, useState } from "react";

const AvailableBackgrounds = (): JSX.Element => {

    const [backgrounds, setBackgrounds] = useState<string[]>([]);

    useEffect(() => {
        const loadBackgrounds = async(): Promise<void> => {

        }

        loadBackgrounds();
    }, []);

    return (
        <></>
    )
}

export default AvailableBackgrounds;