import { NavigationProp, ParamListBase } from "@react-navigation/native";
import React, { useEffect } from "react";
import { FlatList } from "react-native-gesture-handler";
import Patient from "../../model/patient/Patient";
import PatientEvent from "../../model/patient/PatientEvent";
import Session from "../../model/session/Session";
import StateManager from "../../state/publishers/StateManager";
import LeafSegmentedButtons from "../base/LeafSegmentedButtons/LeafSegmentedButtons";
import LeafSegmentedValue from "../base/LeafSegmentedButtons/LeafSegmentedValue";
import VStack from "../containers/VStack";
import Spacer from "../containers/layout/Spacer";
import VGap from "../containers/layout/VGap";
import PatientEventCard from "../custom/PatientEventCard";
import LeafDimensions from "../styling/LeafDimensions";
import DefaultScreenContainer from "./containers/DefaultScreenContainer";

interface Props {
    navigation?: NavigationProp<ParamListBase>;
}

interface MatchedPatientEvent {
    patientEvent: PatientEvent;
    patient: Patient;
}

const EventDashboardScreen: React.FC<Props> = ({ navigation }) => {
    const [patients, setPatients] = React.useState<Patient[]>(Session.inst.getAllocatedPatients());
    const [matchedPatientEvents, setMatchedPatientEvents] = React.useState<MatchedPatientEvent[]>([]);

    const filterValues = [new LeafSegmentedValue(true, "Remaining"), new LeafSegmentedValue(false, "All")];
    const [segmentedValue, setSegmentedValue] = React.useState<LeafSegmentedValue | undefined>(filterValues[0]);

    const onSetSegmentedValue = (segmentedValue: LeafSegmentedValue | undefined) => {
        setSegmentedValue(segmentedValue);
    };

    const getMatchedPatientEvents: () => MatchedPatientEvent[] = () => {
        // Collect all the patient events and their respective patient
        const allMatchedPatientEvents: MatchedPatientEvent[] = patients.flatMap((patient) =>
            patient.events.map((event) => ({ patientEvent: event, patient: patient })),
        );
        // Sort them by time (first to last)
        allMatchedPatientEvents.sort((a, b) => {
            return a.patientEvent.occursAfter(b.patientEvent.triggerTime) ? 1 : -1;
        });
        if (segmentedValue?.value ?? true) {
            // If we only want to see the remaining ones
            // Filter to show only ones that occur after now, or that are incomplete
            const now = new Date();
            return allMatchedPatientEvents.filter(
                (matched) => matched.patientEvent.occursAfter(now) || !matched.patientEvent.completedToday(),
            );
        }
        return allMatchedPatientEvents;
    };

    useEffect(() => {
        const unsubscribePatientFetch = StateManager.patientsFetched.subscribe(() => {
            setPatients(Session.inst.getAllocatedPatients());
        });

        const unsubscribePatientEventUpdate = StateManager.patientUpdated.subscribe(() => {
            // Update with local instances of patients
            setPatients(Session.inst.getAllocatedPatients());
            // Make fetch
            Session.inst.fetchAllocatedPatients();
        });

        Session.inst.fetchAllocatedPatients();

        return () => {
            unsubscribePatientFetch();
            unsubscribePatientEventUpdate();
        };
    }, []);

    useEffect(() => {
        setMatchedPatientEvents(getMatchedPatientEvents());
    }, [segmentedValue, patients]);

    return (
        <DefaultScreenContainer>
            <VStack
                spacing={LeafDimensions.screenSpacing}
                style={{
                    flex: 1,
                }}
            >
                <LeafSegmentedButtons
                    label={""}
                    labeled={false}
                    options={filterValues}
                    value={segmentedValue}
                    onSetValue={onSetSegmentedValue}
                    style={{
                        paddingBottom: 12,
                    }}
                    clearSelectionAllowed={false}
                />

                <FlatList
                    data={matchedPatientEvents}
                    renderItem={({ item: matched }) => (
                        <PatientEventCard
                            navigation={navigation}
                            patient={matched.patient}
                            event={matched.patientEvent}
                            onPress={() => {}}
                        />
                    )}
                    keyExtractor={(matched) => matched.patientEvent.id.toString()}
                    ItemSeparatorComponent={() => <VGap size={LeafDimensions.cardSpacing} />}
                    scrollEnabled={false}
                    style={{
                        width: "100%",
                        overflow: "visible", // Stop shadows getting clipped
                        flexGrow: 0, // Ensures the frame wraps only the FlatList content
                    }}
                />

                <Spacer />
            </VStack>
        </DefaultScreenContainer>
    );
};

export default EventDashboardScreen;
