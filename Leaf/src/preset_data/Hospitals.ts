import Hospital from "../model/hospital/Hospital";

// TODO: Populate with the actual hospitals
export const Hospitals = [
    new Hospital("H1", "Cherry Hospital"),
    new Hospital("H2", "Strawberry Hospital"),
    new Hospital("H3", "Grape Hospital"),
    new Hospital("H4", "Apple Hospital"),
].reduce(
    (accumulator, ward) => {
        accumulator[ward.id] = ward;
        return accumulator;
    },
    {} as Record<string, Hospital>,
);
