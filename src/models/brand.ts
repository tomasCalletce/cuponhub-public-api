import { type ObjectId } from "mongodb";
import { z } from "zod";

export enum BrandStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  ARCHIVED = "archived",
}

const BrandSchema = z.object({
  _id: z.string(),
  _tags: z.array(z.string()),
  _page: z.string(),
  domain: z.string(),
  name: z.string(),
  image_url: z.string(),
  author_clerk_userId: z.string(),
  created_at: z.date(),
  updated_at: z.date(),
  comment: z.string().optional(),
  state: z.enum([
    BrandStatus.ACTIVE,
    BrandStatus.INACTIVE,
    BrandStatus.ARCHIVED,
  ]),
  affiliate: z
    .object({
      link: z.string(),
      is_active: z.boolean(),
    })
    .optional(),
});

export type BrandSchemaType = z.infer<typeof BrandSchema>;

export type Brand = Omit<BrandSchemaType, "_id" | "_tags" | "_page"> & {
  _id: ObjectId;
  _tags: ObjectId[];
  _page: ObjectId;
};
