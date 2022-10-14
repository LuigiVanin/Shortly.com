import React from "react";

interface TitleProps {
    size: "sm" | "lg" | "md";
}

export const Title = ({ size }: TitleProps) => {
    return (
        <h1 className="flex items-center justify-center font-bold">
            Shortly <span>🔗</span>
        </h1>
    );
};
