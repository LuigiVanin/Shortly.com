import React from "react";
import { PopUp } from "./PopUp";

interface Props {
    children: JSX.Element | JSX.Element[] | string | string[];
    show: boolean;
    disable?: () => void;
}

export const SaveLinkPopUp: React.FC<Props> = () => {
    return <PopUp show={true}>Salvar</PopUp>;
};
