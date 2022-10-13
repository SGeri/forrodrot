import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

const prisma = new PrismaClient();

interface Response {
  success: boolean;
  error?: string;
}

// TODO Validate input
// TODO Check user auth (https://next-auth.js.org/tutorials/securing-pages-and-api-routes)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session?.user)
    res.status(401).json({ success: false, error: "Unauthorized" });

  try {
    await prisma.event.create({
      data: {
        title: req.body.title,
        image: req.body.image,
        date: new Date(req.body.date),
        locationName: req.body.locationName,
        locationX: req.body.locationX,
        locationY: req.body.locationY,
        link: req.body.link,
      },
    });
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: String(err) });
  }
}
