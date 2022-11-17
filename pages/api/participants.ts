import type { NextApiRequest, NextApiResponse } from "next";
import PublicGoogleSheetsParser from "public-google-sheets-parser";
import {
  Participant,
  ParticipantsListElement,
  ParticipantsTotal,
} from "@types";

interface Response {
  error?: string;
  total: ParticipantsTotal;
  list: ParticipantsListElement[];
}

const itemKeys: { [key: string]: string } = {
  ["Intézmény neve"]: "school",
  ["Munkabeszüntetéshez csatlakozó tanárok száma"]: "teachers",
  ["Iskola GPS koordinátái"]: "coordinates",
  ["Approved (1-es)"]: "isApproved",
};

const SheetsParser = new PublicGoogleSheetsParser(
  process.env.PARTICIPANTS_SPREADSHEET_ID ?? ""
);

export default async function handler(
  _: NextApiRequest,
  res: NextApiResponse<Response>
) {
  try {
    const items = await SheetsParser.parse();
    const parsedItems = parseItems(items);

    const sortedItems = parsedItems.sort((a, b) => {
      if (a.school < b.school) return -1;
      if (a.school > b.school) return 1;
      return 0;
    });

    const total = {
      schools: sortedItems.length,
      participants: sortedItems.reduce(
        (acc, item) => acc + parseInt(item.teachers),
        0
      ),
    };

    const list = sortedItems.map(({ school, coordinates }: Participant) => ({
      school,
      coordinates,
    }));

    res.status(200).json({ total, list });
  } catch (err) {
    res.status(500).json({
      error: err as string,
      total: { schools: 0, participants: 0 },
      list: [],
    });
  }
}

function parseItems(items: any) {
  const sheetItems = items.map((item: any) => {
    const parsedItem: { [key: string]: string } = {
      school: "",
      teachers: "",
      coordinates: "",
    };

    Object.keys(item).forEach((key: string) => {
      if (itemKeys[key]) {
        parsedItem[itemKeys[key]] = item[key];
      }
    });

    return parsedItem;
  });

  const approvedItems = sheetItems.filter((item: any) => item.isApproved === 1);

  const parsedItems: Participant[] = approvedItems.map((item: any) => ({
    ...item,
    isApproved: true,
  }));

  return parsedItems;
}
