import type { NextApiRequest, NextApiResponse } from "next";
import { Article } from ".prisma/client";
import { prisma } from "@server";

interface Response {
  error?: string;
  articles: Article[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  const showHidden = req.body?.showHidden;
  const short = req.body?.short;

  try {
    const articles = await prisma.article.findMany({
      orderBy: {
        publishedAt: "desc",
      },
      ...(!showHidden && {
        where: {
          hidden: false,
        },
      }),
    });

    if (short) {
      const articlesWithoutContent = articles.map((article) => ({
        ...article,
        content: "",
      }));

      return res.status(200).json({ articles: articlesWithoutContent });
    }

    res.status(200).json({ articles });
  } catch (err) {
    res.status(500).json({ error: err as string, articles: [] });
  }
}
