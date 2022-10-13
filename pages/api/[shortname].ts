import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "GET") {
        const session = await unstable_getServerSession(req, res, authOptions);
        if (!session) {
            return res.status(403).json({ message: "not logged" });
        }
        console.log(session);
        res.redirect("https://youtube.com");
    }
}
