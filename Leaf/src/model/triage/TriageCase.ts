import Hospital from "../hospital/Hospital";
import MedicalUnit from "../hospital/MedicalUnit";
import { TriageCode } from "./TriageCode";
import UUID from "../core/UUID";
import Ward from "../hospital/Ward";

class TriageCase {

    public readonly id: UUID;
    private _arrivalDate: Date;
    private _dischargeDate: Date | null;
    private _arrivalWard: Ward;
    private _dischargeWard: Ward | null;
    private _hospital: Hospital;
    private _medicalUnit: MedicalUnit;
    private _triageText: string;
    private _triageCode: TriageCode;
    get arrivalDate(): Date {
        return this._arrivalDate;
    }
    get dischargeDate(): Date | null {
        return this._dischargeDate;
    }
    get arrivalWard(): Ward {
        return this._arrivalWard;
    }
    get dischargeWard(): Ward | null {
        return this._dischargeWard;
    }
    get hospital(): Hospital {
        return this._hospital;
    }
    get medicalUnit(): MedicalUnit {
        return this._medicalUnit;
    }
    get triageText(): string {
        return this._triageText;
    }
    get triageCode(): TriageCode {
        return this._triageCode;
    }

    constructor(
        arrivalDate: Date,
        arrivalWard: Ward,
        hospital: Hospital,
        medicalUnit: MedicalUnit,
        triageText: string,
        triageCode: TriageCode
    ) {
        this.id = UUID.generate();
        this._arrivalDate = arrivalDate;
        this._dischargeDate = null;
        this._arrivalWard = arrivalWard;
        this._dischargeWard = null;
        this._hospital = hospital;
        this._medicalUnit = medicalUnit;
        this._triageText = triageText;
        this._triageCode = triageCode;
    }

}

export default TriageCase;