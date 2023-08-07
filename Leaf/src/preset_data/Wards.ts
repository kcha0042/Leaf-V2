import Ward from "../model/hospital/Ward";

// TODO: Populate with the actual wards
export const Wards = [
    new Ward("W1", "Red Ward"),
    new Ward("W2", "Blue Ward"),
    new Ward("W3", "Green Ward"),
    new Ward("W4", "Orange Ward"),
].reduce(
    (accumulator, ward) => {
        accumulator[ward.id] = ward;
        return accumulator;
    },
    {} as Record<string, Ward>,
);
