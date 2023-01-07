import React from "react";

interface Props {
    children: JSX.Element | JSX.Element[] | string | string[];
    className?: string;
}

export const FabGroup: React.FC<Props> = ({
    children,
    className,
    ...props
}) => {
    return (
        <div
            className={`absolute w-auto h-auto flex flex-row items-center justify-center right-1 gap-2 ${className}`}
            {...props}
        >
            {children}
        </div>
    );
};
