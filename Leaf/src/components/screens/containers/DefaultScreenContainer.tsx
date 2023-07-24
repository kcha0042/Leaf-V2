import { View, ViewStyle } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import LeafColors from "../../styling/LeafColors";
import LeafDimensions from "../../styling/LeafDimensions";
import LeafColor from "../../styling/color/LeafColor";

interface Props {
    backgroundColor?: LeafColor;
    children; // No type - can be any component
    style?: ViewStyle;
}

const DefaultScreenContainer: React.FC<Props> = ({
    backgroundColor = LeafColors.screenBackgroundLight,
    children,
    style,
}) => {
    return (
        <View
            style={{
                backgroundColor: backgroundColor.getColor(),
                flex: 1,
                ...style,
            }}
        >
            <ScrollView
                style={{
                    flex: 1,
                    paddingTop: LeafDimensions.screenTopPadding,
                    paddingHorizontal: LeafDimensions.screenPadding,
                }}
            >
                {children}
            </ScrollView>
        </View>
    );
};

export default DefaultScreenContainer;
