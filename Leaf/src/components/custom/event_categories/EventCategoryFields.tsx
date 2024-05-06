import { PatientEventCategories } from "../../../model/patient/PatientEventCategory";

export let EventCategoryFields: { [key in PatientEventCategories]: any} = {
  [PatientEventCategories.DRUG_EXPOSURE]: {
    "Drug Name": "string",
    "Drug Dose": "number",
    "Drug Exposure Start Date": "date",
  },
  [PatientEventCategories.VISIT_OCCURRENCE]: {
    "Visit Type": "visitType",
    "Visit Start Date": "date",
    "Visit End Date": "date",
    "Hospital": "hospital",
  },
  [PatientEventCategories.CONDITION_OCCURRENCE]: {
    "Condition Name": "string",
    "Condition Start Date": "date",
  },
  [PatientEventCategories.PROCEDURE_OCCURRENCE]: {
    "Procedure Type": "string",
    "Procedure Date": "date",
    "Provider": "provider",
  },
  [PatientEventCategories.DEVICE_EXPOSURE]: {
    "Device": "string",
    "Device Exposure Start Date": "date",
    "Provider": "provider",
  },
  [PatientEventCategories.MEASUREMENT]: {
    "Value as Number": "number",
    "Unit": "string",
    "Provider": "provider",
  },
  [PatientEventCategories.OBSERVATION]: {},
  [PatientEventCategories.EPISODE]: {},
  [PatientEventCategories.NOTE]: {},
}
