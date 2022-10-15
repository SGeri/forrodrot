import type { NextApiRequest, NextApiResponse } from "next";
import { Article } from ".prisma/client";
import { prisma } from "@server";

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

    res.status(200).json({ article: article as Article });
  } catch (err) {
    res.status(500).json({ error: err as string });
  }
}
