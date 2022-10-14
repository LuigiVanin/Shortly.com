import React from "react";

interface TitleProps {
    size: "sm" | "lg" | "md";
    color: string;
    className: string;
}

export const Title = ({ size, color }: TitleProps) => {
    return (
        <h1 className="flex items-center justify-center font-bold">
            Shortly <span>🔗</span>
        </h1>
    );
};
