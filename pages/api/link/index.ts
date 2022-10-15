import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../db";
import { LinkService } from "../../../services/api/link.service";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        const service = new LinkService(prisma);
        const result = await service.createLink(req.body.link);
        res.status(201).json({ result });
    }
}
