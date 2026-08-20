/**
 * Idempotent seed: populates the CMS database from the site's existing
 * static TS data files so production content survives the DB cutover.
 * Safe to re-run — each table is only seeded if currently empty.
 */
import type { SQLiteTable } from "drizzle-orm/sqlite-core";

import { db } from "@/lib/db/client";
import * as schema from "@/lib/db/schema";

import { heroSlides as heroSlidesSource } from "@/components/hero/hero-data";
import { socialSidebarItems as socialSidebarSource } from "@/lib/social-sidebar-data";
import {
  glanceStats as glanceStatsSource,
  announcements as announcementsSource,
  activeSystems as activeSystemsSource,
  newsPreview as newsPreviewSource,
  relatedBoards as relatedBoardsSource,
  relatedOrganizations as relatedOrganizationsSource,
} from "@/lib/home-data";
import { allNotifications as notificationsSource } from "@/lib/notifications-data";
import { downloadForms as downloadsSource } from "@/lib/downloads-data";
import { sscModelPapers, hsscModelPapers } from "@/lib/model-papers-data";
import { tenderNotices as tendersSource } from "@/lib/tenders-data";
import { rtiItems as rtiSource } from "@/lib/rti-data";
import { aboutSections as aboutSectionsSource } from "@/lib/about-data";
import { contactOfficials as contactOfficialsSource, generalInquiry as generalInquirySource } from "@/lib/contact-data";
import { faqs as faqsSource } from "@/lib/faqs-data";
import { resultStats as resultStatsSource } from "@/lib/result-stats-data";
import { galleryAlbums as galleryAlbumsSource } from "@/lib/gallery-data";
import { chairmen as chairmenSource, secretaries as secretariesSource, controllers as controllersSource } from "@/lib/deputationists-data";

/**
 * Single source of truth for every link/image path seeded into the CMS:
 * relative paths get the media host prepended once, here, at seed time.
 * Already-absolute URLs (http/https/mailto/tel) pass through unchanged.
 * No equivalent runtime helper exists elsewhere — once seeded, the DB
 * holds the final URL and nothing rewrites it again.
 */
const MEDIA_BASE_URL = (process.env.MEDIA_BASE_URL ?? "https://data.biselahore.com/dt").replace(/\/$/, "");

function mediaUrl(path: string): string {
  if (/^(https?:|mailto:|tel:)/i.test(path)) return path;
  return `${MEDIA_BASE_URL}/${path.replace(/^\/+/, "")}`;
}

function mediaUrlOrNull(path: string | null | undefined): string | null {
  if (!path) return null;
  return mediaUrl(path);
}

function isEmpty(table: SQLiteTable): boolean {
  return db.select().from(table).limit(1).all().length === 0;
}

function seedIfEmpty<TTable extends SQLiteTable>(
  label: string,
  table: TTable,
  rows: TTable["$inferInsert"][]
) {
  if (!isEmpty(table)) {
    console.log(`skip  ${label} (already seeded)`);
    return;
  }
  if (rows.length === 0) {
    console.log(`skip  ${label} (no source rows)`);
    return;
  }
  db.insert(table).values(rows).run();
  console.log(`seed  ${label} (${rows.length} rows)`);
}

