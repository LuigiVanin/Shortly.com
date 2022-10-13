import prisma from "../../db";

const userExists = async (email: string) => {
    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });
    return !!user;
};

export { userExists };
