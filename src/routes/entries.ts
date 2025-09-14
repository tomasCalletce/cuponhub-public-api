import { Request, Response } from "express";
import { z } from "zod";
import { getEntries as fetchEntries } from "../queries/entries/get.js";

const querySchema = z.object({
  limit: z
    .string()
    .transform((val) => parseInt(val))
    .refine((val) => !isNaN(val) && val > 0, "Limit must be a positive number")
    .refine((val) => val <= 30, "Limit cannot exceed 30")
    .default(10),
  geo: z.enum(["mx", "co", "cl", "ar"], {
    error: "Geo must be one of: mx, co, cl, ar",
  }),
});

export const getEntries = async (req: Request, res: Response) => {
  try {
    const { limit, geo } = querySchema.parse(req.query);

    console.log("Validated parameters:");
    console.log("Limit:", limit);
    console.log("Geo:", geo);

    const entries = await fetchEntries(geo, limit);

    res.json({
      message: "Entries retrieved successfully",
      data: {
        count: entries.length,
        entries: entries,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: "Invalid parameters",
        details: error.issues.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        })),
      });
    }

    console.error("Error fetching entries:", error);
    res.status(500).json({
      error: "Failed to fetch entries",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
