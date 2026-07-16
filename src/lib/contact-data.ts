export interface ContactOfficial {
  role: string;
  name: string;
  photo?: string;
  phone: string;
  fax?: string;
  email: string;
}

/** Verbatim from the legacy contactus.html. */
export const contactOfficials: ContactOfficial[] = [
  {
    role: "Chairman",
    name: "Engr. Dr. Badar-ul-Islam",
    photo: "/people/chairman.jpg",
    phone: "+92 42 99200101-102",
    fax: "+92 42 99200113",
    email: "chairman@biselahore.com",
  },
  {
    role: "Secretary",
    name: "Rizwan Nazir",
    photo: "/people/secretary.jpg",
    phone: "+92 42 99200152-153",
    email: "secretary@biselahore.com",
  },
  {
    role: "Controller",
    name: "Toseef-ur-Rehman",
    photo: "/people/controller.jpg",
    phone: "+92 42 99200033-34",
    fax: "+92 42 99203251",
    email: "controller@biselahore.com",
  },
];

export const generalInquiry = {
  phone: "+92 42 99200192-197",
  fax: "+92 42 99200113",
  portalLabel: "complaints.biselahore.com",
  portalHref: "http://complaints.biselahore.com",
};
