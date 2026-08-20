export interface RtiItem {
  label: string;
  description: string;
  href?: string;
  notApplicable?: boolean;
}

/** Verbatim from the legacy rti.html statutory proactive-disclosure table. */
export const rtiItems: RtiItem[] = [
  { label: "i", description: "Particulars of the public body, its functions and duties", href: "/downloads/RTI/Annex-A.pdf" },
  { label: "ii", description: "Powers and functions of its officers and employees", href: "/downloads/RTI/Annex-A.pdf" },
  { label: "iii", description: "Norms and criteria set by the public body for the discharge of its functions", href: "/downloads/RTI/Annex-A.pdf" },
  { label: "iv", description: "Acts, Ordinances, rules, regulations, notifications, circulars and other legal instruments being enforced, issued or used by the public body in the discharge of its functions", href: "/downloads/RTI/Annex-A.pdf" },
  { label: "v", description: "A statement of categories of information being held by the public body", href: "/downloads/RTI/Annex-B.pdf" },
  { label: "vi", description: "A description of its decision-making process and any opportunities for the public to provide input into or be consulted about decisions", notApplicable: true },
  { label: "vii", description: "A directory of its officers and employees with their respective remuneration, perks and privileges", href: "/downloads/RTI/Annex-C.pdf" },
  { label: "viii", description: "Budget of the public body, including details of all proposed and actual expenditures", href: "/downloads/RTI/Annex-D.pdf" },
  { label: "ix", description: "Amount of subsidy and details of beneficiaries if the public body provides any subsidy", notApplicable: true },
  { label: "x", description: "Particulars of the recipients of concessions, permits or authorizations granted by the public body", notApplicable: true },
  { label: "xi", description: "Facilities available with the public body for obtaining information held by it", href: "/downloads/RTI/Annex-E.pdf" },
  { label: "xii", description: "Name, designation and other particulars of the public information officer of the public body", href: "/downloads/RTI/Annex-F.pdf" },
  { label: "xiii", description: "Any other information that the Government may notify in the official Gazette", notApplicable: true },
];
