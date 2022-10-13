import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { Event } from ".prisma/client";

const prisma = new PrismaClient();

interface Response {
  error?: string;
  events: Event[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  try {
    const events = await prisma.event.findMany();
    res.status(200).json({ events });
  } catch (err) {
    res.status(500).json({ error: String(err), events: [] });
  }
}
