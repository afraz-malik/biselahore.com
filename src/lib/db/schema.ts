import { sql } from "drizzle-orm";
import { integer, real, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

const timestamps = {
  createdAt: integer("created_at").notNull().default(sql`(unixepoch('subsec') * 1000)`),
  updatedAt: integer("updated_at")
    .notNull()
    .default(sql`(unixepoch('subsec') * 1000)`)
    .$onUpdate(() => Date.now()),
};

const publishable = {
  sortOrder: integer("sort_order").notNull().default(0),
  isPublished: integer("is_published", { mode: "boolean" }).notNull().default(true),
};

// ---------------------------------------------------------------------------
// A) Homepage & chrome
// ---------------------------------------------------------------------------

export const heroSlides = sqliteTable("hero_slides", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  eyebrow: text("eyebrow").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  backgroundImage: text("background_image").notNull(),
  imageAlt: text("image_alt").notNull(),
  primaryCtaLabel: text("primary_cta_label").notNull(),
  primaryCtaHref: text("primary_cta_href").notNull(),
  secondaryCtaLabel: text("secondary_cta_label"),
  secondaryCtaHref: text("secondary_cta_href"),
  ...publishable,
  ...timestamps,
});

export const socialSidebarItems = sqliteTable("social_sidebar_items", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  key: text("key").notNull(),
  label: text("label").notNull(),
  subtitle: text("subtitle"),
  href: text("href").notNull(),
  icon: text("icon", {
    enum: [
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
    ],
  }).notNull(),
  colorClass: text("color_class").notNull(),
  ...publishable,
  ...timestamps,
});

export const glanceStats = sqliteTable("glance_stats", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  icon: text("icon", {
    enum: [
      "graduation-cap",
      "school",
      "scroll-text",
      "map-pin",
      "award",
      "laptop",
      "book-open",
      "zap",
    ],
  }).notNull(),
  value: real("value"),
  decimals: integer("decimals"),
  prefix: text("prefix"),
  suffix: text("suffix"),
  title: text("title").notNull(),
  subtitle: text("subtitle"),
  ...publishable,
  ...timestamps,
});

export const announcements = sqliteTable("announcements", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  href: text("href").notNull(),
  isNew: integer("is_new", { mode: "boolean" }).notNull().default(false),
  ...publishable,
  ...timestamps,
});

export const onlineSystems = sqliteTable("online_systems", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  href: text("href").notNull(),
  description: text("description"),
  featured: integer("featured", { mode: "boolean" }).notNull().default(false),
  ...publishable,
  ...timestamps,
});

export const newsPreview = sqliteTable("news_preview", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  href: text("href").notNull(),
  urgent: integer("urgent", { mode: "boolean" }).notNull().default(false),
  ...publishable,
  ...timestamps,
});

export const relatedLinks = sqliteTable("related_links", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  group: text("group", { enum: ["boards", "organizations"] }).notNull(),
  label: text("label").notNull(),
  href: text("href").notNull(),
  ...publishable,
  ...timestamps,
});

// ---------------------------------------------------------------------------
// B) Core lists with links
// ---------------------------------------------------------------------------

export const notifications = sqliteTable("notifications", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  href: text("href").notNull(),
  urgent: integer("urgent", { mode: "boolean" }).notNull().default(false),
  showOnHome: integer("show_on_home", { mode: "boolean" }).notNull().default(false),
  ...publishable,
  ...timestamps,
});

export const downloads = sqliteTable("downloads", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  href: text("href").notNull(),
  ...publishable,
  ...timestamps,
});

export const modelPapers = sqliteTable("model_papers", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  level: text("level", { enum: ["ssc", "hssc"] }).notNull(),
  title: text("title").notNull(),
  href: text("href").notNull(),
  ...publishable,
  ...timestamps,
});

export const careers = sqliteTable("careers", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  href: text("href").notNull(),
  ...publishable,
  ...timestamps,
});

export const tenders = sqliteTable("tenders", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  href: text("href").notNull(),
  ...publishable,
  ...timestamps,
});

