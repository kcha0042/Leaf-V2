import { compactMap } from "../language/functions/CompactMap";
import EmployeeID from "../model/employee/EmployeeID";
import MRN from "../model/patient/MRN";
import Patient from "../model/patient/Patient";
import { PatientSex } from "../model/patient/PatientSex";
import DataObject from "./DataObject";
import PatientChangelogDataObject from "./PatientChangelogDataObject";
import PatientEventDataObject from "./PatientEventDataObject";
import TriageCaseDataObject from "./TriageCaseDataObject";

export enum PatientField {
    MRN = "mrn",
    DOB = "dob",
    FirstName = "firstName",
    LastName = "lastName",
    Sex = "sex",
    PhoneNumber = "phoneNumber",
    TriageCase = "triageCase",
    PostCode = "postCode",
    TimeLastAllocated = "timeLastAllocated",
    IDAllocatedTo = "idAllocatedTo",
    Events = "events",
    Changelog = "changelog",
}

class PatientDataObject {
    public static create(patient: Patient): DataObject {
        const triageCaseData = TriageCaseDataObject.create(patient.triageCase);

        const patientEventsData: DataObject[] = patient.events.map((event) => {
            return PatientEventDataObject.create(event);
        });

        const patientChangelogData = PatientChangelogDataObject.create(patient.changelog);

        return new DataObject()
            .addString(PatientField.MRN, patient.mrn.toString())
            .addDate(PatientField.DOB, patient.dob)
            .addString(PatientField.FirstName, patient.firstName)
            .addString(PatientField.LastName, patient.lastName)
            .addString(PatientField.Sex, patient.sex.id)
            .addString(PatientField.PhoneNumber, patient.phoneNumber)
            .addObject(PatientField.TriageCase, triageCaseData)
            .addString(PatientField.PostCode, patient.postCode)
            .addDate(PatientField.TimeLastAllocated, patient.timeLastAllocated)
            .addString(PatientField.IDAllocatedTo, patient.idAllocatedTo.toString())
            .addObjectArray(PatientField.Events, patientEventsData)
            .addObject(PatientField.Changelog, patientChangelogData);
    }

    public static restore(data: DataObject): Patient | null {
        const mrn = data.getStringOrNull(PatientField.MRN);
        const dob = data.getDateOrNull(PatientField.DOB);
        const firstName = data.getStringOrNull(PatientField.FirstName);
        const lastName = data.getStringOrNull(PatientField.LastName);
        const sex = data.getStringOrNull(PatientField.Sex);
        const phoneNumber = data.getStringOrNull(PatientField.PhoneNumber);
        const triageCaseData = data.getDataObject(PatientField.TriageCase);
        const changelogData = data.getDataObject(PatientField.Changelog);
        const postCode = data.getStringOrNull(PatientField.PostCode);
        const timeLastAllocated = data.getDateOrNull(PatientField.TimeLastAllocated);
        const idAllocatedTo = data.getStringOrNull(PatientField.IDAllocatedTo);
        const eventsData = data.getDataObjectArray(PatientField.Events);
        const restoredTriage = TriageCaseDataObject.restore(triageCaseData);
        const restoredChangelog = PatientChangelogDataObject.restore(changelogData);
        if (
            !mrn ||
            !dob ||
            !firstName ||
            !lastName ||
            !sex ||
            !phoneNumber ||
            !postCode ||
            !timeLastAllocated ||
            !idAllocatedTo ||
            !restoredTriage ||
            !restoredChangelog
        ) {
            console.error("[PatientDataObject] Failed to restore Patient " + (mrn ?? "(missing MRN!!!)"));
            return null;
        }
        return new Patient(
            new MRN(mrn),
            dob,
            firstName,
            lastName,
            new PatientSex(sex),
            phoneNumber,
            restoredTriage,
            postCode,
            timeLastAllocated,
            new EmployeeID(idAllocatedTo),
            compactMap(eventsData, (data) => PatientEventDataObject.restore(data)),
            restoredChangelog,
        );
    }
}

export default PatientDataObject;
