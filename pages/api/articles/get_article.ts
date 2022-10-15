import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { Article } from ".prisma/client";

const prisma = new PrismaClient();

interface Response {
  error?: string;
  article?: Article;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  try {
    const article = await prisma.article.findFirst({
      where: {
        slug: req.body.slug,
      },
    });

    res.status(200).json({ article: article! });
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
}
