import EmployeeID from "../model/employee/EmployeeID";
import MRN from "../model/patient/MRN";
import Patient from "../model/patient/Patient";
import { PatientSex } from "../model/patient/PatientSex";
import DataObject from "./DataObject";
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
}

class PatientDataObject {
    public static create(patient: Patient): DataObject {
        const triageCaseData = TriageCaseDataObject.create(patient.triageCase);

        const patientEvents: DataObject[] = patient.events.map((event) => {
            return PatientEventDataObject.create(event);
        });

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
            .addObjectArray(PatientField.Events, patientEvents);
    }

    public static restore(data: DataObject): Patient {
        const mrn = data.getString(PatientField.MRN);
        const dob = data.getDate(PatientField.DOB);
        const firstName = data.getString(PatientField.FirstName);
        const lastName = data.getString(PatientField.LastName);
        const sex = data.getString(PatientField.Sex);
        const phoneNumber = data.getString(PatientField.PhoneNumber);
        const triageCaseData = data.getDataObject(PatientField.TriageCase);
        const postCode = data.getString(PatientField.PostCode);
        const timeLastAllocated = data.getDate(PatientField.TimeLastAllocated);
        const idAllocatedTo = data.getString(PatientField.IDAllocatedTo);
        const eventsData = data.getDataObjectArray(PatientField.Events);
        return new Patient(
            new MRN(mrn),
            dob,
            firstName,
            lastName,
            new PatientSex(sex),
            phoneNumber,
            TriageCaseDataObject.restore(triageCaseData),
            postCode,
            timeLastAllocated,
            new EmployeeID(idAllocatedTo),
            eventsData.map((data) => PatientEventDataObject.restore(data)),
        );
    }
}

export default PatientDataObject;
