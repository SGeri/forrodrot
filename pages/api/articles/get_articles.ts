import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { Article } from ".prisma/client";

const prisma = new PrismaClient();

interface Response {
  error?: string;
  articles: Article[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  try {
    const articles = await prisma.article.findMany();
    res.status(200).json({ articles });
  } catch (err) {
    res.status(500).json({ error: String(err), articles: [] });
  }
}
