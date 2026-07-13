export interface Faq {
  question: string;
  answer: string;
}

/**
 * Authored content — the legacy FAQs.html had no real questions, only an
 * "under construction" placeholder image. These answers point to the site's
 * actual live services rather than inventing facts about the Board.
 */
export const faqs: Faq[] = [
  {
    question: "How do I get my roll number slip?",
    answer:
      "Roll number slips are issued through the Board's dedicated slip portals under Online / Active Systems on the homepage — separate links are provided for regular and private candidates, and for SSC and HSSC.",
  },
  {
    question: "How do I check my result?",
    answer:
      "Results are published on the Online Results portal (result.biselahore.com), linked from Quick Services on the homepage.",
  },
  {
    question: "How do I correct my name, father's name, or date of birth on my record?",
    answer:
      "Use the Name Correction, F-Name Correction, or D.O.B Correction links under Quick Services on the homepage, which route to the Board's correction portal.",
  },
  {
    question: "How do I track the status of an application I've submitted?",
    answer:
      "Use the Tracking ID service under Quick Services to check the status of applications such as attestation, verification, NOC/migration, or duplicate certificates.",
  },
  {
    question: "How do I print my fee challan?",
    answer: "Fee challans can be generated and printed through the Print Challan service under Quick Services.",
  },
  {
    question: "How do I lodge a complaint?",
    answer:
      "Complaints can be lodged by phone (+92 42 99200192-197), by email (complaint@biselahore.com), or through the online complaints portal — see the Complaints page for details and to check the status of a complaint you've already filed.",
  },
  {
    question: "How do I request information under the Right to Information (RTI) framework?",
    answer:
      "The Board proactively discloses the categories of information required under RTI on the RTI (Proactive Disclosure) page, including its functions, officers, budget, and public information officer.",
  },
  {
    question: "Where can I find admission schedules, date sheets, and syllabus updates?",
    answer:
      "All of these are published on the Notifications page, which is searchable and updated as new circulars are issued.",
  },
  {
    question: "Where can I find forms for migration, affiliation, or examination duties?",
    answer: "All current forms are available on the Downloads page, organized as a single searchable list.",
  },
  {
    question: "How do I find affiliated schools and colleges?",
    answer:
      "The Affiliated Institutes entry under Quick Access links to the Board's affiliated-institutions directory, with separate lists for schools and colleges.",
  },
  {
    question: "How do I apply for a job at BISE Lahore?",
    answer: "Current openings and their application forms are listed on the Careers page.",
  },
  {
    question: "Where can I view current tenders?",
    answer: "All current procurement and framework-contract tender notices are listed on the Tenders page.",
  },
];
