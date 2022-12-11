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
            <main className="w-3/5 flex flex-col gap-5 md:w-[458px] bg-gray-100 p-8 py-16 shadow-2xl rounded-md">
                <h1 className="flex row justify-center text-6xl font-bold text-sky-400">
                    Shortly <FaLink />
                </h1>
                <form action="" className="flex flex-col gap-1 ">
                    <p className="text-black text-center text-lg font-semibold mt-5">
                        Sign In
                    </p>
                    {/* <input
                        type="text"
                        className="url-box"
                        value={email}
                        onChange={emailHandler}
                        placeholder="Insert Email..."
                    /> */}

                    <Input
                        clearable
                        underlined
                        size="xl"
                        placeholder="Email..."
                    />
                    <Input.Password
                        clearable
                        underlined
                        size="xl"
                        placeholder="Password..."
                    />

                    <button
                        className="my-btn gap-1 px-3 mt-5 bg-sky-300 hover:bg-sky-400 hover:text-white"
                        onClick={logIn}
                    >
                        Login with email
                        <CgLogIn size={30} />
                    </button>
                </form>

                <Divisor>or</Divisor>

                <button
                    className="my-btn gap-1 px-3 text-white bg-gray-900 hover:bg-gray-800 hover:shadow-lg shadow-black"
                    onClick={logIn}
                >
                    Login with Github
                    <FaGithub size={30} color={"white"} />
                </button>
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
