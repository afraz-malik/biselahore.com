import { z } from "zod";

import { isAllowedUrl } from "@/lib/cms/url-allowlist";

const href = z.string().trim().min(1, "Required").refine(isAllowedUrl, {
  message: "Must be a relative path, http(s), mailto:, or tel: link.",
});
const optionalHref = z
  .string()
  .trim()
  .optional()
  .transform((v) => (v ? v : undefined))
  .refine((v) => v === undefined || isAllowedUrl(v), {
    message: "Must be a relative path, http(s), mailto:, or tel: link.",
  });
const title = z.string().trim().min(1, "Required");

export const heroSlideSchema = z.object({
  eyebrow: title,
  title,
  description: z.string().trim().min(1, "Required"),
  backgroundImage: z.string().trim().min(1, "Required"),
  imageAlt: z.string().trim().min(1, "Required"),
  primaryCtaLabel: title,
  primaryCtaHref: href,
  secondaryCtaLabel: z.string().trim().optional(),
  secondaryCtaHref: optionalHref,
  sortOrder: z.coerce.number().int().default(0),
  isPublished: z.boolean().default(true),
});

export const socialSidebarItemSchema = z.object({
  key: z.string().trim().min(1, "Required"),
  label: title,
  subtitle: z.string().trim().optional(),
  href,
  icon: z.enum([
    "facebook",
    "instagram",
    "youtube",
    "linkedin",
    "twitter",
    "whatsapp",
    "mail",
    "bot",
    "phone",
    "newspaper",
  ]),
  colorClass: z.string().trim().min(1, "Required"),
  sortOrder: z.coerce.number().int().default(0),
  isPublished: z.boolean().default(true),
});

export const glanceStatSchema = z.object({
  icon: z.enum([
    "graduation-cap",
    "school",
    "scroll-text",
    "map-pin",
    "award",
    "laptop",
    "book-open",
    "zap",
  ]),
  value: z.coerce.number().optional(),
  decimals: z.coerce.number().int().optional(),
  prefix: z.string().trim().optional(),
  suffix: z.string().trim().optional(),
  title,
  subtitle: z.string().trim().optional(),
  sortOrder: z.coerce.number().int().default(0),
  isPublished: z.boolean().default(true),
});

export const announcementSchema = z.object({
  title,
  href,
  isNew: z.boolean().default(false),
  sortOrder: z.coerce.number().int().default(0),
  isPublished: z.boolean().default(true),
});

export const onlineSystemSchema = z.object({
  title,
  href,
  description: z.string().trim().optional(),
  featured: z.boolean().default(false),
  sortOrder: z.coerce.number().int().default(0),
  isPublished: z.boolean().default(true),
});

export const newsPreviewSchema = z.object({
  title,
  href,
  urgent: z.boolean().default(false),
  sortOrder: z.coerce.number().int().default(0),
  isPublished: z.boolean().default(true),
});

export const relatedLinkSchema = z.object({
  group: z.enum(["boards", "organizations"]),
  label: title,
  href,
  sortOrder: z.coerce.number().int().default(0),
  isPublished: z.boolean().default(true),
});

export const notificationSchema = z.object({
  title,
  href,
  urgent: z.boolean().default(false),
  showOnHome: z.boolean().default(false),
  sortOrder: z.coerce.number().int().default(0),
  isPublished: z.boolean().default(true),
});

export const downloadSchema = z.object({
  title,
  href,
  sortOrder: z.coerce.number().int().default(0),
  isPublished: z.boolean().default(true),
});

export const modelPaperSchema = z.object({
  level: z.enum(["ssc", "hssc"]),
  title,
  href,
  sortOrder: z.coerce.number().int().default(0),
  isPublished: z.boolean().default(true),
});

export const careerSchema = z.object({
  title,
  href,
  sortOrder: z.coerce.number().int().default(0),
  isPublished: z.boolean().default(true),
});

export const tenderSchema = z.object({
  title,
  href,
  sortOrder: z.coerce.number().int().default(0),
  isPublished: z.boolean().default(true),
});

