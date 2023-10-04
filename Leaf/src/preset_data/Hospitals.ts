import Hospital from "../model/hospital/Hospital";

export const HospitalsArray = [
    new Hospital("H1", "STA", "St Care A"),
    new Hospital("H2", "STB", "St Care B"),
];

export const Hospitals = HospitalsArray.reduce(
    (accumulator, hospital) => {
        accumulator[hospital.id] = hospital;
        return accumulator;
    },
    {} as Record<string, Hospital>,
);
