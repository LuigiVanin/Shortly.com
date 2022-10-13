import { ChangeEvent, useState } from "react";

export const useInput = (
    placeholder: string,
    validator?: (input: string) => boolean
) => {
    const [input, setInput] = useState(placeholder);

    return {
        input,
        handler: (event: ChangeEvent<HTMLInputElement>) => {
            const target = event.target;
            setInput(target.value);
        },
        isValid: validator && validator(input),
    };
};
