import { useState, useCallback, ChangeEvent, Dispatch, SetStateAction } from "react";

type ReturnTypes<T = any> = [T, (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void, Dispatch<SetStateAction<T>>];

const UseInput = <T extends string | number>(initialValue: T): ReturnTypes<T> => {
    const [value, setValue] = useState(initialValue);
    const handler = useCallback((e) => {
        setValue(e.target.value)
    }, []);

    return [value, handler, setValue]
};


export default UseInput