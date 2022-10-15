import { GetServerSideProps, NextPage } from "next";
import { useSession, signIn, signOut } from "next-auth/react";
import { FaGithub } from "react-icons/fa";
import { CgLogIn } from "react-icons/cg";
import { Divisor } from "../components/Divisor";
import { Title } from "../components/Title";
import { useInput } from "../hooks/useInput";
import { useState } from "react";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { Layout } from "../components/Layout";

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
            <main className="w-4/5 flex flex-col gap-5 lg:w-[819px]">
                <Title size="lg" color="white" />
                <p className="text-white text-center text-lg font-semibold mt-5">
                    Sign In
                </p>
                <form action="" className="flex flex-col gap-1 ">
                    <input
                        type="text"
                        className="url-box"
                        value={email}
                        onChange={emailHandler}
                        placeholder="Insert Email..."
                    />
                    <input
                        type="password"
                        className="url-box"
                        value={pass}
                        onChange={passHandler}
                        placeholder="Insert Password..."
                    />
                    <button className="my-btn gap-1 px-3 mt-5" onClick={logIn}>
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