export const rtiItemSchema = z.object({
  label: z.string().trim().min(1, "Required"),
  description: z.string().trim().min(1, "Required"),
  href: optionalHref,
  notApplicable: z.boolean().default(false),
  sortOrder: z.coerce.number().int().default(0),
  isPublished: z.boolean().default(true),
});

export const faqSchema = z.object({
  question: z.string().trim().min(1, "Required"),
  answer: z.string().trim().min(1, "Required"),
  sortOrder: z.coerce.number().int().default(0),
  isPublished: z.boolean().default(true),
});

export const contactOfficialSchema = z.object({
  role: z.string().trim().min(1, "Required"),
  name: z.string().trim().min(1, "Required"),
  photo: z.string().trim().optional(),
  phone: z.string().trim().min(1, "Required"),
  fax: z.string().trim().optional(),
  email: z.string().trim().email("Must be a valid email"),
  sortOrder: z.coerce.number().int().default(0),
  isPublished: z.boolean().default(true),
});

export const generalInquirySchema = z.object({
  phone: z.string().trim().min(1, "Required"),
  portalLabel: z.string().trim().min(1, "Required"),
  portalHref: href,
});

export const aboutSectionSchema = z.object({
  slug: z.string().trim().min(1, "Required"),
  title,
  body: z.array(z.string().trim().min(1)).default([]),
  listItems: z.array(z.string().trim().min(1)).optional(),
  ordered: z.boolean().default(false),
  sortOrder: z.coerce.number().int().default(0),
  isPublished: z.boolean().default(true),
});

export const officialSchema = z.object({
  roleSlug: z.enum(["chairman", "secretary", "controller"]),
  name: z.string().trim().min(1, "Required"),
  title,
  appointment: z.string().trim().min(1, "Required"),
  imageSrc: z.string().trim().min(1, "Required"),
  email: z.string().trim().email("Must be a valid email"),
  phone: z.string().trim().min(1, "Required"),
  messageParagraphs: z.array(z.string().trim().min(1)).default([]),
  breadcrumbLabel: z.string().trim().min(1, "Required"),
  isPublished: z.boolean().default(true),
});

const resultLinkPair = {
  label: z.string().trim().optional(),
  href: optionalHref,
};

export const resultStatSchema = z.object({
  year: z.coerce.number().int(),
  ssc9thLabel: resultLinkPair.label,
  ssc9thHref: resultLinkPair.href,
  ssc10thLabel: resultLinkPair.label,
  ssc10thHref: resultLinkPair.href,
  sscSupplyLabel: resultLinkPair.label,
  sscSupplyHref: resultLinkPair.href,
  hssc11thLabel: resultLinkPair.label,
  hssc11thHref: resultLinkPair.href,
  hssc12thLabel: resultLinkPair.label,
  hssc12thHref: resultLinkPair.href,
  hsscSupplyLabel: resultLinkPair.label,
  hsscSupplyHref: resultLinkPair.href,
  sortOrder: z.coerce.number().int().default(0),
  isPublished: z.boolean().default(true),
});

export const galleryAlbumSchema = z.object({
  slug: z.string().trim().min(1, "Required"),
  date: z.string().trim().min(1, "Required"),
  title,
  sortOrder: z.coerce.number().int().default(0),
  isPublished: z.boolean().default(true),
});

export const galleryImageSchema = z.object({
  albumId: z.coerce.number().int(),
  full: z.string().trim().min(1, "Required"),
  thumb: z.string().trim().min(1, "Required"),
  alt: z.string().trim().min(1, "Required"),
  sortOrder: z.coerce.number().int().default(0),
});

export const deputationistSchema = z.object({
  group: z.enum(["chairmen", "secretaries", "ces"]),
  no: z.coerce.number().int(),
  name: z.string().trim().min(1, "Required"),
  fromDate: z.string().trim().min(1, "Required"),
  toDate: z
    .string()
    .trim()
    .optional()
    .transform((v) => (v ? v : undefined)),
  sortOrder: z.coerce.number().int().default(0),
  isPublished: z.boolean().default(true),
});
