import Patient from "../model/patient/Patient";
import DataObject from "./DataObject";

class PatientDataObject {
    public static create(patient: Patient): DataObject {
        const triageCaseData = new DataObject()
            .addString("id", patient.triageCase.id.toString())
            .addDate("arrivalDate", patient.triageCase.arrivalDate)
            .addDate("dischargeDate", patient.triageCase.dischargeDate)
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

    // public static restore(json: any): Patient {
    //     // TODO: Rebuild worker using this.data.getString() etc.
    // }
}

export default PatientDataObject;
