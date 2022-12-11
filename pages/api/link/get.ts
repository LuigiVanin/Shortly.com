import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { LinkService } from "../../../services/api/link.service";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../db";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "GET") {
        const session = await unstable_getServerSession(req, res, authOptions);
        const service = new LinkService(prisma);
        const { shortId, title } = req.body.data;
        if (session && shortId && session.user?.email) {
            try {
                const relation = await service.createLinkBindendUser(
                    title,
                    shortId,
                    session.user.email
                );
                return res.status(201).send(relation);
            } catch (err) {
                return res
                    .status(422)
                    .send({ message: "erro ao persistir dados" });
            }
        }
        return res.status(401).send({});
    }
}
