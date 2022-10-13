import { nanoid } from "nanoid";
import prisma from "../../db";

const getLink = async (link: string) => {
    return await prisma.link.findFirst({
        where: {
            link,
        },
    });
};

const createLink = async (link: string) => {
    const links = await getLink(link);
    console.log(links);
    if (!!links) {
        return links;
    }
    const shortUrl = nanoid(6);
    return await prisma.link.create({
        data: {
            link,
            short: shortUrl,
        },
    });
};

const createLinkBindendUser = async (
    title: string,
    linkId: string,
    userId: string
) => {
    await prisma.relation.create({
        data: {
            title,
            linkId,
            userId,
        },
    });
};

export { createLink, createLinkBindendUser, getLink };
