import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import slugify from "slugify";
import { prisma } from "@server";
import { authOptions } from "../auth/[...nextauth]";

interface Response {
  success: boolean;
  error?: string;
}

// TODO Validate input

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session?.user)
    res.status(401).json({ success: false, error: "Unauthorized" });

  try {
    await prisma.article.create({
      data: {
        title: req.body.title,
        slug: slugify(req.body.title, { lower: true, locale: "hu" }),
        description: req.body.description,
        image: req.body.image,
        content: req.body.content,
        authorName: session?.user?.name || "Szerkesztő",
        hidden: req.body.hidden,
      },
    });
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err as string });
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "40mb",
    },
  },
};
