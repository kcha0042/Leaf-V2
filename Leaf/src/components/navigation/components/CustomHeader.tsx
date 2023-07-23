import React, { useEffect } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import StateManager from "../../../state/publishers/StateManager";
import LeafText from "../../base/LeafText/LeafText";
import LeafTypography from "../../styling/LeafTypography";
import NavigationSession from "../state/NavigationEnvironment";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import LeafColors from "../../styling/LeafColors";

type CustomLeafHeaderProps = {
    title: string;
    buttonProps: LeftButtonProps;
};

type LeftButtonProps = {
    canGoBack: boolean;
    navigation: NavigationProp<ParamListBase>;
};

const CustomLeafHeader: React.FC<CustomLeafHeaderProps> = ({ title, buttonProps }) => {
    return (
        <View
            style={{
                backgroundColor: LeafColors.screenBackgroundLight.getColor(),
                ...styles.header,
            }}
        >
            {/* Only have the button if we can go back */}
            {buttonProps.canGoBack ? (
                <TouchableOpacity
                    onPress={() => {
                        NavigationSession.inst.navigateBack(buttonProps.navigation);
                    }}
                    style={styles.backButton}
                >
                    <Icon name={"chevron-left"} size={45} colour={"#007AFF"} style={{ marginLeft: -10 }} />
                </TouchableOpacity>
            ) : null}
            <LeafText typography={LeafTypography.headerScreen}>{title}</LeafText>
        </View>
    );
};

const styles = StyleSheet.create({
    backButton: {
        alignItems: "center",
        paddingRight: 6,
    },
    header: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 22,
        paddingTop: 10,
    },
});

export default CustomLeafHeader;
