export type QuickServiceIcon =
  | "attestation"
  | "verification"
  | "migration"
  | "duplicate"
  | "name-change"
  | "father-name"
  | "dob";

export interface QuickServiceCard {
  title: string;
  description: string;
  ctaLabel: string;
  href: string;
  icon: QuickServiceIcon;
  external?: boolean;
}

/**
 * "Quick Services" — the four e-service CTAs baked into the old jssor slider
 * image (rebuilt as real markup) plus the three record-correction actions.
 * These are the single most-requested student actions on the whole site.
 */
export const quickServiceCards: QuickServiceCard[] = [
  {
    title: "Attestation",
    description: "Get your result card or certificate officially attested by BISE Lahore authorities.",
    ctaLabel: "Learn More",
    href: "https://eportal.biselahore.com/eservices/attestation",
    icon: "attestation",
    external: true,
  },
  {
    title: "Verification",
    description: "Official document verification for universities or employer background checks.",
    ctaLabel: "Verify Now",
    href: "https://eportal.biselahore.com/eservices/verification",
    icon: "verification",
    external: true,
  },
  {
    title: "NOC / Migration",
    description: "Apply for No Objection Certificate or migration between different boards.",
    ctaLabel: "Apply for NOC",
    href: "https://eportal.biselahore.com/eservices/noc",
    icon: "migration",
    external: true,
  },
  {
    title: "Duplicate / Triplicate",
    description: "Re-issuance of lost or damaged certificates, duplicate or triplicate copies.",
    ctaLabel: "Order Copy",
    href: "https://eportal.biselahore.com/eservices/duplicatedocument",
    icon: "duplicate",
    external: true,
  },
  {
    title: "Name Change",
    description: "Correction or legal name change updates in the board's permanent records.",
    ctaLabel: "Update Profile",
    href: "https://correction.biselahore.com",
    icon: "name-change",
    external: true,
  },
  {
    title: "Father's Name Correction",
    description: "Rectify spelling errors or formal changes to father's name on credentials.",
    ctaLabel: "Apply Now",
    href: "https://correction.biselahore.com",
    icon: "father-name",
    external: true,
  },
  {
    title: "Date of Birth Correction",
    description: "Submit evidence for the correction of date of birth in official certificates.",
    ctaLabel: "Submit Form",
    href: "https://correction.biselahore.com",
    icon: "dob",
    external: true,
  },
];

export type UtilityAccessIcon =
  | "fingerprint"
  | "printer"
  | "graduation-cap"
  | "users"
  | "bar-chart"
  | "message-warning"
  | "scroll-text"
  | "briefcase"
  | "school"
  | "clipboard-list"
  | "gavel"
  | "images"
  | "trophy"
  | "newspaper"
  | "file-text";

export type UtilityAccessGroup =
  | "Student Tools"
  | "Results & Records"
  | "Institutions & Careers"
  | "Reports & Media";

export interface UtilityAccessCard {
  title: string;
  description: string;
  href: string;
  icon: UtilityAccessIcon;
  group: UtilityAccessGroup;
  external?: boolean;
  /** For items that expand to more than one destination (legacy "flip card"). */
  children?: { label: string; href: string; external?: boolean }[];
}

/** "Utilities / Quick Access" — every other board utility and service link, grouped for the nav mega menu. */
export const utilityQuickAccess: UtilityAccessCard[] = [
  { title: "Track Your Application", description: "Track your application status", href: "https://eportal.biselahore.com/eservices/tracking", icon: "fingerprint", external: true, group: "Student Tools" },
  { title: "Print Challan", description: "Download & print fee challan", href: "http://challan.biselahore.com/", icon: "printer", external: true, group: "Student Tools" },
  { title: "Duty Orders", description: "Examination duty orders", href: "http://onlineorders.biselahore.com/", icon: "clipboard-list", external: true, group: "Institutions & Careers" },
  { title: "Complaints", description: "Lodge a complaint online", href: "/complaints", icon: "message-warning", group: "Student Tools" },

  { title: "Online Results", description: "Check SSC & HSSC results", href: "http://result.biselahore.com/", icon: "graduation-cap", external: true, group: "Results & Records" },
  { title: "SSC Members", description: "Browse SSC examination members", href: "https://ssc.biselahore.com/", icon: "users", external: true, group: "Institutions & Careers" },
  { title: "HSSC Members", description: "Browse HSSC examination members", href: "https://hssc.biselahore.com/", icon: "users", external: true, group: "Institutions & Careers" },
  { title: "Result Statistics", description: "Board-wide result analytics", href: "/result-statistics", icon: "bar-chart", group: "Results & Records" },
  { title: "Position Holders", description: "Meet our top achievers", href: "https://profiler.biselahore.com/positionholders.aspx", icon: "trophy", external: true, group: "Results & Records" },
  { title: "Model Papers — Matric", description: "Sample papers for SSC", href: "/model-papers/ssc", icon: "file-text", group: "Results & Records" },
  { title: "Model Papers — Intermediate", description: "Sample papers for HSSC", href: "/model-papers/hssc", icon: "file-text", group: "Results & Records" },

  {
    title: "Affiliated Institutes",
    description: "Schools & colleges directory",
    href: "https://conduct.biselahore.com/ShowInstitutions.aspx",
    icon: "school",
    external: true,
    group: "Institutions & Careers",
    children: [
      { label: "Schools", href: "https://conduct.biselahore.com/ShowInstitutions.aspx" },
      { label: "Colleges", href: "https://conduct.biselahore.com/ShowInstitutions_Colleges.aspx" },
    ],
  },
  { title: "Careers", description: "Explore job opportunities", href: "/careers", icon: "briefcase", group: "Institutions & Careers" },
  { title: "Tenders", description: "View procurement tenders", href: "/tenders", icon: "gavel", group: "Reports & Media" },
  { title: "RTI", description: "Right to Information requests", href: "/rti", icon: "scroll-text", group: "Reports & Media" },

  { title: "Photo Gallery", description: "Browse event photos", href: "/gallery", icon: "images", group: "Reports & Media" },
  { title: "Newsletter", description: "Read our latest newsletter", href: "/downloads/newsletter/NL_2025.pdf", icon: "newspaper", group: "Reports & Media" },
  {
    title: "Term of Deputationists",
    description: "Former chairmen, secretaries, and CEs",
    href: "/deputationists/chairmen",
    icon: "users",
    group: "Reports & Media",
    children: [
      { label: "Chairmen", href: "/deputationists/chairmen" },
      { label: "Secretaries", href: "/deputationists/secretaries" },
      { label: "CEs", href: "/deputationists/ces" },
    ],
  },
];

