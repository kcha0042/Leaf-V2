import Hospital from "../model/hospital/Hospital";

export const HospitalsArray = [
    new Hospital("H1", "AHS", "EHS Angliss"),
    new Hospital("H2", "BLK", "EHS Blackburn"),
    new Hospital("H3", "BHH", "EHS Box Hill"),
    new Hospital("H4", "HEA", "EHS Healesville"),
    new Hospital("H5", "MAR", "EHS Maroondah"),
    new Hospital("H6", "PJC", "EHS PJC"),
    new Hospital("H7", "WAN", "EHS Wantirna"),
    new Hospital("H8", "YRS", "EHS Yarra Ranges"),
];

export const Hospitals = HospitalsArray.reduce(
    (accumulator, hospital) => {
        accumulator[hospital.id] = hospital;
        return accumulator;
    },
    {} as Record<string, Hospital>,
);
