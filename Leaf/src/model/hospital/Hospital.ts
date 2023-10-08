import MedicalUnit from "./MedicalUnit";
import Ward from "./Ward";

class Hospital {
    public readonly id: string;
    public readonly code: string;
    public readonly name: string;
    protected _wards: Array<Ward>;
    protected _medicalUnits: Array<MedicalUnit>;

    constructor(id: string, code: string, name: string) {
        this.id = id;
        this.code = code;
        this.name = name;
        this._wards = new Array<Ward>;
        this._medicalUnits = new Array<MedicalUnit>;
    }

    public addWard(ward: Ward) {
        this._wards.push(ward);
    }

    public addMedUnit(medicalUnit: MedicalUnit) {
        this._medicalUnits.push(medicalUnit);
    }

    public get wards(): Array<Ward> {
        return this._wards;
    }

    public get medUnits(): Array<MedicalUnit> {
        return this._medicalUnits
    }

    public getWardFromId(wardId: string): Ward {
        return this._wards[+wardId];
    }

    public getMedUnitFromId(medUnitId: string): MedicalUnit {
        return this._medicalUnits[+medUnitId];
    }
}

export default Hospital;