export interface ActiveSystemLink {
  title: string;
  href: string;
  featured?: boolean;
}

/** Only the currently-live links from the "Online / Active Systems" wall (commented-out legacy entries dropped). */
export const activeSystems: ActiveSystemLink[] = [
  { title: "SSC Registration for Second Annual, 2026", href: "https://privatereginter.biselahore.com/", featured: true },
  { title: "Private Roll No. Slips (11th) First Annual Examination 2026", href: "https://slips_part1.biselahore.com/" },
  { title: "Regular Roll No. Slips HSSC First Annual Examination 2026", href: "https://regularslipsinter.biselahore.com" },
  { title: "Private Roll No. Slips (12th) 1st Ann. Exam 2026", href: "https://hsscslips.biselahore.com/" },
  { title: "Regular Roll No. Slips (12th) 1st Ann. Exam 2026", href: "https://regularslipsinter.biselahore.com" },
  { title: "Regular Registration (9th Class) Session 2026-2028", href: "https://registration.biselahore.com" },
  { title: "Duty Consent Form for Intermediate Exam 2026", href: "https://dutyconsent.biselahore.com" },
  { title: "Regular Roll No. Slips SSC Part-I 9th Class (1st Ann.) Exam 2026", href: "https://regularslips.biselahore.com/" },
  { title: "Private Roll No. Slips SSC Part-I 9th Class (1st Ann.) Exam 2026", href: "https://slips_part1.biselahore.com/" },
  { title: "Private Roll No. Slips SSC (First Annual) Exam 2026", href: "https://slips.biselahore.com/" },
  { title: "Exam Management / Biometric System", href: "https://ems.biselahore.com/" },
];

export interface Announcement {
  title: string;
  href: string;
  isNew?: boolean;
}

/** Only the currently-live items from the legacy popup (commented-out entries dropped). */
export const announcements: Announcement[] = [
  { title: "Private Registration Schedule (9th) for First Annual Exam 2027", href: "/downloads/notifications/admissions/Pvt_RegSch(1stA27).pdf", isNew: true },
  { title: "SSC Registration for Second Annual, 2026", href: "https://privatereginter.biselahore.com/", isNew: true },
  { title: "Private Registration Schedule for Second Annual Exam 2026", href: "/downloads/notifications/admissions/Pvt_RegSch(SA26).pdf" },
  { title: "Revised Regular Registration Schedule 9th Class (Session 2026-28)", href: "/downloads/notifications/admissions/RevRegSch_9th_Regular.pdf" },
  { title: "Private Roll No. Slips HSSC Part-I (1st Ann.) Exam 2026", href: "http://slips_part1.biselahore.com/" },
  { title: "Booklet Enrollment / Admission (9th) Session 2026-28", href: "/downloads/notifications/misc/9th_Booklet_Reg_Sess2026-28.pdf" },
  { title: "Instructions regarding Practical Examination of SSC", href: "/downloads/notifications/examination/Instr_Pr.Exam.pdf" },
  { title: "Private Roll No. Slips SSC (9th Class) 1st Ann. Exam 2026", href: "https://slips_part1.biselahore.com" },
  { title: "Newsletter 2025 - Transforming Education", href: "/downloads/newsletter/NL_2025.pdf" },
];

export interface NewsItem {
  title: string;
  href: string;
  urgent?: boolean;
}

