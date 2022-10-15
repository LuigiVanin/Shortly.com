import { HttpStatusCode } from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
// import prisma from "../../../db";
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
        if (session) {
            return res.status(201).send({ message: "item created" });
        }
        const service = new LinkService(prisma);
        // const result = await createLink(req.body.link);
        // res.status(201).json({ result });
        return res.status(HttpStatusCode.Unauthorized).send({});
    }
}
