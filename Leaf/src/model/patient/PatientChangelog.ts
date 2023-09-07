import { strings } from "../../localisation/Strings";
import UUID from "../core/UUID";
import Employee from "../employee/Employee";
import EmployeeID from "../employee/EmployeeID";
import Leader from "../employee/Leader";
import Worker from "../employee/Worker";
import ChangelogPoint from "./ChangelogPoint";
import MRN from "./MRN";
import PatientEvent from "./PatientEvent";

class PatientChangelog {
    private _creationDate: Date;
    private _eventCreations: { date: Date; eventID: UUID; nurseID: EmployeeID }[];
    private _eventCompletions: { date: Date; eventID: UUID; nurseID: EmployeeID; completed: boolean }[];
    private _allocations: { date: Date; employeeID: EmployeeID; nurseID: EmployeeID }[];
    private _edits: { date: Date; nurseID: EmployeeID }[];
    get creationDate(): Date {
        return this._creationDate;
    }
    get eventCreations(): { date: Date; eventID: UUID; nurseID: EmployeeID }[] {
        return this._eventCreations;
    }
    get eventCompletions(): { date: Date; eventID: UUID; nurseID: EmployeeID; completed: boolean }[] {
        return this._eventCompletions;
    }
    get allocations(): { date: Date; employeeID: EmployeeID; nurseID: EmployeeID }[] {
        return this._allocations;
    }
    get edits(): { date: Date; nurseID: EmployeeID }[] {
        return this._edits;
    }

    constructor(
        creationDate: Date,
        eventCreations: { date: Date; eventID: UUID; nurseID: EmployeeID }[],
        eventCompletions: { date: Date; eventID: UUID; nurseID: EmployeeID; completed: boolean }[],
        allocations: { date: Date; employeeID: EmployeeID; nurseID: EmployeeID }[],
        edits: { date: Date; nurseID: EmployeeID }[],
    ) {
        this._creationDate = creationDate;
        this._eventCreations = eventCreations;
        this._eventCompletions = eventCompletions;
        this._allocations = allocations;
        this._edits = edits;
    }

    public static new() {
        return new PatientChangelog(new Date(), [], [], [], []);
    }

    /**
     * NOTE:
     * All logs should occur in Session - just to keep things organised
     */

    public logEventCreation(eventID: UUID, nurseID: EmployeeID) {
        this.eventCreations.push({ date: new Date(), eventID: eventID, nurseID: nurseID });
    }

    public logEventCompletion(eventID: UUID, nurseID: EmployeeID, completed: boolean) {
        this._eventCompletions.push({ date: new Date(), eventID: eventID, nurseID: nurseID, completed: completed });
    }

    public logAllocation(employeeID: EmployeeID, nurseID: EmployeeID) {
        this._allocations.push({ date: new Date(), employeeID: employeeID, nurseID: nurseID });
    }

    public logEdit(nurseID: EmployeeID) {
        this._edits.push({ date: new Date(), nurseID: nurseID });
    }

    public async generateTimeline(
        patientEvents: PatientEvent[],
        nurses: { [key: string]: Worker },
        leaders: { [key: string]: Leader },
    ): Promise<ChangelogPoint[]> {
        const patientEventsDict = this.formPatientEventDict(patientEvents);
        const allPoints: ChangelogPoint[] = [
            this.generateCreationDatePoint(),
            ...this.generateEventCreationsPoints(patientEventsDict, nurses),
            ...this.generateEventCompletionsPoints(patientEventsDict, nurses),
            ...this.generateAllocationsPoints(nurses, leaders),
            ...this.generateEditsPoints(nurses),
        ];
        // Sort the array by date from earliest to latest
        allPoints.sort((a, b) => a.date.getTime() - b.date.getTime());
        return allPoints;
    }

    private generateCreationDatePoint(): ChangelogPoint {
        return ChangelogPoint.new(this._creationDate, strings("changelog.creation"));
    }

    private generateEventCreationsPoints(
        patientEvents: { [key: string]: PatientEvent },
        nurses: { [key: string]: Worker },
    ): ChangelogPoint[] {
        return this._eventCreations
            .map((eventCreation) => {
                const patientEvent = patientEvents[eventCreation.eventID.toString()];
                if (!patientEvent) {
                    return null;
                }
                const nurse = nurses[eventCreation.nurseID.toString()];
                if (!nurse) {
                    return null;
                }
                return ChangelogPoint.new(
                    eventCreation.date,
                    strings("changelog.eventCreation3Param", patientEvent.title, nurse.fullName, nurse.id.toString()),
                );
            })
            .filter((point) => point !== null) as ChangelogPoint[];
    }

    private generateEventCompletionsPoints(
        patientEvents: { [key: string]: PatientEvent },
        nurses: { [key: string]: Worker },
    ): ChangelogPoint[] {
        return this._eventCompletions
            .map((eventCompletion) => {
                const patientEvent = patientEvents[eventCompletion.eventID.toString()];
                if (!patientEvent) {
                    return null;
                }
                const nurse = nurses[eventCompletion.nurseID.toString()];
                if (!nurse) {
                    return null;
                }
                if (eventCompletion.completed) {
                    return ChangelogPoint.new(
                        eventCompletion.date,
                        strings(
                            "changelog.eventCompletion3Param",
                            patientEvent.title,
                            nurse.fullName,
                            nurse.id.toString(),
                        ),
                    );
                } else {
                    return ChangelogPoint.new(
                        eventCompletion.date,
                        strings(
                            "changelog.eventIncompletion3Param",
                            patientEvent.title,
                            nurse.fullName,
                            nurse.id.toString(),
                        ),
                    );
                }
            })
            .filter((point) => point !== null) as ChangelogPoint[];
    }

    private generateAllocationsPoints(
        nurses: { [key: string]: Worker },
        leaders: { [key: string]: Leader },
    ): ChangelogPoint[] {
        return this._allocations
            .map((allocation) => {
                let allocatedBy: Employee = nurses[allocation.employeeID.toString()];
                if (!allocatedBy) {
                    allocatedBy = leaders[allocation.employeeID.toString()];
                }
                if (!allocatedBy) {
                    return null;
                }
                const nurse = nurses[allocation.nurseID.toString()];
                if (!nurse) {
                    return null;
                }
                return ChangelogPoint.new(
                    allocation.date,
                    strings(
                        "changelog.allocation4Param",
                        allocatedBy.fullName,
                        allocatedBy.id.toString(),
                        nurse.fullName,
                        nurse.id.toString(),
                    ),
                );
            })
            .filter((point) => point !== null) as ChangelogPoint[];
    }

    private generateEditsPoints(nurses: { [key: string]: Worker }): ChangelogPoint[] {
        return this._edits
            .map((edit) => {
                const nurse = nurses[edit.nurseID.toString()];
                if (!nurse) {
                    return null;
                }
                return ChangelogPoint.new(
                    edit.date,
                    strings("changelog.edit2Param", nurse.fullName, nurse.id.toString()),
                );
            })
            .filter((point) => point !== null) as ChangelogPoint[];
    }

    private formPatientEventDict(patientEvents: PatientEvent[]): { [key: string]: PatientEvent } {
        return patientEvents.reduce<Record<string, PatientEvent>>((acc, event) => {
            acc[event.id.toString()] = event;
            return acc;
        }, {});
    }
}

export default PatientChangelog;
