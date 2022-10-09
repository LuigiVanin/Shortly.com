// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../db";

type Data = {
    name: string;
    data: any[];
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method === "GET") {
        const data = await prisma.link.findMany({});
        console.log(process.env.GITHUB_ID);
        res.status(200).json({ name: "John Doe", data });
    }
}
