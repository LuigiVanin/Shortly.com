import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../db";
import { LinkService } from "../../services/api/link.service";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "GET") {
        const { shortname } = req.query;
        const service = new LinkService(prisma);
        const result = await service.getFromShort(shortname as string);
        if (!result) {
            return res.status(404).json({ message: "Not found" });
        }
        res.redirect(result.link);
    }
}