/** Condensed preview of the legacy marquee (~35 items); full list lives on the Notifications page. */
export const newsPreview: NewsItem[] = [
  { title: "Tender Notice for the procurement of UPS and Network Switches", href: "/downloads/tenders/Tender_UpsNetwork.pdf", urgent: true },
  { title: "Tender Notice for the procurement of Printers", href: "/downloads/tenders/Tender_Printers2502.pdf" },
  { title: "Tender Notice for the procurement of Computers and Laptops", href: "/downloads/tenders/Tender_PC_Laptops.pdf", urgent: true },
  { title: "Tender Notice for the procurement of Heavy Duty Printers", href: "/downloads/tenders/Tender_HDutyPrinter.pdf" },
  { title: "Tender Notice for the sale of Waste Paper (Raddi)", href: "/downloads/tenders/Tender_Raddi0226.pdf", urgent: true },
  { title: "Tender Notice for the Framework Contract for hiring Security Services / Security Guards", href: "/downloads/tenders/Tender_SGuards1225.pdf" },
  { title: "Updated Scheme of Studies and Syllabus for HSSC 11th and 12th (Academic Session 2025-2027)", href: "/downloads/notifications/misc/Syllabus_11th&12th_(2025-2027).pdf", urgent: true },
  { title: "Directions for Practical Examiners for Matric and Intermediate Examinations (SSC & HSSC)", href: "/downloads/notifications/examination/Directions_PrExaminers.pdf" },
];

export type GlanceStatIcon =
  | "graduation-cap"
  | "school"
  | "scroll-text"
  | "map-pin"
  | "award"
  | "laptop"
  | "book-open"
  | "zap";

export interface GlanceStat {
  icon: GlanceStatIcon;
  /** Omit for a label-only card (e.g. "SSC & HSSC Programs") with no counter. */
  value?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  title: string;
  subtitle?: string;
}

/** "BISE at a Glance" — headline scale/credibility numbers. Placeholders pending confirmed figures from the Board. */
export const glanceStats: GlanceStat[] = [
  { icon: "graduation-cap", value: 1_250_000, suffix: "+", title: "Students Examined", subtitle: "Across SSC & HSSC annually" },
  { icon: "school", value: 4_775, title: "Affiliated Institutions", subtitle: "Schools & colleges under BISE Lahore" },
  { icon: "scroll-text", value: 110_371, title: "Teachers in our Databank", subtitle: "Qualified educators on record" },
  { icon: "award", value: 72, title: "Years of Excellence", subtitle: "Continuous service since 1954" },
  { icon: "laptop", value: 25, suffix: "+", title: "Online Services", subtitle: "Digital-first student support" },
  { icon: "scroll-text", value: 2_800_000, suffix: "+", title: "Certificates Issued", subtitle: "Since digitization began" },
  { icon: "zap", value: 99.9, decimals: 1, suffix: "%", title: "Portal Availability", subtitle: "Reliable access for online systems" },
  { icon: "book-open", value: 35, suffix: "+", title: "SSC & HSSC Programs", subtitle: "Full spectrum of board examinations" },
];

export interface LinkColumn {
  heading: string;
  links: NavLinkLike[];
}

export interface NavLinkLike {
  label: string;
  href: string;
}

export const relatedBoards: NavLinkLike[] = [
  { label: "AJK Mirpur Board", href: "http://ajkbise.net/" },
  { label: "Bahawalpur Board", href: "https://www.bisebwp.edu.pk/" },
  { label: "Dera Ghazi Khan Board", href: "http://www.bisedgkhan.edu.pk/" },
  { label: "Faisalabad Board", href: "http://www.bisefsd.edu.pk/" },
  { label: "Federal Board", href: "https://www.fbise.edu.pk/" },
  { label: "Gujranwala Board", href: "http://www.bisegrw.edu.pk/" },
  { label: "Multan Board", href: "http://www.bisemultan.edu.pk/" },
  { label: "Rawalpindi Board", href: "http://www.biserwp.edu.pk/" },
  { label: "Sahiwal Board", href: "http://bisesahiwal.edu.pk/" },
  { label: "Sargodha Board", href: "http://www.bisesargodha.edu.pk/content/index.aspx" },
];

export const relatedOrganizations: NavLinkLike[] = [
  { label: "Higher Education Department GoP", href: "https://hed.punjab.gov.pk/" },
  { label: "Punjab Educational Endowment Fund (PEEF)", href: "https://www.peef.org.pk/" },
  { label: "Punjab Examination Commission (PEC)", href: "http://www.pec.edu.pk/" },
  { label: "Punjab University (PU)", href: "http://www.pu.edu.pk/" },
  { label: "Virtual University (VU)", href: "http://www.vu.edu.pk/" },
  { label: "Allama Iqbal Open University (AIOU)", href: "https://aiou.edu.pk/" },
  { label: "Online College Admission System (OCAS)", href: "https://ocas.punjab.gov.pk/" },
  { label: "E-Learn Punjab", href: "https://eLearn.punjab.gov.pk/" },
  { label: "Pakistan Citizen Portal", href: "https://play.google.com/store/apps/details?id=com.govpk.citizensportal&hl=en" },
  { label: "Rahmatul-lil-Aalameen (PBUH) Scholarship", href: "https://hedscholarships.punjab.gov.pk/" },
];
