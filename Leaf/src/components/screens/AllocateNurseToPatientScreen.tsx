import VStack from "../containers/VStack";
import DefaultScreenContainer from "./containers/DefaultScreenContainer";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import VGap from "../containers/layout/VGap";
import React, { useEffect } from "react";
import Patient from "../../model/patient/Patient";
import Session from "../../model/Session";
import StateManager from "../../state/publishers/StateManager";
import { FlatList } from "react-native";
import PatientAllocationCard from "../custom/PatientAllocationCard";
import LeafDimensions from "../styling/LeafDimensions";
import LeafSearchBarNew from "../base/LeafSearchBar/LeafSearchBarNew";
import LeafSegmentedButtons from "../base/LeafSegmentedButtons/LeafSegmentedButtons";
import LeafSegmentedValue from "../base/LeafSegmentedButtons/LeafSegmentedValue";
import { strings } from "../../localisation/Strings";
import LeafButton from "../base/LeafButton/LeafButton";
import HStack from "../containers/HStack";
import HGap from "../containers/layout/HGap";
import LeafTypography from "../styling/LeafTypography";
import { LeafButtonType } from "../base/LeafButton/LeafButtonType";
import LeafColors from "../styling/LeafColors";

interface Props {
    navigation?: NavigationProp<ParamListBase>;
}

const AllocateNurseToPatientScreen: React.FC<Props> = ({ navigation }) => {
    const [patients, setPatients] = React.useState<Patient[]>(Session.inst.getAllPatients());
    const [searchQuery, setSearchQuery] = React.useState("");
    const onSearch = (query: string) => {
        setSearchQuery(query);
    };

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
    };
    const [shouldShowTime, setShouldShowTime] = React.useState(false);
    const [shouldShowCode, setShouldShowCode] = React.useState(false);

    return (
        <DefaultScreenContainer>
            <VStack>
                <LeafSearchBarNew onTextChange={onSearch} />

                <VGap size={20} />

                <HStack>
                    <LeafButton
                        label={strings("searchBarFilter.time")}
                        onPress={() => setShouldShowTime(!shouldShowTime)}
                        typography={LeafTypography.buttonSmall}
                        type={LeafButtonType.Filled}
                        color={LeafColors.transparent}
                        wide={false}
                        style={{
                            alignSelf: "center",
                            borderRadius: 15,
                            marginRight: 1,
                            borderWidth: 1,
                            borderColor: "#3f4169",
                        }}
                    ></LeafButton>

                    <HGap size={6} />

                    <LeafButton
                        label={strings("searchBarFilter.triageCode")}
                        onPress={() => setShouldShowCode(!shouldShowCode)}
                        typography={LeafTypography.buttonSmall}
                        type={LeafButtonType.Filled}
                        color={LeafColors.transparent}
                        wide={false}
                        style={{
                            alignSelf: "center",
                            borderRadius: 15,
                            marginRight: 1,
                            borderWidth: 1,
                            borderColor: "#3f4169",
                        }}
                    ></LeafButton>
                </HStack>

                <VStack>
                    <VGap size={6} />

                    {shouldShowTime ? (
                        <LeafSegmentedButtons
                            label={strings("searchBarFilter.time")}
                            options={[
                                new LeafSegmentedValue(0, "Morning"),
                                new LeafSegmentedValue(1, "Noon"),
                                new LeafSegmentedValue(2, "Afternoon"),
                                new LeafSegmentedValue(3, "None"),
                            ]}
                            value={segmentedValue}
                            onSetValue={setSegmentedValue}
                        ></LeafSegmentedButtons>
                    ) : null}

                    <VGap size={6} />

                    {shouldShowCode ? (
                        <LeafSegmentedButtons
                            label={strings("searchBarFilter.triageCode")}
                            options={[
                                new LeafSegmentedValue(0, "1"),
                                new LeafSegmentedValue(1, "2"),
                                new LeafSegmentedValue(2, "3"),
                                new LeafSegmentedValue(3, "4"),
                                new LeafSegmentedValue(4, "5"),
                            ]}
                            value={segmentedValue}
                            onSetValue={setSegmentedValue}
                        ></LeafSegmentedButtons>
                    ) : null}
                </VStack>

                <VGap size={20} />

                <FlatList
                    data={patients}
                    renderItem={({ item: patient }) => <PatientAllocationCard patient={patient} />}
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

export default AllocateNurseToPatientScreen;
