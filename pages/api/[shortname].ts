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
        // check if links has "https://" or "http://"
        if (
            !result.link.startsWith("https://") &&
            !result.link.startsWith("http://")
        ) {
            return res.redirect(`https://${result.link}`);
        }
        res.redirect(result.link);
    }
}
