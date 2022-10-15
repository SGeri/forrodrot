import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import slugify from "slugify";

const prisma = new PrismaClient();

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
    await prisma.article.update({
      data: {
        title: req.body.title,
        slug: slugify(req.body.title, { lower: true, locale: "hu" }),
        description: req.body.description,
        image: req.body.image,
        content: req.body.content,
      },
      where: {
        id: req.body.id,
      },
    });
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: String(err) });
  }
}