function main() {
  seedIfEmpty(
    "heroSlides",
    schema.heroSlides,
    heroSlidesSource.map((s, i) => ({
      eyebrow: s.eyebrow,
      title: s.title,
      description: s.description,
      backgroundImage: mediaUrl(s.image),
      imageAlt: s.imageAlt,
      primaryCtaLabel: s.primaryAction.label,
      primaryCtaHref: mediaUrl(s.primaryAction.href),
      secondaryCtaLabel: s.secondaryAction?.label ?? null,
      secondaryCtaHref: mediaUrlOrNull(s.secondaryAction?.href),
      sortOrder: i,
    }))
  );

  seedIfEmpty(
    "socialSidebarItems",
    schema.socialSidebarItems,
    socialSidebarSource.map((s, i) => ({
      key: s.key,
      label: s.label,
      subtitle: s.subtitle ?? null,
      href: mediaUrl(s.href),
      icon: s.icon,
      colorClass: s.colorClass,
      sortOrder: i,
    }))
  );

  seedIfEmpty(
    "glanceStats",
    schema.glanceStats,
    glanceStatsSource.map((s, i) => ({
      icon: s.icon,
      value: s.value ?? null,
      decimals: s.decimals ?? null,
      prefix: s.prefix ?? null,
      suffix: s.suffix ?? null,
      title: s.title,
      subtitle: s.subtitle ?? null,
      sortOrder: i,
    }))
  );

  seedIfEmpty(
    "announcements",
    schema.announcements,
    announcementsSource.map((a, i) => ({
      title: a.title,
      href: mediaUrl(a.href),
      isNew: a.isNew ?? false,
      sortOrder: i,
    }))
  );

  seedIfEmpty(
    "onlineSystems",
    schema.onlineSystems,
    activeSystemsSource.map((a, i) => ({
      title: a.title,
      href: mediaUrl(a.href),
      description: a.description || null,
      featured: a.featured ?? false,
      sortOrder: i,
    }))
  );

  seedIfEmpty(
    "newsPreview",
    schema.newsPreview,
    newsPreviewSource.map((n, i) => ({
      title: n.title,
      href: mediaUrl(n.href),
      urgent: n.urgent ?? false,
      sortOrder: i,
    }))
  );

  seedIfEmpty("relatedLinks", schema.relatedLinks, [
    ...relatedBoardsSource.map((l, i) => ({ group: "boards" as const, label: l.label, href: mediaUrl(l.href), sortOrder: i })),
    ...relatedOrganizationsSource.map((l, i) => ({ group: "organizations" as const, label: l.label, href: mediaUrl(l.href), sortOrder: i })),
  ]);

  seedIfEmpty(
    "notifications",
    schema.notifications,
    notificationsSource.map((n, i) => ({
      title: n.title,
      href: mediaUrl(n.href),
      urgent: false,
      showOnHome: false,
      sortOrder: i,
    }))
  );

  seedIfEmpty(
    "downloads",
    schema.downloads,
    downloadsSource.map((d, i) => ({ title: d.title, href: mediaUrl(d.href), sortOrder: i }))
  );

  seedIfEmpty("modelPapers", schema.modelPapers, [
    ...sscModelPapers.map((m, i) => ({ level: "ssc" as const, title: m.title, href: mediaUrl(m.href), sortOrder: i })),
    ...hsscModelPapers.map((m, i) => ({ level: "hssc" as const, title: m.title, href: mediaUrl(m.href), sortOrder: i })),
  ]);

  seedIfEmpty("careers", schema.careers, [
    { title: "Applications required for Secrecy Officers (Temporary Basis)", href: mediaUrl("/downloads/careers/Advt._SOs_Matric.pdf"), sortOrder: 0 },
    { title: "Applications Form for Secrecy Officers (Temporary Basis)", href: mediaUrl("/downloads/careers/SO_Matric_Form.pdf"), sortOrder: 1 },
  ]);

  seedIfEmpty(
    "tenders",
    schema.tenders,
    tendersSource.map((t, i) => ({ title: t.title, href: mediaUrl(t.href), sortOrder: i }))
  );

  seedIfEmpty(
    "rtiItems",
    schema.rtiItems,
    rtiSource.map((r, i) => ({
      label: r.label,
      description: r.description,
      href: mediaUrlOrNull(r.href),
      notApplicable: r.notApplicable ?? false,
      sortOrder: i,
    }))
  );

  seedIfEmpty(
    "aboutSections",
    schema.aboutSections,
    aboutSectionsSource.map((s, i) => ({
      slug: s.id,
      title: s.title,
      body: s.body,
      listItems: s.list ?? null,
      ordered: s.ordered ?? false,
      sortOrder: i,
    }))
  );

  seedIfEmpty("officials", schema.officials, [
    {
      roleSlug: "chairman",
      name: "Engr. Dr. Badar-ul-Islam",
      title: "Chairman",
      appointment: "Chairman, BISE Lahore",
      imageSrc: mediaUrl("/people/chairman1.jpg"),
      breadcrumbLabel: "Chairman",
      email: "chairman@biselahore.com",
      phone: "+92 42 99200191",
      messageParagraphs: [
        "It is an honour to serve the students, institutions, and families of Lahore through a transparent, disciplined, and student-focused examination system. BISE Lahore remains committed to upholding academic integrity while ensuring that every candidate is treated fairly and with dignity.",
        "Our administration continues to strengthen digital systems, improve accessibility, and promote timely communication so that the examination process remains smooth and dependable. We believe that quality education and credible assessment must go hand in hand for the progress of the province and the nation.",
        "I urge all students, parents, and affiliated institutions to stay connected with official announcements and use the available online services responsibly. Together, we can preserve the credibility and prestige of our examination system.",
      ],
    },
    {
      roleSlug: "secretary",
      name: "Rizwan Nazir",
      title: "Secretary",
      appointment: "Secretary, BISE Lahore",
      imageSrc: mediaUrl("/people/secretary.jpg"),
      breadcrumbLabel: "Secretary",
      email: "secretary@biselahore.com",
      phone: "+92 42 99200192",
      messageParagraphs: [
        "The Board of Intermediate and Secondary Education (BISE), Lahore, established in 1954, has served as a distinguished institution of educational assessment for more than seven decades, earning an enduring reputation for excellence, integrity, transparency and public trust. As the oldest and pioneering Board of Intermediate and Secondary Education in both Punjab and Pakistan, BISE Lahore is widely acknowledged as the 'Mother Board', having laid the foundation for the subsequent establishment of other Boards of Intermediate and Secondary Education across the Province. Throughout its illustrious history, the Board has steadfastly upheld the principles of fairness, impartiality and merit by conducting examinations in a transparent, credible and efficient manner, while consistently maintaining the highest standards of professionalism, accountability and institutional integrity.",
        "At present, the Board of Intermediate and Secondary Education (BISE), Lahore, annually facilitates nearly two million fresh candidates appearing in the Secondary School Certificate (SSC) and Higher Secondary School Certificate (HSSC) examinations, making it one of the largest examining bodies in the country. Under the visionary leadership of the Honourable Chief Minister, Punjab, the guidance of the Honorable Minister for School Education and Higher Education, and supervision of Chairman Chief Minister Task Force on Examination Reforms and the dynamic administrative leadership of the Board, BISE Lahore remains firmly committed to strengthening the examination system and delivering efficient, transparent, technology-driven and citizen-centric public services.",
        "To achieve these objectives, the Board is actively implementing a comprehensive reform agenda aimed at modernizing examination and assessment practices in line with contemporary educational standards. Particular emphasis is being placed on enhancing the quality, accuracy and credibility of assessment through the introduction of innovative initiatives, including On-Screen Marking (OSM), the adoption of advanced digital technologies, process automation, continuous institutional improvements and alignment with internationally recognized best practices. These transformative reforms are designed to further reinforce the credibility, transparency, efficiency and reliability of the examination system while ensuring that every candidate is assessed fairly, objectively and in accordance with the highest standards of merit, integrity and accountability.",
        "At the Board of Intermediate and Secondary Education (BISE), Lahore, we firmly believe that students, parents, teachers, educational institutions and all other stakeholders are entitled to services that are efficient, accessible, transparent and responsive. Guided by this commitment, the Board remains steadfast in its pursuit of excellence in public service delivery through continuous institutional improvement, innovation and the adoption of best governance practices.",
        "BISE Lahore is dedicated to preserving and strengthening the confidence reposed in the institution by ensuring the highest standards of integrity, accountability, professionalism and service excellence. The Board will continue to work with unwavering commitment to modernize the examination system, promote transparency and merit, and enhance the quality and credibility of educational assessment. Through collective efforts and a forward-looking vision, BISE Lahore aspires to build a robust, technology-driven and internationally aligned examination system that fosters educational excellence, inspires public confidence and serves the interests of present and future generations.",
      ],
    },
    {
      roleSlug: "controller",
      name: "Toseef-ur-Rehman",
      title: "Controller of Examinations",
      appointment: "Controller of Examinations, BISE Lahore",
      imageSrc: mediaUrl("/people/controller.jpg"),
      breadcrumbLabel: "Controller of Examinations",
      email: "controller@biselahore.com",
      phone: "+92 42 99200193",
      messageParagraphs: [
        "The examination wing remains the backbone of the Board’s credibility and public confidence. Every step of the process — from scheduling to result management — is designed to preserve accuracy, fairness, and institutional discipline while serving the needs of thousands of students every year.",
        "Our team continues to improve examination planning, operational monitoring, and result-related services with the help of modern systems and stronger coordination. The aim is to ensure that every candidate receives a process that is transparent, secure, and dependable.",
        "I encourage all stakeholders to follow official guidance closely and rely only on authenticated communication channels. When we work with integrity and discipline, the examination system becomes a source of confidence for students, parents, and institutions alike.",
      ],
    },
  ]);

  seedIfEmpty(
    "contactOfficials",
    schema.contactOfficials,
    contactOfficialsSource.map((c, i) => ({
      role: c.role,
      name: c.name,
      photo: mediaUrlOrNull(c.photo),
      phone: c.phone,
      fax: c.fax ?? null,
      email: c.email,
      sortOrder: i,
    }))
  );

  seedIfEmpty("generalInquiry", schema.generalInquiry, [
    {
      phone: generalInquirySource.phone,
      portalLabel: generalInquirySource.portalLabel,
      portalHref: mediaUrl(generalInquirySource.portalHref),
    },
  ]);

  seedIfEmpty(
    "faqs",
    schema.faqs,
    faqsSource.map((f, i) => ({ question: f.question, answer: f.answer, sortOrder: i }))
  );

  seedIfEmpty(
    "resultStats",
    schema.resultStats,
    resultStatsSource.map((r, i) => ({
      year: r.year,
      ssc9thLabel: r.ssc9th.href ? r.ssc9th.label : null,
      ssc9thHref: mediaUrlOrNull(r.ssc9th.href),
      ssc10thLabel: r.ssc10th.href ? r.ssc10th.label : null,
      ssc10thHref: mediaUrlOrNull(r.ssc10th.href),
      sscSupplyLabel: r.sscSupply.href ? r.sscSupply.label : null,
      sscSupplyHref: mediaUrlOrNull(r.sscSupply.href),
      hssc11thLabel: r.hssc11th.href ? r.hssc11th.label : null,
      hssc11thHref: mediaUrlOrNull(r.hssc11th.href),
      hssc12thLabel: r.hssc12th.href ? r.hssc12th.label : null,
      hssc12thHref: mediaUrlOrNull(r.hssc12th.href),
      hsscSupplyLabel: r.hsscSupply.href ? r.hsscSupply.label : null,
      hsscSupplyHref: mediaUrlOrNull(r.hsscSupply.href),
      sortOrder: i,
    }))
  );

  const albumIds: Record<string, number> = {};
  if (isEmpty(schema.galleryAlbums)) {
    galleryAlbumsSource.forEach((album, i) => {
      const inserted = db
        .insert(schema.galleryAlbums)
        .values({ slug: album.id, date: album.date, title: album.title, sortOrder: i })
        .returning({ id: schema.galleryAlbums.id })
        .get();
      albumIds[album.id] = inserted.id;
    });
    const imageRows = galleryAlbumsSource.flatMap((album) =>
      album.images.map((img, i) => ({
        albumId: albumIds[album.id],
        full: mediaUrl(img.full),
        thumb: mediaUrl(img.thumb),
        alt: img.alt,
        sortOrder: i,
      }))
    );
    if (imageRows.length > 0) {
      db.insert(schema.galleryImages).values(imageRows).run();
    }
    console.log(`seed  galleryAlbums (${galleryAlbumsSource.length} albums)`);
  } else {
    console.log("skip  galleryAlbums (already seeded)");
  }

  seedIfEmpty("deputationists", schema.deputationists, [
    ...chairmenSource.map((r, i) => ({ group: "chairmen" as const, no: r.no, name: r.name, fromDate: r.from, toDate: r.to, sortOrder: i })),
    ...secretariesSource.map((r, i) => ({ group: "secretaries" as const, no: r.no, name: r.name, fromDate: r.from, toDate: r.to, sortOrder: i })),
    ...controllersSource.map((r, i) => ({ group: "ces" as const, no: r.no, name: r.name, fromDate: r.from, toDate: r.to, sortOrder: i })),
  ]);

  console.log("Seed complete.");
}

main();
