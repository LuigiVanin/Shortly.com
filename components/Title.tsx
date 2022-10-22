import React from "react";
import { FaLink } from "react-icons/fa";

type Size = "sm" | "lg" | "md";

interface TitleProps {
    size?: Size;
    color?: string;
}

interface TitleSize {
    [key: string | Size]: string;
}

export const Title: React.FC<TitleProps> = ({
    size = "sm",
    color = "black",
}) => {
    const titleSize: TitleSize = {
        sm: "sm",
        lg: "6xl",
    };

    console.log(titleSize[size]);

    return (
        <h1
            className={`flex items-center justify-center font-bold text-${titleSize[size]} text-${color}`}
        >
            Shortly <FaLink />
        </h1>
    );
};
