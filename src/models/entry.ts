import { type ObjectId } from "mongodb";
import { z } from "zod";

export enum EntryStatus {
  ACTIVE = "active",
  ARCHIVED = "archived",
}

export enum EntryType {
  CUPON = "CUPON",
  OFFER = "OFFER",
}

const EntrySchema = z.object({
  _id: z.string(),
  _brand: z.string().min(1),
  title: z.string().min(1),
  description: z.string().optional(),
  icon_text: z.string(),
  cupon_code: z.string().optional(),
  target_link: z.string().optional(),
  start_validity: z.date(),
  end_validity: z.date().nullable(),
  created_at: z.date(),
  updated_at: z.date(),
  last_used_at: z.date().optional(),
  uses: z.number(),
  state: z.enum([EntryStatus.ACTIVE, EntryStatus.ARCHIVED] as const),
  verified: z.boolean().optional(),
  featured: z.boolean().optional(),
});

export type EntrySchemaType = z.infer<typeof EntrySchema>;

export type Entry = Omit<EntrySchemaType, "_id" | "_brand"> & {
  _id: ObjectId;
  _brand: ObjectId;
};

export interface CuponEntry {
  title: string;
  description?: string;
  cupon_code: string;
  icon_text: string;
  target_link: string;
  type: EntryType.CUPON;
  start_validity: string;
  end_validity: string | null;
  created_at: string;
  updated_at: string;
  last_used_at: string | null;
  brand: {
    name: string;
    image_url: string;
  };
}

export interface OfferEntry {
  title: string;
  description?: string;
  target_link: string;
  type: EntryType.OFFER;
  start_validity: string;
  end_validity: string | null;
  created_at: string;
  updated_at: string;
  last_used_at: string | null;
  brand: {
    name: string;
    image_url: string;
  };
}

export type ApiEntry = CuponEntry | OfferEntry;
