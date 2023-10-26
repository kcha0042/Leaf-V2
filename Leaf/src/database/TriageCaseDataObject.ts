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
        const hospitalId = data.getStringOrNull(TriageCaseField.HospitalID);
        const medicalUnitId = data.getStringOrNull(TriageCaseField.MedicalUnitID);
        const triageText = data.getStringOrNull(TriageCaseField.TriageText);
        const triageCode = data.getNumberOrNull(TriageCaseField.TriageCode);
        if (!id) {
            console.error("[TriageCaseDataObject] Failed to restore TriageCase id");
            return null;
        }
        if (!arrivalDate) {
            console.error("[TriageCaseDataObject] Failed to restore TriageCase arrivalDate");
            return null;
        }
        if (!arrivalWardId) {
            console.error("[TriageCaseDataObject] Failed to restore TriageCase arrivalWardId");
            return null;
        }
        if (!hospitalId) {
            console.error("[TriageCaseDataObject] Failed to restore TriageCase hospitalId");
            return null;
        }
        if (!medicalUnitId) {
            console.error("[TriageCaseDataObject] Failed to restore TriageCase medicalUnitId");
            return null;
        }
        if (!triageText) {
            console.error("[TriageCaseDataObject] Failed to restore TriageCase triageText");
            return null;
        }
        if (!triageCode) {
            console.error("[TriageCaseDataObject] Failed to restore TriageCase triageCode");
            return null;
        }        
        const arrivalWard = Hospitals[hospitalId]?.getWardFromId(arrivalWardId);
        const dischargeWard = dischargeWardId == null ? null : (Hospitals[hospitalId]?.getWardFromId(dischargeWardId) ?? null);
        const hosptial = Hospitals[hospitalId];
        const medicalUnit = Hospitals[hospitalId]?.getMedUnitFromId(medicalUnitId);
        if (!arrivalWard) {
            console.error("[TriageCaseDataObject] Failed to restore TriageCase arrivalWard");
            return null;
        }
        if (!hosptial) {
            console.error("[TriageCaseDataObject] Failed to restore TriageCase hosptial");
            return null;
        }
        if (!medicalUnit) {
            console.error("[TriageCaseDataObject] Failed to restore TriageCase medicalUnit");
            return null;
        }
        return new TriageCase(
            new UUID(id),
            arrivalDate,
            dischargeDate,
            arrivalWard,
            dischargeWard,
            hosptial,
            medicalUnit,
            triageText,
            new TriageCode(triageCode),
        );
    }
}

export default TriageCaseDataObject;
