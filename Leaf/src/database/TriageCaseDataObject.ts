import UUID from "../model/core/UUID";
import TriageCase from "../model/triage/TriageCase";
import { TriageCode } from "../model/triage/TriageCode";
import { Hospitals } from "../preset_data/Hospitals";
import DataObject from "./DataObject";

export enum TriageCaseField {
    ID = "id",
    ArrivalDate = "arrivalDate",
    DischargeDate = "dischargeDate",
    ArrivalWardID = "arrivalWardId",
    DischargeWardID = "dischargeWardId",
    HospitalID = "hospitalId",
    MedicalUnitID = "medicalUnitId",
    TriageText = "triageText",
    TriageCode = "triageCode",
}

class TriageCaseDataObject {
    public static create(triageCase: TriageCase): DataObject {
        return new DataObject()
            .addString(TriageCaseField.ID, triageCase.id.toString())
            .addDate(TriageCaseField.ArrivalDate, triageCase.arrivalDate)
            .addDate(TriageCaseField.DischargeDate, triageCase.dischargeDate)
            .addString(TriageCaseField.ArrivalWardID, triageCase.arrivalWard.id.toString())
            .addString(TriageCaseField.DischargeWardID, triageCase.dischargeWard?.id?.toString())
            .addString(TriageCaseField.HospitalID, triageCase.hospital.id.toString())
            .addString(TriageCaseField.MedicalUnitID, triageCase.medicalUnit.id.toString())
            .addString(TriageCaseField.TriageText, triageCase.triageText)
            .addNumber(TriageCaseField.TriageCode, triageCase.triageCode.id);
    }

    public static restore(data: DataObject): TriageCase | null {
        const id = data.getStringOrNull(TriageCaseField.ID);
        const arrivalDate = data.getDateOrNull(TriageCaseField.ArrivalDate);
        const dischargeDate = data.getDateOrNull(TriageCaseField.DischargeDate);
        const arrivalWardId = data.getStringOrNull(TriageCaseField.ArrivalWardID);
        const dischargeWardId = data.getStringOrNull(TriageCaseField.DischargeWardID);
        const hosptialId = data.getStringOrNull(TriageCaseField.HospitalID);
        const medicalUnitId = data.getStringOrNull(TriageCaseField.MedicalUnitID);
        const triageText = data.getStringOrNull(TriageCaseField.TriageText);
        const triageCode = data.getNumberOrNull(TriageCaseField.TriageCode);
        if (!id || !arrivalDate || !arrivalWardId || !hosptialId || !medicalUnitId || !triageText || !triageCode) {
            console.error("[TriageCaseDataObject] Failed to restore TriageCase");
            return null;
        }
        return new TriageCase(
            new UUID(id),
            arrivalDate,
            dischargeDate,
            Hospitals[hosptialId].getWardFromId(arrivalWardId),
            dischargeWardId == null ? null : Hospitals[hosptialId].getWardFromId(dischargeWardId),
            Hospitals[hosptialId],
            Hospitals[hosptialId].getMedUnitFromId(medicalUnitId),
            triageText,
            new TriageCode(triageCode),
        );
    }
}

export default TriageCaseDataObject;
