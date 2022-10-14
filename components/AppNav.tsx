import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRef } from "react";
import { useSelector } from "../hooks/useSelector";

export const AppNav = () => {
    const selector = useRef(null);
    const { action } = useSelector(selector);

    const logOut = () => {
        signOut({
            redirect: true,
            callbackUrl: "/",
        });
    };

    return (
        <nav className="flex justify-center items-center gap-2 relative">
            <div
                className="ease-in-out duration-200 absolute z-10 h-9 rounded-md bg-gradient-to-r from-gray-400/50 to-indigo-500/10"
                ref={selector}
            ></div>

            <Link href="/profile/dashboard">
                <button
                    className="font-semibold px-2 z-20 hover:underline"
                    onMouseOver={action}
                >
                    DashBoard
                </button>
            </Link>
            <button
                className="font-semibold px-2 z-20 hover:underline"
                onMouseOver={action}
                onClick={logOut}
            >
                Log out
            </button>
        </nav>
    );
};
