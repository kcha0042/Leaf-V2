import Hospital from "../hospital/Hospital";
import MedicalUnit from "../hospital/MedicalUnit";
import { TriageCode } from "./TriageCode";
import UUID from "../core/UUID";
import Ward from "../hospital/Ward";

class TriageCase {
    public readonly id: UUID;
    protected _arrivalDate: Date;
    protected _dischargeDate: Date | null;
    protected _arrivalWard: Ward;
    protected _dischargeWard: Ward | null;
    protected _hospital: Hospital;
    protected _medicalUnit: MedicalUnit;
    protected _triageText: string;
    protected _triageCode: TriageCode;
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
        id: UUID,
        arrivalDate: Date,
        dischargeDate: Date | null,
        arrivalWard: Ward,
        dischargeWard: Ward | null,
        hospital: Hospital,
        medicalUnit: MedicalUnit,
        triageText: string,
        triageCode: TriageCode,
    ) {
        this.id = id;
        this._arrivalDate = arrivalDate;
        this._dischargeDate = dischargeDate;
        this._arrivalWard = arrivalWard;
        this._dischargeWard = dischargeWard;
        this._hospital = hospital;
        this._medicalUnit = medicalUnit;
        this._triageText = triageText;
        this._triageCode = triageCode;
    }

    public static new(
        arrivalWard: Ward,
        hospital: Hospital,
        medicalUnit: MedicalUnit,
        triageText: string,
        triageCode: TriageCode,
    ): TriageCase {
        return new TriageCase(
            UUID.generate(),
            new Date(),
            null,
            arrivalWard,
            null,
            hospital,
            medicalUnit,
            triageText,
            triageCode,
        );
    }
}

export default TriageCase;
