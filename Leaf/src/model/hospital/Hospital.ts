import MedicalUnit from "./MedicalUnit";
import Ward from "./Ward";

class Hospital {
    public readonly id: string;
    public readonly code: string;
    public readonly name: string;
    protected _wards: { [wardId: string]: Ward };
    protected _medicalUnits: { [medUnitId: string]: MedicalUnit };

    constructor(id: string, code: string, name: string) {
        this.id = id;
        this.code = code;
        this.name = name;
        this._wards = {};
        this._medicalUnits = {};
    }

    public addWard(wardId: string, ward: Ward) {
        // TODO: Add verification to check if the key already exists in the dictionary
        this._wards[wardId] = ward;
    }

    public addMedUnit(medUnitId: string, medicalUnit: MedicalUnit) {
        // TODO: Add verification to check if the key already exists in the dictionary
        this._medicalUnits[medUnitId] = medicalUnit;
    }

    public get wards(): { [wardId: string]: Ward } {
        return this._wards;
    }

    public get medUnits(): { [medUnitId: string]: MedicalUnit } {
        return this._medicalUnits;
    }

    public get wardsAsArray(): Ward[] {
        // Reads all values into an array and returns it
        // For displaying wards in a LeafListSelection
        const wardsArray = Object.keys(this._wards).map((key) => {
            return this._wards[key];
        });
        return wardsArray;
    }

    public get medUnitsAsArray(): MedicalUnit[] {
        // Reads all values into an array and returns it
        // For displaying medUnits in a LeafListSelection
        const medUnitArray = Object.keys(this._medicalUnits).map((key) => {
            return this._medicalUnits[key];
        });
        return medUnitArray;
    }

    public getWardFromId(wardId: string): Ward {
        return this._wards[wardId];
    }

    public getMedUnitFromId(medUnitId: string): MedicalUnit {
        return this._medicalUnits[medUnitId];
    }
}

export default Hospital;