export const rtiItems = sqliteTable("rti_items", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  label: text("label").notNull(),
  description: text("description").notNull(),
  href: text("href"),
  notApplicable: integer("not_applicable", { mode: "boolean" }).notNull().default(false),
  ...publishable,
  ...timestamps,
});

// ---------------------------------------------------------------------------
// C) Pages / rich content
// ---------------------------------------------------------------------------

export const aboutSections = sqliteTable("about_sections", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  body: text("body", { mode: "json" }).notNull().$type<string[]>(),
  listItems: text("list_items", { mode: "json" }).$type<string[] | null>(),
  ordered: integer("ordered", { mode: "boolean" }).notNull().default(false),
  ...publishable,
  ...timestamps,
});

export const officials = sqliteTable(
  "officials",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    roleSlug: text("role_slug", { enum: ["chairman", "secretary", "controller"] }).notNull(),
    name: text("name").notNull(),
    title: text("title").notNull(),
    appointment: text("appointment").notNull(),
    imageSrc: text("image_src").notNull(),
    email: text("email").notNull(),
    phone: text("phone").notNull(),
    messageParagraphs: text("message_paragraphs", { mode: "json" }).notNull().$type<string[]>(),
    breadcrumbLabel: text("breadcrumb_label").notNull(),
    isPublished: integer("is_published", { mode: "boolean" }).notNull().default(true),
    ...timestamps,
  },
  (table) => [uniqueIndex("officials_role_slug_idx").on(table.roleSlug)]
);

export const contactOfficials = sqliteTable("contact_officials", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  role: text("role").notNull(),
  name: text("name").notNull(),
  photo: text("photo"),
  phone: text("phone").notNull(),
  fax: text("fax"),
  email: text("email").notNull(),
  ...publishable,
  ...timestamps,
});

export const generalInquiry = sqliteTable("general_inquiry", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  phone: text("phone").notNull(),
  portalLabel: text("portal_label").notNull(),
  portalHref: text("portal_href").notNull(),
  ...timestamps,
});

export const faqs = sqliteTable("faqs", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  ...publishable,
  ...timestamps,
});

export const resultStats = sqliteTable("result_stats", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  year: integer("year").notNull().unique(),

  ssc9thLabel: text("ssc_9th_label"),
  ssc9thHref: text("ssc_9th_href"),
  ssc10thLabel: text("ssc_10th_label"),
  ssc10thHref: text("ssc_10th_href"),
  sscSupplyLabel: text("ssc_supply_label"),
  sscSupplyHref: text("ssc_supply_href"),
  hssc11thLabel: text("hssc_11th_label"),
  hssc11thHref: text("hssc_11th_href"),
  hssc12thLabel: text("hssc_12th_label"),
  hssc12thHref: text("hssc_12th_href"),
  hsscSupplyLabel: text("hssc_supply_label"),
  hsscSupplyHref: text("hssc_supply_href"),

  ...publishable,
  ...timestamps,
});

export const galleryAlbums = sqliteTable("gallery_albums", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull().unique(),
  date: text("date").notNull(),
  title: text("title").notNull(),
  ...publishable,
  ...timestamps,
});

export const galleryImages = sqliteTable("gallery_images", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  albumId: integer("album_id")
    .notNull()
    .references(() => galleryAlbums.id, { onDelete: "cascade" }),
  full: text("full").notNull(),
  thumb: text("thumb").notNull(),
  alt: text("alt").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
  ...timestamps,
});

export const deputationists = sqliteTable("deputationists", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  group: text("group", { enum: ["chairmen", "secretaries", "ces"] }).notNull(),
  no: integer("no").notNull(),
  name: text("name").notNull(),
  fromDate: text("from_date").notNull(),
  toDate: text("to_date"),
  sortOrder: integer("sort_order").notNull().default(0),
  isPublished: integer("is_published", { mode: "boolean" }).notNull().default(true),
  ...timestamps,
});
