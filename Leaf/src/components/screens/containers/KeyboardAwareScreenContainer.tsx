import { View, ViewStyle } from "react-native";
import LeafColors from "../../styling/LeafColors";
import LeafDimensions from "../../styling/LeafDimensions";
import LeafColor from "../../styling/color/LeafColor";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

interface Props {
    backgroundColor?: LeafColor;
    children: any; // No type - can be any component
    style?: ViewStyle;
}

const KeyboardAwareScreenContainer: React.FC<Props> = ({
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
            <KeyboardAwareScrollView
                style={{
                    flex: 1,
                    paddingTop: LeafDimensions.screenTopPadding,
                    paddingHorizontal: LeafDimensions.screenPadding,
                }}
                enableOnAndroid={true}
                showsVerticalScrollIndicator={true}
                extraScrollHeight={100}
                enableResetScrollToCoords={false}
                keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
            >
                <View
                    style={{
                        width: "100%",
                        paddingBottom: LeafDimensions.screenPadding,
                    }}
                >
                    {children}
                </View>
            </KeyboardAwareScrollView>
        </View>
    );
};

export default KeyboardAwareScreenContainer;
