import connect from "../../db/connect.js";
import { replaceKeywords, Keywords } from "../../lib/replace-keywords.js";
import { ApiEntry, EntryType, EntryStatus } from "../../models/entry.js";

export const getEntries = async (
  geo: string,
  limit: number
): Promise<ApiEntry[]> => {
  const client = await connect(geo);
  await client.connect();

  const db = client.db("CuponHub");
  const collection = db.collection("entries");

  const rawEntries = await collection
    .aggregate([
      {
        $match: {
          state: EntryStatus.ACTIVE,
        },
      },
      {
        $lookup: {
          from: "brands",
          localField: "_brand",
          foreignField: "_id",
          as: "brand",
          pipeline: [
            {
              $project: {
                domain: 1,
                name: 1,
                image_url: 1,
              },
            },
          ],
        },
      },
      {
        $unwind: "$brand",
      },
      {
        $sort: {
          created_at: -1,
        },
      },
      {
        $limit: 100,
      },
      {
        $sort: {
          uses: -1,
        },
      },
    ])
    .toArray();

  const processedEntries: ApiEntry[] = rawEntries.map((entry) => {
    const processedTitle = replaceKeywords({
      text: entry.title,
      patterns: [Keywords.NAME],
      keywords: [entry.brand.name],
    });

    const processedDescription = entry.description
      ? replaceKeywords({
          text: entry.description,
          patterns: [Keywords.NAME],
          keywords: [entry.brand.name],
        })
      : undefined;

    const targetLink = entry.target_link || entry.brand.domain;
    const type = entry.icon_text ? EntryType.CUPON : EntryType.OFFER;

    const baseEntry = {
      title: processedTitle,
      description: processedDescription,
      icon_text: entry.icon_text,
      target_link: targetLink,
      type: type,
      start_validity: entry.start_validity,
      end_validity: entry.end_validity,
      created_at: entry.created_at,
      updated_at: entry.updated_at,
      last_used_at: entry.last_used_at,
      brand: {
        name: entry.brand.name,
        image_url: entry.brand.image_url,
      },
    };

    if (type === EntryType.CUPON) {
      return {
        ...baseEntry,
        cupon_code: entry.cupon_code,
        type: EntryType.CUPON,
      };
    } else {
      return {
        ...baseEntry,
        type: EntryType.OFFER,
      };
    }
  });

  const entries = processedEntries.slice(0, limit);

  return entries;
};
