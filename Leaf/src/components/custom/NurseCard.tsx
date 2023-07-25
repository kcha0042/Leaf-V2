import { View, ViewStyle } from "react-native";
import Worker from "../../model/employee/Worker";
import LeafText from "../base/LeafText/LeafText";
import FlatContainer from "../containers/FlatContainer";
import HStack from "../containers/HStack";
import VStack from "../containers/VStack";
import VGap from "../containers/layout/VGap";
import LeafColors from "../styling/LeafColors";
import LeafTypography from "../styling/LeafTypography";
import TriageCodeBadge from "./TriageCodeBadge";

interface Props {
    worker: Worker;
    style?: ViewStyle;
    onPress: () => void;
}

const NurseCard: React.FC<Props> = ({ worker, style, onPress }) => {
    return (
        <FlatContainer
            color={LeafColors.fillBackgroundLight}
            style={{
                ...style,
            }}
            onPress={onPress}
        >
            <HStack>
                <VStack style={{ flexShrink: 1 }}>
                    <View style={{ alignSelf: "flex-start" }}>
                        <LeafText typography={LeafTypography.title3} verticalWrap={true}>
                            {worker.fullName}
                        </LeafText>
                    </View>

                    <VGap size={16} />

                    <LeafText typography={LeafTypography.subscript} wide={false} style={{ alignSelf: "flex-start" }}>
                        {worker.id}
                    </LeafText>
                </VStack>
            </HStack>
        </FlatContainer>
    );
};

export default NurseCard;
