import { HttpStatusCode } from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { LinkService } from "../../../services/api/link.service";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../db";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        const session = await unstable_getServerSession(req, res, authOptions);
        console.log(session);
        console.log(req.body);
        const service = new LinkService(prisma);
        const { shortId } = req.body;
        if (session && shortId && session.user?.email) {
            const relation = await service.createLinkBindendUser(
                "teste",
                shortId,
                session.user.email
            );
            console.log(relation);
            return res.status(201).send(relation);
        }
        return res.status(HttpStatusCode.Unauthorized).send({});
    }
}
