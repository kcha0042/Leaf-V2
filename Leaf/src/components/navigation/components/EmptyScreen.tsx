import { StyleSheet, View } from "react-native";
import LeafText from "../../base/LeafText/LeafText";
import LeafTypography from "../../styling/LeafTypography";
import { strings } from "../../../localisation/Strings";

export const EmptyScreen: React.FC = () => {
    return (
        <View style={styles.emptyScreen}>
            <LeafText wide={false} typography={LeafTypography.body}>
                {strings("navigation.noScreen")}
            </LeafText>
        </View>
    );
};

const styles = StyleSheet.create({
    emptyScreen: {
        alignContent: "center",
        alignItems: "center",
        flex: 10,
        justifyContent: "center",
    },
});
