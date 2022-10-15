import React from "react";

type Props = {
    children: JSX.Element | JSX.Element[] | string | string[];
};

export const Divisor: React.FC<Props> = ({ children }) => {
    return (
        <>
            <section className="flex w-full items-center justify-center gap-1 px-5 font-bold text-slate-600">
                <div className="h-[2px] w-10 bg-slate-600 flex-1 " />
                {children}
                <div className="h-[2px] w-10 bg-slate-600 flex-1 " />
            </section>
        </>
    );
};
