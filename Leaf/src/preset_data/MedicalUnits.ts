import MedicalUnit from "../model/hospital/MedicalUnit";

// TODO: Populate with actual medical units
export const MedicalUnits = [
    new MedicalUnit("M1", "Medical Unit 1"),
    new MedicalUnit("M2", "Medical Unit 2"),
    new MedicalUnit("M3", "Medical Unit 3"),
    new MedicalUnit("M4", "Medical Unit 4"),
].reduce(
    (accumulator, ward) => {
        accumulator[ward.id] = ward;
        return accumulator;
    },
    {} as Record<string, MedicalUnit>,
);
