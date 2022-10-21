import type { NextApiRequest, NextApiResponse } from "next";
import { Event } from ".prisma/client";
import { prisma } from "@server";

interface Response {
  error?: string;
  events: Event[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  const showHidden = req.body?.showHidden;

  try {
    const events = await prisma.event.findMany({
      ...(!showHidden && {
        where: {
          hidden: false,
        },
      }),
    });
    res.status(200).json({ events });
  } catch (err) {
    res.status(500).json({ error: err as string, events: [] });
  }
}
