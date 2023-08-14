import UUID from "../model/core/UUID";
import TriageCase from "../model/triage/TriageCase";
import { TriageCode } from "../model/triage/TriageCode";
import { Hospitals } from "../preset_data/Hospitals";
import { MedicalUnits } from "../preset_data/MedicalUnits";
import { Wards } from "../preset_data/Wards";
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

    public static restore(data: DataObject): TriageCase {
        const id = data.getString(TriageCaseField.ID);
        const arrivalDate = data.getDate(TriageCaseField.ArrivalDate);
        const dischargeDate = data.getDate(TriageCaseField.DischargeDate);
        const arrivalWardId = data.getString(TriageCaseField.ArrivalWardID);
        const dischargeWardId = data.getString(TriageCaseField.DischargeWardID);
        const hosptialId = data.getString(TriageCaseField.HospitalID);
        const medicalUnitId = data.getString(TriageCaseField.MedicalUnitID);
        const triageText = data.getString(TriageCaseField.TriageText);
        const traigeCode = data.getNumber(TriageCaseField.TriageCode);
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
}

export default TriageCaseDataObject;
