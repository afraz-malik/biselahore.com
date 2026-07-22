import type { DownloadListItem } from "@/components/downloads/download-list";
import { downloadUrl } from "@/lib/downloads-url";

/** Verbatim from the legacy sscmodelpapers.html. */
export const sscModelPapers: DownloadListItem[] = [
  { title: "Model Papers 10th Class (Latest)", href: downloadUrl("/downloads/Model%20Papers/Matric/ModelPapers_10th.pdf") },
  { title: "Model Papers 9th Class (Latest)", href: downloadUrl("/downloads/Model%20Papers/Matric/ModelPapers_9th.pdf") },
  { title: "Model Paper Ethics for 9th Class", href: downloadUrl("/downloads/Model%20Papers/Matric/Ethics_PaperNew_.pdf") },
  { title: "Model Paper Islamiat (Compulsory) for 9th Class", href: downloadUrl("/downloads/Model%20Papers/Matric/ModelPaper_Islamiyat_9thClass.pdf") },
];

/** Verbatim from the legacy hsscmodelpapers.html. */
export const hsscModelPapers: DownloadListItem[] = [
  { title: "Final Model Papers Intermediate (11th Class)", href: downloadUrl("/downloads/Model%20Papers/Inter/ModelPapers_11th.pdf") },
  { title: "Final Model Papers Intermediate (12th Class)", href: downloadUrl("/downloads/Model%20Papers/Inter/ModelPapers_12th.pdf") },
  { title: "English (Elective) 11th Class", href: downloadUrl("/downloads/Model%20Papers/Inter/Eng_Elective11th.pdf") },
  { title: "English (Elective) 12th Class", href: downloadUrl("/downloads/Model%20Papers/Inter/Eng_Elective12th.pdf") },
  { title: "Biology (Practical)", href: downloadUrl("/downloads/Model%20Papers/Inter/Practical/Pr.MP_Bio.pdf") },
  { title: "Chemistry (Practical)", href: downloadUrl("/downloads/Model%20Papers/Inter/Practical/Pr.MP_Chem.pdf") },
  { title: "Computer (Practical)", href: downloadUrl("/downloads/Model%20Papers/Inter/Practical/Pr.MP_Comp.pdf") },
  { title: "Physics (Practical)", href: downloadUrl("/downloads/Model%20Papers/Inter/Practical/Pr.MP_Phy.pdf") },
];
