export interface ResultLink {
  label: string;
  href: string | null;
}

export interface ResultYearRow {
  year: number;
  ssc9th: ResultLink;
  ssc10th: ResultLink;
  sscSupply: ResultLink;
  hssc11th: ResultLink;
  hssc12th: ResultLink;
  hsscSupply: ResultLink;
}

const dead: ResultLink = { label: "—", href: null };

/** Verbatim from the legacy resultStats.html table. */
export const resultStats: ResultYearRow[] = [
  {
    year: 2020,
    ssc9th: dead,
    ssc10th: { label: "10th", href: "/downloads/Preambles/SSC/10th/2020_10th.pdf" },
    sscSupply: { label: "Supply", href: "/downloads/Preambles/SSC/10th/2020_10thS.pdf" },
    hssc11th: dead,
    hssc12th: { label: "12th", href: "/downloads/Preambles/HSSC/12th/2020_12th.pdf" },
    hsscSupply: { label: "Supply", href: "/downloads/Preambles/HSSC/12th/2020_12thS.pdf" },
  },
  {
    year: 2021,
    ssc9th: { label: "9th", href: "/downloads/Preambles/SSC/9th/2021_9th.pdf" },
    ssc10th: { label: "10th", href: "/downloads/Preambles/SSC/10th/2021_10th.pdf" },
    sscSupply: { label: "Supply", href: "/downloads/Preambles/SSC/10th/2021_10thS.pdf" },
    hssc11th: { label: "11th", href: "/downloads/Preambles/HSSC/11th/2021_11th.pdf" },
    hssc12th: { label: "12th", href: "/downloads/Preambles/HSSC/12th/2021_12th.pdf" },
    hsscSupply: { label: "Supply", href: "/downloads/Preambles/HSSC/12th/2021_12thS.pdf" },
  },
  {
    year: 2022,
    ssc9th: { label: "9th", href: "/downloads/Preambles/SSC/9th/2022_9th.pdf" },
    ssc10th: { label: "10th", href: "/downloads/Preambles/SSC/10th/2022_10th.pdf" },
    sscSupply: { label: "2nd Annual", href: "/downloads/Preambles/SSC/10th/2022_10thS.pdf" },
    hssc11th: { label: "11th", href: "/downloads/Preambles/HSSC/11th/2022_11th.pdf" },
    hssc12th: { label: "12th", href: "/downloads/Preambles/HSSC/12th/2022_12th.pdf" },
    hsscSupply: { label: "2nd Annual", href: "/downloads/Preambles/HSSC/12th/2022_12thS.pdf" },
  },
  {
    year: 2023,
    ssc9th: { label: "9th", href: "/downloads/Preambles/SSC/9th/2023_9th.pdf" },
    ssc10th: { label: "10th", href: "/downloads/Preambles/SSC/10th/2023_10th.pdf" },
    sscSupply: { label: "Supply", href: "/downloads/Preambles/SSC/10th/2023_10thS.pdf" },
    hssc11th: { label: "11th", href: "/downloads/Preambles/HSSC/11th/2023%2011th.pdf" },
    hssc12th: { label: "12th", href: "/downloads/Preambles/HSSC/12th/2023_12th.pdf" },
    hsscSupply: { label: "Supply", href: "/downloads/Preambles/HSSC/12th/2023_12thS.pdf" },
  },
  {
    year: 2024,
    ssc9th: { label: "9th", href: "/downloads/Preambles/SSC/9th/2024_9th.pdf" },
    ssc10th: { label: "10th", href: "/downloads/Preambles/SSC/10th/2024_10th.pdf" },
    sscSupply: { label: "Supply", href: "/downloads/Preambles/SSC/10th/2024_10thS.pdf" },
    hssc11th: { label: "11th", href: "/downloads/Preambles/HSSC/11th/2024_11th.pdf" },
    hssc12th: { label: "12th", href: "/downloads/Preambles/HSSC/12th/2024_12th.pdf" },
    hsscSupply: { label: "Supply", href: "/downloads/Preambles/HSSC/12th/2024_12thS.pdf" },
  },
  {
    year: 2025,
    ssc9th: { label: "9th", href: "/downloads/Preambles/SSC/9th/2025_9th.pdf" },
    ssc10th: { label: "10th", href: "/downloads/Preambles/SSC/10th/2025_10th.pdf" },
    sscSupply: { label: "Supply", href: "/downloads/Preambles/SSC/10th/2025_10thS.pdf" },
    hssc11th: { label: "11th", href: "/downloads/Preambles/HSSC/11th/2025_11th.pdf" },
    hssc12th: { label: "12th", href: "/downloads/Preambles/HSSC/12th/2025_12th.pdf" },
    hsscSupply: { label: "Supply", href: "/downloads/Preambles/HSSC/12th/2025_12thS.pdf" },
  },
];
