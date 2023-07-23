import React from "react";
import { View } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import LeafIcon from "../base/LeafIcon/LeafIcon";
import LeafText from "../base/LeafText/LeafText";
import VStack from "../containers/VStack";
import LeafStackRoot from "../navigation/LeafStackRoot";
import NavigationEnvironment from "../navigation/navigators/NavigationEnvironment";
import LeafColors from "../styling/LeafColors";
import LeafTypography from "../styling/LeafTypography";

interface Props {
    leafStackRoot: LeafStackRoot;
}

const TabBarItem: React.FC<Props> = ({ leafStackRoot }) => {
    const isFocused =
        NavigationEnvironment.inst.focusedStackRoot != undefined &&
        NavigationEnvironment.inst.focusedStackRoot.matches(leafStackRoot.id);
    const icon = isFocused ? leafStackRoot.focusedIcon : leafStackRoot.icon;
    const size = 30;
    const padding = 10;
    return (
        <VStack
            spacing={5}
            style={{
                alignItems: "center",
                alignSelf: "flex-start",
                paddingBottom: 8,
            }}
        >
            <TouchableWithoutFeedback
                onPress={leafStackRoot.activateOnTabBar}
                style={{ paddingVertical: padding, paddingHorizontal: 30 }}
            >
                <LeafIcon icon={icon} color={LeafColors.textDark} size={size} />
            </TouchableWithoutFeedback>

            <View
                style={{
                    position: "absolute",
                    top: size + padding + 4,
                    flex: 1,
                }}
            >
                <LeafText
                    typography={LeafTypography.subscriptLabel}
                    style={{ alignSelf: "center", textAlign: "center" }}
                >
                    {leafStackRoot.title}
                </LeafText>
            </View>
        </VStack>
    );
};

export default TabBarItem;
