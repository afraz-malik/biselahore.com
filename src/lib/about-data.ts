export interface AboutSection {
  id: string;
  title: string;
  body: string[];
  list?: string[];
  ordered?: boolean;
}

/** Verbatim from the legacy aboutus.html, section by section. */
export const aboutSections: AboutSection[] = [
  {
    id: "establishment",
    title: "Establishment",
    body: [
      "Since the emergence of Pakistan on the map of the world, the examinations pertaining to the Matriculation and Intermediate level were conducted under the aegis of University of the Punjab. However, through the promulgation of the Punjab University Act (Amendment) Ordinance 1954, the Board of Secondary Education, Punjab was established in the province which took from the said University control of examinations of Secondary, Intermediate and Pakistani & Classical Languages. The first-ever examination for these stages was conducted in the year 1955.",
    ],
  },
  {
    id: "jurisdiction",
    title: "Jurisdiction",
    body: [],
    ordered: true,
    list: [
      "At the time of its inception in 1954, the Board inherited vast territorial jurisdictions for conducting examinations in the provinces of Punjab, Baluchistan, Azad Kashmir and Northern Areas. To accommodate overseas candidates, the Board also constituted examination centres at Kuwait and Nairobi (Kenya).",
      "Current jurisdiction of the Board of Intermediate & Secondary Education Lahore has been confined to the districts of Lahore, Kasur, Sheikhupura and Nankana Sahib.",
    ],
  },
  {
    id: "new-boards",
    title: "New Boards",
    body: [
      "Owing to tremendous increase in the candidature, two more Boards were established at Multan and Sargodha under West Pakistan Boards of Intermediate and Secondary Education (Multan & Sargodha) Ordinance No. XVII of 1968. As a result of further bifurcation, Boards were also established at Rawalpindi, Gujranwala and Sahiwal. The re-construction of the Board of Intermediate & Secondary Education, Lahore has been done through the Punjab Boards of Intermediate & Secondary Education Act 1976 (lately amended by Punjab Ordinance No. XLVII), and presently in the administrative setup of the province, Nine Boards are functioning at division level.",
    ],
  },
  {
    id: "administrative-structure",
    title: "Administrative Structure of the Board",
    body: [
      "The Chairman exercises control over the office of the Board as its principal executive and academic officer and also presides over the meetings of the Board. He is also assisted by two officers of the Board, namely the Secretary and the Controller of Examinations, in administrative matters as well as those related to examinations.",
    ],
  },
  {
    id: "vision",
    title: "Vision Statement",
    body: [
      "To promote the cause of education through conducting examinations in an extremely fair, unbiased, transparent & judicious environment so that our educated nationals may be able to contribute meaningfully in the competitive world.",
    ],
  },
  {
    id: "constitution",
    title: "Constitution of the Board",
    body: [
      "According to Clause 5 of the Act, the Governing Body controlling the whole affairs of the office is called the 'Board' which consists of the following members:",
    ],
    ordered: true,
    list: [
      "The Chairman.",
      "The Vice-Chancellor of the University, or a University Professor nominated by him.",
      "All Executive District Officers (Education) related to the area within the jurisdiction of the Board.",
      "The Director of Technical Education, Punjab, Lahore or his nominee.",
      "One representative each of the Finance and Education Departments not below the rank of a Deputy Secretary.",
      "One Principal of a Degree College situated within the jurisdiction of the Board to be nominated by the Controlling Authority.",
      "One Principal of an Intermediate College situated within the jurisdiction of the Board to be nominated by the Controlling Authority.",
      "Two Headmasters and one Headmistress of Schools situated within the jurisdiction of the Board to be nominated by the Controlling Authority.",
      "Two persons nominated by the Controlling Authority from amongst scholars and retired educationists.",
    ],
  },
];
