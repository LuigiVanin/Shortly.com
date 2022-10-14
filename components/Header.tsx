import { AppNav } from "./AppNav";
import { Title } from "./Title";

export const Header = () => {
    return (
        <header className="fixed top-0 left-0 right-0 h-12 w-full bg-gray-200 shadow-md flex justify-center">
            <div className="h-full  bg-gray-200 flex justify-between items-center px-5 w-full lg:w-[1024px]">
                <Title size="md" />
                <AppNav />
            </div>
        </header>
    );
};
