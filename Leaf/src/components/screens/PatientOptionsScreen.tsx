import { NavigationProp, ParamListBase } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { strings } from "../../localisation/Strings";
import Session from "../../model/session/Session";
import StateManager from "../../state/publishers/StateManager";
import HStack from "../containers/HStack";
import VStack from "../containers/VStack";
import LargeMenuButton from "../custom/LargeMenuButton";
import NavigationSession from "../navigation/state/NavigationEnvironment";
import LeafDimensions from "../styling/LeafDimensions";
import ActionsScreen from "./ActionsScreen";
import NewTriageScreen from "./NewTriageScreen";
import PatientPreviewScreen from "./PatientPreviewScreen";
import DefaultScreenContainer from "./containers/DefaultScreenContainer";
import AddEventScreen from "./AddEventScreen";

interface Props {
    navigation?: NavigationProp<ParamListBase>;
}

const PatientOptionsScreen: React.FC<Props> = ({ navigation }) => {
    const [componentWidth, setComponentWidth] = useState(StateManager.contentWidth.read());
    const buttonSpacing = LeafDimensions.screenPadding;
    let columnCount = componentWidth < 520 ? 2 : 3;
    if (componentWidth < 365) {
        columnCount = 1;
    }
    const buttonWidth = (componentWidth - (columnCount - 1) * buttonSpacing) / columnCount;

    useEffect(() => {
        const unsubscribe = StateManager.contentWidth.subscribe(() => {
            setComponentWidth(StateManager.contentWidth.read());
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <DefaultScreenContainer>
            <VStack
                spacing={LeafDimensions.screenSpacing}
                style={{
                    flex: 1,
                    flexWrap: "nowrap",
                }}
            >
                <HStack spacing={buttonSpacing}>
                    <LargeMenuButton
                        size={buttonWidth}
                        label={strings("button.viewPatient")}
                        description={strings("label.viewPatient")}
                        onPress={() => {
                            const patient = Session.inst.getActivePatient();
                            if (!patient) {
                                // We've lost the active patient - bail!
                                NavigationSession.inst.navigateBack(navigation);
                                return;
                            }
                            NavigationSession.inst.navigateTo(
                                PatientPreviewScreen,
                                navigation,
                                strings("header.worker.view1Param", patient.fullName),
                            );
                        }}
                        icon="account-eye"
                    />

                    <LargeMenuButton
                        size={buttonWidth}
                        label={strings("button.patientActions")}
                        description={strings("label.patientActions")}
                        onPress={() => {
                            const patient = Session.inst.getActivePatient();
                            if (!patient) {
                                // We've lost the active patient - bail!
                                NavigationSession.inst.navigateBack(navigation);
                                return;
                            }
                            NavigationSession.inst.navigateTo(
                                ActionsScreen,
                                navigation,
                                strings("header.worker.actions1Param", patient.triageCase.triageCode.toString()),
                            );
                        }}
                        icon="exclamation-thick"
                    />

                    <LargeMenuButton
                        size={buttonWidth}
                        label={strings("button.editPatient")}
                        description={strings("label.editPatient")}
                        onPress={() => {
                            const patient = Session.inst.getActivePatient();
                            if (!patient) {
                                // We've lost the active patient - bail!
                                NavigationSession.inst.navigateBack(navigation);
                                return;
                            }
                            NavigationSession.inst.navigateTo(
                                NewTriageScreen,
                                navigation,
                                strings("header.worker.edit1Param", patient.fullName),
                            );
                        }}
                        icon="clipboard-edit"
                    />

                    <LargeMenuButton
                        size={buttonWidth}
                        label={strings("button.deletePatient")}
                        description={strings("label.removePatient")}
                        onPress={() => {
                            // TODO: Delete patient, then navigate back when activePatient is none
                            // TODO: Remember to remove the deleted patient from the cache
                        }}
                        icon="delete"
                    />

                    <LargeMenuButton
                        size={buttonWidth}
                        label={strings("button.addEvent")}
                        description={strings("label.addEvent")}
                        onPress={() => {
                            NavigationSession.inst.navigateTo(
                                AddEventScreen,
                                navigation,
                                strings("header.worker.addEvent"),
                            );
                        }}
                        icon="calendar-clock"
                    />

                    <LargeMenuButton
                        size={buttonWidth}
                        label={strings("button.done")}
                        description={strings("label.done")}
                        onPress={() => {
                            NavigationSession.inst.navigateBack(navigation);
                        }}
                        icon="exit-to-app"
                    />
                </HStack>
            </VStack>
        </DefaultScreenContainer>
    );
};

export default PatientOptionsScreen;
