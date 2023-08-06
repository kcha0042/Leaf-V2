import VStack from "../containers/VStack";
import DefaultScreenContainer from "./containers/DefaultScreenContainer";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import VGap from "../containers/layout/VGap";
import React, { useEffect } from "react";
import Patient from "../../model/patient/Patient";
import Session from "../../model/Session";
import StateManager from "../../state/publishers/StateManager";
import { FlatList, View } from "react-native";
import AllocateToNurseCard from "../custom/AllocatePatientToNurseCard";
import LeafDimensions from "../styling/LeafDimensions";
import LeafSearchBarNew from "../base/LeafSearchBar/LeafSearchBarNew";
import LeafSegmentedButtons from "../base/LeafSegmentedButtons/LeafSegmentedButtons";
import LeafSegmentedValue from "../base/LeafSegmentedButtons/LeafSegmentedValue";
import { strings } from "../../localisation/Strings";
import LeafButton from "../base/LeafButton/LeafButton";

interface Props {
    navigation?: NavigationProp<ParamListBase>;
}

const AllocateToNurseScreen: React.FC<Props> = ({ navigation }) => {
    const [patients, setPatients] = React.useState<Patient[]>(Session.inst.getAllPatients());

    useEffect(() => {
        StateManager.patientsFetched.subscribe(() => {
            setPatients(Session.inst.getAllPatients());
        });

        Session.inst.fetchAllPatients();
    }, []);

    const [segmentedValue, setSegmentedValue] = React.useState<LeafSegmentedValue | null>(null);
    const onSetSegmentedValue = (segmentedValue) => {
        // TODO: Filter patients by time of day
        setSegmentedValue(segmentedValue);
    }
    const [shouldShowTime,setShouldShowTime] = React.useState(false);
    const [shouldShowCode,setShouldShowCode] = React.useState(false);
    return (
        <DefaultScreenContainer>
            <VStack>
                <LeafSearchBarNew></LeafSearchBarNew>
                <VGap size={20} />
                <View>
                <LeafButton label={strings("searchBarFilter.time")} onPress={ () => setShouldShowTime(!shouldShowTime)} wide={false}></LeafButton>
                { shouldShowTime ? (<LeafSegmentedButtons label={strings("searchBarFilter.time")} options={ [new LeafSegmentedValue(0, "Morning"), new LeafSegmentedValue(1, "Noon"), new LeafSegmentedValue(2, "Afternoon"), new LeafSegmentedValue(3, "None")] } value={segmentedValue} onSetValue={setSegmentedValue} ></LeafSegmentedButtons>): null }
                <VGap size={20} />
                <LeafButton label={strings("searchBarFilter.triageCode")} onPress={ () => setShouldShowCode(!shouldShowCode)} wide={false}></LeafButton>
                { shouldShowCode ? (<LeafSegmentedButtons label={strings("searchBarFilter.triageCode")} options={ [new LeafSegmentedValue(0, "1"), new LeafSegmentedValue(1, "2"), new LeafSegmentedValue(2, "3"), new LeafSegmentedValue(3, "4"), new LeafSegmentedValue(4, "5")] } value={segmentedValue} onSetValue={setSegmentedValue} ></LeafSegmentedButtons>): null }
                </View>
                <VGap size={6} />
                
                <VGap size={20} />
                <FlatList
                    data={patients}
                    renderItem={({ item: patient }) => <AllocateToNurseCard patient={patient} />}
                    keyExtractor={(patient) => patient.mrn.toString()}
                    ItemSeparatorComponent={() => <VGap size={LeafDimensions.cardSpacing} />}
                    scrollEnabled={false}
                    // Don't use overflow prop - doesn't work on web
                    style={{
                        width: "100%",
                        overflow: "visible", // Stop shadows getting clipped
                        flexGrow: 0, // Ensures the frame wraps only the FlatList content
                    }}
                />
            </VStack>
        </DefaultScreenContainer>
    );
};

export default AllocateToNurseScreen;
