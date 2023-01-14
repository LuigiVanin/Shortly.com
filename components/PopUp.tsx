import React, { MouseEvent } from "react";
import style from "../styles/animations.module.css";

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
                    className="popup fixed inset-0 bg-black/10 flex items-center justify-center"
                    onClick={propagation}
                    data-testid="backdrop"
                >
                    <div
                        data-testid="popup"
                        className={`relative shadow-2xl ${style.popup}`}
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
