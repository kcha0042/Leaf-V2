import { MedicalUnits } from "./../preset_data/MedicalUnits";
import { Hospitals } from "./../preset_data/Hospitals";
import UUID from "../model/core/UUID";
import MRN from "../model/patient/MRN";
import Patient from "../model/patient/Patient";
import PatientEvent from "../model/patient/PatientEvent";
import TriageCase from "../model/triage/TriageCase";
import { TriageCode } from "../model/triage/TriageCode";
import { Wards } from "../preset_data/Wards";
import DataObject from "./DataObject";
import { PatientEventCategory } from "../model/patient/PatientEventCategory";
import { PatientSex } from "../model/patient/PatientSex";
import EmployeeID from "../model/employee/EmployeeID";

class PatientDataObject {
    public static create(patient: Patient): DataObject {
        const triageCaseData = new DataObject()
            .addString("id", patient.triageCase.id.toString())
            .addDate("arrivalDate", patient.triageCase.arrivalDate)
            .addDate("dischargeDate", patient.triageCase.dischargeDate)
            .addString("arrivalWardId", patient.triageCase.arrivalWard.id.toString())
            .addString("dischargeWardId", patient.triageCase.dischargeWard?.id?.toString())
            .addString("hospitalId", patient.triageCase.hospital.id.toString())
            .addString("medicalUnitId", patient.triageCase.medicalUnit.id.toString())
            .addString("triageText", patient.triageCase.triageText)
            .addNumber("triageCode", patient.triageCase.triageCode.id);

        const patientEvents: DataObject[] = patient.events.map((event) => {
            return new DataObject()
                .addString("id", event.id.toString())
                .addDate("triggerTime", event.triggerTime)
                .addString("title", event.title)
                .addString("description", event.description)
                .addString("category", event.category.id);
        });

        return new DataObject()
            .addString("mrn", patient.mrn.toString())
            .addDate("dob", patient.dob)
            .addString("firstName", patient.firstName)
            .addString("lastName", patient.lastName)
            .addString("sex", patient.sex.id)
            .addString("phoneNumber", patient.phoneNumber)
            .addObject("triageCase", triageCaseData)
            .addString("postCode", patient.postCode)
            .addDate("timeLastAllocated", patient.timeLastAllocated)
            .addString("idAllocatedTo", patient.idAllocatedTo.toString())
            .addObjectArray("events", patientEvents);
    }

    public static restore(data: DataObject): Patient {
        const mrn = data.getString("mrn");
        const dob = data.getDate("dob");
        const firstName = data.getString("firstName");
        const lastName = data.getString("lastName");
        const sex = data.getString("sex");
        const phoneNumber = data.getString("phoneNumber");
        const triageCaseData = data.getDataObject("triageCase");
        const postCode = data.getString("postCode");
        const timeLastAllocated = data.getDate("timeLastAllocated");
        const idAllocatedTo = data.getString("idAllocatedTo");
        const eventsData = data.getDataObjectArray("events");
        return new Patient(
            new MRN(mrn),
            dob,
            firstName,
            lastName,
            new PatientSex(sex),
            phoneNumber,
            PatientDataObject.restoreTriageCase(triageCaseData),
            postCode,
            timeLastAllocated,
            new EmployeeID(idAllocatedTo),
            eventsData.map((data) => PatientDataObject.restoreEvent(data)),
        );
    }

    private static restoreTriageCase(data: DataObject): TriageCase {
        const id = data.getString("id");
        const arrivalDate = data.getDate("arrivalDate");
        const dischargeDate = data.getDate("dischargeDate");
        const arrivalWardId = data.getString("arrivalWardId");
        const dischargeWardId = data.getString("dischargeWardId");
        const hosptialId = data.getString("hospitalId");
        const medicalUnitId = data.getString("medicalUnitId");
        const triageText = data.getString("triageText");
        const traigeCode = data.getNumber("triageCode");
        return new TriageCase(
            new UUID(id),
            arrivalDate,
            dischargeDate,
            Wards[arrivalWardId],
            Wards[dischargeWardId],
            Hospitals[hosptialId],
            MedicalUnits[medicalUnitId],
            triageText,
            new TriageCode(traigeCode),
        );
    }

    private static restoreEvent(data: DataObject): PatientEvent {
        const id = data.getString("id");
        const triggerTime = data.getDate("triggerTime");
        const title = data.getString("title");
        const description = data.getString("description");
        const category = data.getString("category");
        return new PatientEvent(new UUID(id), triggerTime, title, description, new PatientEventCategory(category));
    }
}

export default PatientDataObject;
