import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
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
    await prisma.event.update({
      data: {
        title: req.body.title,
        image: req.body.image,
        date: new Date(req.body.date),
        locationName: req.body.locationName,
        locationX: parseFloat(req.body.locationX),
        locationY: parseFloat(req.body.locationY),
        link: req.body.link,
        hidden: req.body.hidden,
      },
      where: {
        id: req.body.id,
      },
    });
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err as string });
  }
}
