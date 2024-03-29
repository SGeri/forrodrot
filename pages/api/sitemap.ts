import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@server";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/xml");

  const articles = await prisma.article.findMany({
    orderBy: {
      publishedAt: "desc",
    },
    where: {
      hidden: false,
    },
  });

  const articleXMLs = articles.map((article) => {
    return `
    <url>
        <loc>https://forrodrot.com/articles/${article.slug}</loc>
        <lastmod>${article.publishedAt.toISOString()}</lastmod>
        <priority>0.70</priority>
    </url>
    `;
  });

  const xml = `
  <urlset
        xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
              http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  
  <url>
    <loc>https://forrodrot.com/</loc>
    <lastmod>2022-12-03T21:40:00+00:00</lastmod>
    <priority>1.00</priority>
  </url>

  <url>
    <loc>https://forrodrot.com/demands</loc>
    <lastmod>2022-12-03T21:16:00+00:00</lastmod>
    <priority>0.80</priority>
  </url>
  
  <url>
    <loc>https://forrodrot.com/articles</loc>
    <lastmod>2022-12-03T21:40:00+00:00</lastmod>
    <priority>0.80</priority>
  </url>

  <url>
    <loc>https://forrodrot.com/participants</loc>
    <lastmod>2022-12-03T21:40:00+00:00</lastmod>
    <priority>0.80</priority>
  </url>
  
  <url>
    <loc>https://forrodrot.com/events</loc>
    <lastmod>2022-12-03T21:40:00+00:00</lastmod>
    <priority>0.80</priority>
  </url>

  ${articleXMLs.join("")}
  
  </urlset>
`;

  res.end(xml);
}
