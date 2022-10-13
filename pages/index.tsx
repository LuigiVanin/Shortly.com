import { NextPage } from "next";
import { useSession, signIn, signOut } from "next-auth/react";

const LogIn: NextPage = () => {
    const { data: session, status } = useSession();
    switch (status) {
        case "loading":
            console.log("carregando...");
            break;
        case "unauthenticated":
            console.log("usuário não está logado");
            break;
        case "authenticated":
            console.log("usuário está logado");
            if (session) {
                console.log(session?.user);
            }
            break;
    }

    return (
        <div>
            <h1>{!session ? "Não está logado" : "Está logado!"}</h1>

            <button
                className="btn-primary"
                onClick={() => {
                    signIn("github", {
                        callbackUrl: "/home",
                    });
                }}
            >
                Login Github
            </button>
            {session?.user ? (
                <button
                    className="btn-primary"
                    onClick={() => {
                        signOut();
                    }}
                >
                    Log out
                </button>
            ) : (
                <></>
            )}
        </div>
    );
};

export default LogIn;
