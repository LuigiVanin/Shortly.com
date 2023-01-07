import type { GetServerSideProps, NextApiRequest, NextPage } from "next";
import { unstable_getServerSession } from "next-auth";
import Head from "next/head";
import { useRouter } from "next/router";
import { Header } from "../components/Header";
import { useAsync } from "../hooks/useAsync";
import { useInput } from "../hooks/useInput";
import api from "../services/api";
import { authOptions } from "./api/auth/[...nextauth]";
import { FaLink, FaSave } from "react-icons/fa";
import { SaveLinkPopUp } from "../components/SaveLinkPopUp";
import { useState } from "react";
import { FabCopy } from "../components/FabCopy";

interface HomeProps {
    secure: boolean;
}

const Home: NextPage<HomeProps> = ({ secure }) => {
    const router = useRouter();
    let hostname = "";
    const [popUp, setPopUp] = useState(false);
    const { input, handler } = useInput("");
    const { action, data } = useAsync(async (link) => {
        return await api.post("link", {
            link,
        });
    }, false);

    if (typeof window !== "undefined") {
        hostname = window.location.origin;
    }

    const dashBoardRedirect = () => {
        if (!secure) {
            router.push("/");
            return;
        }
        router.push("/profile/dashboard/");
    };

    return (
        <>
            <Header />
            <div className="layout bg-gradient-to-tr from-indigo-500 to-sky-400">
                <main className="flex flex-col items-center w-full px-10 gap-2 md:w-[768px]">
                    <section className="flex justify-between items-center bg-slate-50 w-full h-20 px-5 rounded-md shadow-lg mb-12">
                        <h1 className="font-bold text-black text-2xl">
                            Create short links!
                        </h1>

                        <button
                            className="my-btn bg-sky-500 w-auto text-white hover:underline hover:bg-sky-500 shadow-md"
                            onClick={dashBoardRedirect}
                        >
                            DashBoard
                        </button>
                    </section>

                    <div className="flex flex-col gap-5 w-full px-5 bg-slate-50  py-8 rounded-md shadow-lg mb-12">
                        <input
                            type="text"
                            className="url-box shadow-lg focus:bg-sky-200"
                            value={input}
                            placeholder="Insert long url..."
                            onChange={handler}
                        />

                        <button
                            className="my-btn shadow-md hover:text-white hover:shadow-xl bg-sky-400 hover:bg-sky-400"
                            onClick={() => action(input)}
                        >
                            Create Short Url
                            <FaLink size={20} />
                        </button>

                        <div className="url-box shadow-lg focus:bg-sky-200 relative">
                            {data?.data?.result?.short
                                ? `${hostname}/api/${data.data.result.short}`
                                : "..."}
                            <FabCopy text={data?.data.result.short} />
                        </div>

                        {secure ? (
                            <button
                                className="my-btn shadow-md  hover:text-white bg-sky-400 hover:bg-sky-400"
                                onClick={async () => {
                                    setPopUp(true);
                                }}
                                disabled={!data?.data.result.id}
                            >
                                Save Short
                                <FaSave size={20} />
                            </button>
                        ) : (
                            <></>
                        )}
                    </div>

                    <SaveLinkPopUp
                        show={popUp}
                        disable={() => setPopUp(false)}
                        content={{
                            shortId: data?.data.result.id,
                            link: input,
                            short: `${hostname}/api/${data?.data.result.short}`,
                        }}
                    />
                </main>
            </div>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    const session = await unstable_getServerSession(req, res, authOptions);
    return {
        props: {
            secure: !!session,
        },
    };
};

export default Home;
