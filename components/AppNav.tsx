import { Navbar } from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";
import React from "react";

export const AppNav = () => {
    const logOut = () => {
        signOut({
            redirect: true,
            callbackUrl: "/",
        });
    };

    const session = useSession();

    return (
        <Navbar.Content enableCursorHighlight variant={"underline"}>
            <Navbar.Link href="/profile/dashboard">
                <button className="px-2 z-20 hover:underline">Dashboard</button>
            </Navbar.Link>

            {session.status !== "unauthenticated" ? (
                <Navbar.Item>
                    <button
                        className="px-2 z-20 hover:underline"
                        onClick={logOut}
                    >
                        Log out
                    </button>
                </Navbar.Item>
            ) : (
                <Navbar.Link href="/">Sign In</Navbar.Link>
            )}
        </Navbar.Content>
    );
};
