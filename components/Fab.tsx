import { Children } from "../@types/react";

interface Props {
    children: Children;
}

export const Fab: React.FC<Props> = ({ children }) => {
    return (
        <span
            // onClick={(event) => copy(event, link)}
            className="absolute right-1 p-2 bg-gray-300 rounded-md cursor-pointer hover:bg-green-400"
        >
            {children}
        </span>
    );
};
