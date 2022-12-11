import React from "react";

interface Props {
    children: JSX.Element | JSX.Element[] | string | string[];
    className?: string;
}

export const Layout: React.FC<Props> = ({ children, className }) => {
    return (
        <div
            className={`layout bg-gradient-to-tr from-indigo-500 to-sky-400 ${className}`}
        >
            {children}
        </div>
    );
};
