import { View, ViewStyle } from "react-native";
import LeafColors from "../styling/LeafColors";
import LeafTypography from "../styling/LeafTypography";
import LeafText from "../base/LeafText/LeafText";
import FlatContainer from "../containers/FlatContainer";
import Leader from "../../model/employee/Leader";
import VGap from "../containers/layout/VGap";
import VStack from "../containers/VStack";
import HStack from "../containers/HStack";

interface Props {
    leader: Leader;
    style?: ViewStyle;
    onPress: () => void;
}

const LeaderCard: React.FC<Props> = ({ leader, style, onPress }) => {
    const idText = leader.id.toString();
    return (
        <FlatContainer color={LeafColors.fillBackgroundLight} style={style} onPress={onPress}>
            <HStack>
                <VStack>
                    <View style={{ alignSelf: "flex-start" }}>
                        <LeafText typography={LeafTypography.title3}>{leader.firstName}</LeafText>
                    </View>

                    <VGap size={6} />

                    <LeafText typography={LeafTypography.subscript} wide={false} style={{ alignSelf: "flex-start" }}>
                        {"ID: " + idText}
                    </LeafText>
                </VStack>
            </HStack>
        </FlatContainer>
    );
};

export default LeaderCard;
