import React, { MouseEvent } from "react";

interface Props {
    children: JSX.Element | JSX.Element[] | string | string[];
    show: boolean;
    disable?: () => void;
}

export const PopUp: React.FC<Props> = ({ children, show, disable }) => {
    const propagation = (event: MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        disable && disable();
    };

    return (
        <>
            {show ? (
                <div
                    className="fixed inset-0 bg-black/10 flex items-center justify-center"
                    onClick={propagation}
                >
                    <div
                        className="relative shadow-2xl"
                        onClick={(event) => event.stopPropagation()}
                    >
                        {children}
                    </div>
                </div>
            ) : (
                ""
            )}
        </>
    );
};
