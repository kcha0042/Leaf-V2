import React, { useEffect } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import StateManager from "../../state/publishers/StateManager";
import LeafText from "../base/LeafText/LeafText";
import LeafTypography from "../styling/LeafTypography";
import NavigationEnvironment from "./navigators/NavigationEnvironment";
import { NavigationProp, ParamListBase } from "@react-navigation/native";

type CustomLeafHeaderProps = {
    title: string;
    buttonProps: LeftButtonProps;
};

type LeftButtonProps = {
    canGoBack: boolean;
    navigation: NavigationProp<ParamListBase>;
};

/**
 * A custom header that will be displayed at the top of our stacks, it takes in a button that allows navigation backwards
 * @param param0 {@link CustomLeafHeaderProps}
 * @returns custom JSX element
 */
const CustomLeafHeader: React.FC<CustomLeafHeaderProps> = ({ title, buttonProps }) => {
    // Use a hook to define background color
    // Otherwise state updates won't redraw the component
    const [backgroundColor, setBackgroundColor] = React.useState<string>(StateManager.headerColor.read());

    const [headerTitle, setHeaderTitle] = React.useState<string>(title);

    // TODO: I don't think header title callbacks are necessary anymore
    // (I need to check this, but we pass it from the previous controller so...)

    StateManager.headerColor.subscribe(() => {
        setBackgroundColor(StateManager.headerColor.read());
    });

    const reflectTitleOverride = () => {
        const titleOverride = StateManager.headerTitleOverride.read();
        if (titleOverride != null) {
            setHeaderTitle(titleOverride);
        } else {
            setHeaderTitle(title);
        }
    };

    // Cannot use subscriber pattern here because it will redraw the previous screen's header
    // (Before it has transitoned away)
    // useEffect ensures only the page appearing has its header changed
    useEffect(() => {
        reflectTitleOverride();
    }, []);

    // Side bar item changes don't trigger remounts
    StateManager.sideBarItemPressed.subscribe(() => {
        reflectTitleOverride();
    });

    // Drawer changes don't trigger remounts
    StateManager.drawerItemChanged.subscribe(() => {
        StateManager.headerTitleOverride.publish(null);
        reflectTitleOverride();
    });

    return (
        <View
            style={{
                backgroundColor: backgroundColor,
                ...styles.header,
            }}
        >
            {/* Only have the button if we can go back */}
            {buttonProps.canGoBack ? (
                <TouchableOpacity
                    onPress={() => {
                        NavigationEnvironment.inst.navigateBack(buttonProps.navigation);
                    }}
                    style={styles.backButton}
                >
                    <Icon name={"chevron-left"} size={45} colour={"#007AFF"} style={{ marginLeft: -10 }} />
                </TouchableOpacity>
            ) : null}
            <LeafText typography={LeafTypography.header}>{headerTitle}</LeafText>
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
