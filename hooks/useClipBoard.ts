import { useState } from "react";

export const useClipBoard = () => {
    const [isCopied, setIsCopied] = useState(false);
    const [text, setText] = useState("");

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setText(text);
        setIsCopied(true);
    };

    return {
        isCopied,
        text,
        copyToClipboard,
    };
};
