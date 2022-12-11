import { Navbar } from "@nextui-org/react";
import { AppNav } from "./AppNav";
import { Title } from "./Title";

export const Header = () => {
    return (
        <header className="fixed top-0 left-0 right-0 h-12 w-full bg-gray-100 shadow-md flex justify-center">
            <div className="h-full   flex justify-between items-center px-5 w-full lg:w-[1024px]">
                <Navbar.Brand>
                    <Title size="md" />
                </Navbar.Brand>
                <AppNav />
            </div>
        </header>
    );
};
