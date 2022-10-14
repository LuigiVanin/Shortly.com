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
        <div className="layout">
            <main className="w-4/5 flex flex-col gap-5">
                <Title size="lg" color="white" className={""} />
                <form action="" className="flex flex-col gap-1">
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
                    <button className="my-btn gap-1 px-3" onClick={logIn}>
                        Login with email
                        <CgLogIn size={30} />
                    </button>
                </form>

                <Divisor>or</Divisor>

                <button className="my-btn gap-1 px-3" onClick={logIn}>
                    Login with Github
                    <FaGithub size={30} />
                </button>
            </main>
        </div>
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
