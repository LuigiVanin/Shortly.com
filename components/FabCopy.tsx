import React from "react";
import toast from "react-hot-toast";
import { FaCopy } from "react-icons/fa";
import { useClipBoard } from "../hooks/useClipBoard";
import { createApiUrl } from "../utils/url";

interface Props {
    text: string | null;
}

export const FabCopy: React.FC<Props> = ({ text }) => {
    const { copyToClipboard } = useClipBoard();

    const copy = (event: any, link: string) => {
        event.stopPropagation();

        copyToClipboard(createApiUrl(link));
        toast.success("Link Copiado!");
    };

    if (!text) return <></>;

    return (
        <span
            onClick={(event) => copy(event, text)}
            className="absolute right-1 p-2 bg-gray-300 rounded-md cursor-pointer hover:bg-green-400"
        >
            <FaCopy color="white" />
        </span>
    );
};
