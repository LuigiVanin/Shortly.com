import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../db";
import { LinkService } from "../../../services/api/link.service";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const service = new LinkService(prisma);
    if (req.method === "POST") {
        const result = await service.createLink(req.body.link);
        res.status(201).json({ result });
    } else if (req.method === "GET") {
        try {
            const session = await unstable_getServerSession(
                req,
                res,
                authOptions
            );
            if (!session?.user) {
                return res.status(403).send({ message: "não autorizado" });
            }
            const page = (req.query?.page as string) ?? "1";

            console.log(page);
            const data = await service.getFromUser(
                session?.user?.email as string,
                isNaN(Number(page)) ? 1 : Number(page)
            );
            return res.status(200).json(data);
        } catch (err) {
            return res.status(422).send({ message: "data não processável!" });
        }
    } else {
        return res.status(404).send({});
    }
}
