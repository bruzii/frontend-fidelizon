import * as z from 'zod';

// Define schema for form validation
export const certificationEnum = z.enum([
  'vegetarian',
  'vegan',
  'gluten_free',
  'lactose_free',
  'kosher',
  'halal',
  'bio',
]);

export const openingHoursSchema = z.object({
  start_time: z.string(),
  end_time: z.string(),
});

export const openingDaysSchema = z.object({
  day: z.number(),
  is_open: z.boolean(),
  opening_hours: z.array(openingHoursSchema),
});

export const socialMediaLinksSchema = z.object({
  facebook: z.string().optional().nullable(),
  instagram: z.string().optional().nullable(),
  tiktok: z.string().optional().nullable(),
  website: z.string().optional().nullable(),
});

export const deliveryLinksSchema = z.object({
  ifood: z.string().optional().nullable(),
  uber_eats: z.string().optional().nullable(),
  rappi: z.string().optional().nullable(),
});

export const establishmentProfilePicturesSchema = z.object({
  position: z.number(),
  file: z.any().optional(),
});
export type EstablishmentProfilePicturesSchema = z.infer<typeof establishmentProfilePicturesSchema>;

export const establishmentProfileSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  primary_color: z.string().min(1),
  price_range: z.string().optional(),
  phone_country_code: z.string().optional(),
  phone_number: z.string().optional(),
  certifications: z.array(certificationEnum).optional(),
  opening_days: z.array(openingDaysSchema).optional(),
  social_media_links: socialMediaLinksSchema.optional().nullable(),
  delivery_links: deliveryLinksSchema.optional().nullable(),
  pictures: z.array(establishmentProfilePicturesSchema).optional().nullable(),
});

export type EstablishmentProfileFormValues = z.infer<typeof establishmentProfileSchema>;
