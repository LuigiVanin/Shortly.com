import { Navbar } from "@nextui-org/react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRef } from "react";
import { useSelector } from "../hooks/useSelector";

export const AppNav = () => {
    const logOut = () => {
        signOut({
            redirect: true,
            callbackUrl: "/",
        });
    };

    return (
        <Navbar.Content enableCursorHighlight variant={"underline"}>
            <Navbar.Link href="/profile/dashboard">
                <button className="px-2 z-20 hover:underline">Dashboard</button>
            </Navbar.Link>
            <Navbar.Item>
                <button className="px-2 z-20 hover:underline" onClick={logOut}>
                    Log out
                </button>
            </Navbar.Item>
        </Navbar.Content>
    );
};
