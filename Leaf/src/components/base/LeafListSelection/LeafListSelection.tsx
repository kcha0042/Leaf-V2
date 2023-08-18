import { NavigationProp, ParamListBase } from "@react-navigation/native";
import React, { useEffect } from "react";
import { FlatList } from "react-native";
import FlatContainer from "../../containers/FlatContainer";
import VStack from "../../containers/VStack";
import Spacer from "../../containers/layout/Spacer";
import VGap from "../../containers/layout/VGap";
import NavigationSession from "../../navigation/state/NavigationEnvironment";
import DefaultScreenContainer from "../../screens/containers/DefaultScreenContainer";
import LeafDimensions from "../../styling/LeafDimensions";
import LeafTypography from "../../styling/LeafTypography";
import LeafText from "../LeafText/LeafText";
import LeafListSelectionManager from "./LeafListSelectionManager";

interface Props {
    navigation?: NavigationProp<ParamListBase>;
}

const LeafListSelection: React.FC<Props> = ({ navigation }) => {
    const items = LeafListSelectionManager.listSelection;

    useEffect(() => {
        const unsubscribe = navigation?.addListener("blur", () => {
            // When the screen is about to lose focus
            LeafListSelectionManager.listSelection = [];
        });

        return unsubscribe;
    }, [navigation]);

    return (
        <DefaultScreenContainer>
            <VStack
                spacing={LeafDimensions.screenSpacing}
                style={{
                    flex: 1,
                }}
            >
                <FlatList
                    data={items}
                    renderItem={({ item: item }) => (
                        <FlatContainer
                            onPress={() => {
                                LeafListSelectionManager.onSelection(item);
                                NavigationSession.inst.navigateBack(navigation);
                            }}
                        >
                            <VStack spacing={4}>
                                <LeafText typography={LeafTypography.subscript}>{item.subtitle}</LeafText>

                                <LeafText typography={LeafTypography.body}>{item.title}</LeafText>
                            </VStack>
                        </FlatContainer>
                    )}
                    keyExtractor={(item) => item.id}
                    ItemSeparatorComponent={() => <VGap size={LeafDimensions.cardSpacing} />}
                    scrollEnabled={false}
                    // Don't use overflow prop - doesn't work on web
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

export default LeafListSelection;
