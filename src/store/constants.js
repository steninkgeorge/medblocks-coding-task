
import { CopyPlusIcon } from "lucide-react";
//phone regex

export const phoneRegex = /^[6-9]\d{9}$/;


//query templates

export const queryTemplates = [
  {
    id: 1,
    icon: <CopyPlusIcon size={20} />,
    label: "All Patients",
    description: "Get all patient records",
    query: "SELECT * FROM patients LIMIT 50;",
  },
  {
    id: 2,
    icon: <CopyPlusIcon size={20} />,
    label: "Search by Name",
    description: "Find patients by name",
    query:
      "SELECT * FROM patients WHERE first_name LIKE '%John%' OR last_name LIKE '%Smith%';",
  },
  
  {
    id: 3,
        icon: <CopyPlusIcon size={20} />,

    label: "By Gender",
    description: "Filter patients by gender",
    query: "SELECT gender, COUNT(*) as count FROM patients GROUP BY gender;",
  },
  {
    id: 4,
        icon: <CopyPlusIcon size={20} />,

    label: "Health Summary",
    description: "Patients with health notes",
    query:
      "SELECT first_name, last_name, health_summary FROM patients WHERE health_summary IS NOT NULL AND health_summary != '';",
  },
 
];
