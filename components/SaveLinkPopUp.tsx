import React, { FormEvent } from "react";
import { PopUp } from "./PopUp";
import { IoMdClose } from "react-icons/io";
import { useSaveLink } from "../hooks/api/useSaveLink";
import { useInput } from "../hooks/useInput";
import { ThreeDots } from "react-loader-spinner";

interface ContentData {
    link: string;
    short: string;
    shortId: string;
}

interface Props {
    // children: JSX.Element | JSX.Element[] | string | string[];
    show: boolean;
    disable?: () => void;
    content: ContentData;
}

interface SaveLinkRequest {
    title: string;
    shortId: string;
}

export const SaveLinkPopUp: React.FC<Props> = ({ show, disable, content }) => {
    const { saveLink: action, isLoading } = useSaveLink();
    const { input: title, handler } = useInput("");

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data: SaveLinkRequest = {
            shortId: content.shortId,
            title,
        };
        action && action(data);
    };

    const ButtonContent = () => {
        return isLoading ? (
            <ThreeDots height="80" width="80" radius="9" color="#ffffff" />
        ) : (
            <>Salvar</>
        );
    };

    return (
        <PopUp show={show} disable={disable}>
            <div className="w-[400px] min-h-[450px] bg-slate-100 rounded-lg shadow-2xl p-3">
                <span
                    className="absolute right-3 top-3 flex w-10 h-10 bg-slate-200 justify-center 
                                items-center rounded-full cursor-pointer hover:text-white hover:bg-slate-700
                                ease-in-out duration-200"
                    onClick={disable}
                >
                    <IoMdClose size={30} />
                </span>
                <h1 className="text-center py-4 text-xl font-bold">
                    Confirm Information
                </h1>

                <form onSubmit={submit} className="w-full h-[200px] ">
                    <h2 className="">Title</h2>
                    <input
                        type="text"
                        placeholder="Insira um título..."
                        className="url-box text-md h-10 px-2 py-6 shadow-lg mb-4 mt-1 hover:bg-white"
                        onChange={handler}
                        required
                    />
                    <h2>Links</h2>
                    <textarea
                        className="url-box text-md px-2 shadow-lg mb-4 mt-1 resize-none min-h-[30px] max-h-[100px] py-1 hover:bg-white"
                        disabled
                        defaultValue={content.link}
                    />
                    <h2 className="">Short</h2>
                    <input
                        type="text"
                        placeholder=""
                        value={content.short}
                        disabled
                        className="url-box text-md h-10 px-2 py-6 shadow-lg mb-4 mt-1 hover:bg-white"
                    />
                    <button
                        className={`my-btn bg-emerald-300 hover:bg-emerald-400 hover:text-white hover:shadow-lg mt-7 ${
                            isLoading ? "bg-emerald-400" : ""
                        }`}
                        disabled={!title}
                    >
                        <ButtonContent />
                    </button>
                </form>
            </div>
        </PopUp>
    );
};
