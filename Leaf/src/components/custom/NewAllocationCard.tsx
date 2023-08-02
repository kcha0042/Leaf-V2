import { ViewStyle, View } from "react-native";
import LeafColors from "../styling/LeafColors";
import LeafTypography from "../styling/LeafTypography";
import LeafText from "../base/LeafText/LeafText";
import FloatingContainer from "../containers/FloatingContainer";
import { strings } from "../../localisation/Strings";
import HStack from "../containers/HStack";
import LeafIcon from "../base/LeafIcon/LeafIcon";

interface Props {
    style?: ViewStyle;
    onPress: () => void;
}

const NewAllocationCard: React.FC<Props> = ({ style, onPress }) => {
    return (
        <FloatingContainer color={LeafColors.textBackgroundLight} style={style} onPress={onPress}>
            <HStack style={{ justifyContent: "center" }}>
                <View>
                    <LeafIcon icon="plus" size={40} color={LeafColors.textDark} style={{ alignSelf: "center" }} />
                </View>

                <View style={{ alignSelf: "center", marginLeft: 6 }}>
                    <LeafText typography={LeafTypography.title3}>{strings("button.newAllocation")}</LeafText>
                </View>
            </HStack>
        </FloatingContainer>
    );
};

export default NewAllocationCard;
