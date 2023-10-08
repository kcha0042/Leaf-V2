// Make this a component with a label that receives the list and all that jazz and handles
// all the state management and navigation and stuff
// and has params also for the callback and such which reads the Manager value and if not null makes the callback
// and also this updates with the selected value automatically

import { NavigationProp, ParamListBase } from "@react-navigation/native";
import LeafSelectionItem from "./LeafSelectionItem";
import { ViewStyle } from "react-native";
import FlatContainer from "../../containers/FlatContainer";
import HStack from "../../containers/HStack";
import LeafText from "../LeafText/LeafText";
import LeafTypography from "../../styling/LeafTypography";
import VStack from "../../containers/VStack";
import LeafIcon from "../LeafIcon/LeafIcon";
import { LeafIconSize } from "../LeafIcon/LeafIconSize";
import LeafColors from "../../styling/LeafColors";
import Spacer from "../../containers/layout/Spacer";
import NavigationSession from "../../navigation/state/NavigationEnvironment";
import LeafListSelection from "./LeafListSelection";
import LeafListSelectionManager from "./LeafListSelectionManager";
import { strings } from "../../../localisation/Strings";
import { useEffect } from "react";
import StateManager from "../../../state/publishers/StateManager";

interface Props<T> {
    navigation?: NavigationProp<ParamListBase>;
    selected: LeafSelectionItem<T> | undefined;
    items: LeafSelectionItem<T>[];
    title: string;
    style?: ViewStyle;
    disabled?: boolean;
    onSelection: (item: LeafSelectionItem<T> | undefined) => void;
}

const LeafSelectionInput: React.FC<Props<unknown>> = ({ navigation, selected, items, title, style, disabled = false, onSelection }) => {
    const isSelected = selected != null;

    useEffect(() => {
        const unsubscribe = StateManager.clearAllInputs.subscribe(() => {
            onSelection(undefined);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <FlatContainer
            onPress={() => {
                if (disabled) {
                    return;
                }
                LeafListSelectionManager.listSelection = items;
                LeafListSelectionManager.onSelection = onSelection;
                NavigationSession.inst.navigateTo(LeafListSelection, navigation, title);
            }}
            style={{ width: "100%", ...style }}
            color={disabled ? LeafColors.textSemiLight : LeafColors.fillBackgroundLight}
        >
            <HStack>
                <VStack spacing={4}>
                    <LeafText typography={LeafTypography.subscript.withColor(
                        disabled ? LeafColors.shadow : LeafColors.textSemiDark,
                    )}>{title}</LeafText>

                    <LeafText
                        typography={LeafTypography.body.withColor(
                            selected == undefined ? LeafColors.textError : LeafColors.textDark,
                        )}
                    >
                        {selected?.title ?? strings("inputLabel.required").toUpperCase()}
                        
                    </LeafText>
                </VStack>

                <Spacer />

                <LeafIcon
                    icon={disabled ? "close-circle" : isSelected ? "check-circle" : "chevron-right-circle"}
                    color={disabled ? LeafColors.shadow : isSelected ? LeafColors.textSuccess : LeafColors.textSemiDark}
                    size={LeafIconSize.Large}
                    style={{ alignSelf: "center" }}
                />
            </HStack>
        </FlatContainer>
    );
};

export default LeafSelectionInput;
