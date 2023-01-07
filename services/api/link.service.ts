import { PrismaClient } from "@prisma/client";
import { nanoid } from "nanoid";
import prisma from "../../db";

class LinkService {
    constructor(private db: PrismaClient) {}

    getLink = async (link: string) => {
        return await this.db.link.findFirst({
            where: {
                link,
            },
        });
    };

    getFromShort = async (short: string) => {
        return await this.db.link.findUnique({
            where: {
                short,
            },
        });
    };

    getFromUser = async (email: string, page: number) => {
        return await this.db.relation.findMany({
            where: {
                user: {
                    email,
                },
            },
            select: {
                title: true,
                link: {
                    select: {
                        link: true,
                        short: true,
                    },
                },
            },
            take: page * 5,
        });
    };

    createLink = async (link: string) => {
        const links = await this.getLink(link);
        if (!!links) {
            return links;
        }
        const shortUrl = nanoid(6);
        return await this.db.link.create({
            data: {
                link,
                short: shortUrl,
            },
        });
    };

    createLinkBindendUser = async (
        title: string,
        linkId: string,
        useremail: string
    ) => {
        return await this.db.relation.create({
            data: {
                title,
                link: {
                    connect: {
                        id: linkId,
                    },
                },
                user: {
                    connect: {
                        email: useremail,
                    },
                },
            },
        });
    };
}

export { LinkService };
