import LeafInterface from "./LeafInterface";
import LeafStackRoot from "./LeafStackRoot";

export const WorkerInterface = new LeafInterface()
    .addRoot(
        new LeafStackRoot(
            "Home",
            () => {
                console.log("Hello?")
            },
            "home",
            "home-outline",
        )
    )
    .addRoot(
        new LeafStackRoot(
            "Triage",
            () => {
                console.log("Hello?")
            },
            "clipboard-account",
            "clipboard-outline"
        )
    )
    .addRoot(
        new LeafStackRoot(
            "Patients",
            () => {
                console.log("Hello?")
            },
            "account-injury",
            "account-injury-outline"
        )
    )
    .addRoot(
        new LeafStackRoot(
            "Account",
            () => {
                console.log("Hello?")
            },
            "account-circle",
            "account-circle-outline"
        )
    )