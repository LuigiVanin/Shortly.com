import React from "react";

interface Props {
    children: JSX.Element | JSX.Element[] | string | string[];
    show: boolean;
    disable?: () => void;
}

export const PopUp: React.FC<Props> = ({ children, show, disable }) => {
    return (
        <>
            {show ? (
                <div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center"
                    onClick={disable}
                >
                    <div>{children}</div>
                </div>
            ) : (
                ""
            )}
        </>
    );
};
