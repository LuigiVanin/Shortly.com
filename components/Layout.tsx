import React from "react";

interface Props {
    children: JSX.Element | JSX.Element[] | string | string[];
}

export const Layout: React.FC<Props> = ({ children }) => {
    return <div className="layout">{children}</div>;
};
