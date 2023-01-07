import { GetServerSideProps, NextPage } from "next";
import { signIn } from "next-auth/react";
import { FaGithub } from "react-icons/fa";
import { CgLogIn } from "react-icons/cg";
import { Divisor } from "../components/Divisor";
import { useInput } from "../hooks/useInput";
import { useState } from "react";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { Layout } from "../components/Layout";
import { FaLink } from "react-icons/fa";
import { Input } from "@nextui-org/react";
import Link from "next/link";

const LogIn: NextPage = () => {
    const { input: email, handler: emailHandler } = useInput("");
    const { input: pass, handler: passHandler } = useInput("");
    const [loading, setLoading] = useState(false);

    const logIn = () => {
        setLoading(true);
        signIn("github", {
            callbackUrl: "/home",
        }).finally(() => {
            setLoading(false);
        });
    };

    return (
        <Layout>
            <main className="w-full max-w-[458px] flex flex-col items-center justify-center gap-5 sm:w-[458px] sm:rounded-md sm:h-[auto] h-[100vh] bg-gray-100 p-8 py-16 shadow-2xl rounded-none">
                <h1 className="flex row justify-center text-6xl font-bold text-sky-400">
                    Shortly <FaLink />
                </h1>
                <form action="" className="flex flex-col gap-1 ">
                    <p className="text-black text-center text-lg font-semibold mt-5">
                        Sign In
                    </p>
                </form>

                <button
                    className="my-btn gap-1 px-3 text-white bg-gray-900 hover:bg-gray-800 hover:shadow-lg shadow-black"
                    onClick={logIn}
                >
                    Login with Github
                    <FaGithub size={30} color={"white"} />
                </button>

                <Divisor> or </Divisor>

                <Link href="home">
                    <button className="my-btn w-full py-3 bg-slate-200 hover:bg-slate-300 text-sky-500 cursor-pointer font-bold text-xl hover:underline">
                        Create anonymously
                    </button>
                </Link>
            </main>
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    const session = await unstable_getServerSession(req, res, authOptions);
    const secure = !!session;
    if (session) {
        return {
            props: {
                secure,
            },
            redirect: "/home",
        };
    }
    return {
        props: {
            secure,
        },
    };
};

export default LogIn;
