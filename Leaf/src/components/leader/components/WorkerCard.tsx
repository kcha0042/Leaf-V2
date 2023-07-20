import { View, ViewStyle } from "react-native";
import LeafColors from "../../core/styles/LeafColors";
import LeafTypography from "../../core/styles/LeafTypography";
import LeafText from "../../core/views/LeafText/LeafText";
import LeafFloatingCard from "../../core/containers/LeafFloatingCard/LeafFloatingCard";
import Worker from "../../../model/employee/Worker";
import VGap from "../../core/containers/VGap";
import VStack from "../../core/containers/VStack";
import HStack from "../../core/containers/HStack";

interface Props {
    worker: Worker;
    style?: ViewStyle;
    onPress: () => void;
}

const WorkerCard: React.FC<Props> = ({ 
    worker,
    style,
    onPress,
}) => {
    // TODO: Add Worker full name instead of First Name
    let idText = worker.id.toString();
    return (
        <LeafFloatingCard 
            color={LeafColors.textBackgroundLight}
            style={style}
            onPress={onPress}
        >
            <HStack>
                <VStack>
                    <View style={{ alignSelf: 'flex-start' }}>
                        <LeafText
                            typography={LeafTypography.cardTitle}
                            verticalWrap={true}
                        >
                            {worker.firstName}
                        </LeafText>
                    </View>

                    <VGap size={6} />

                    <LeafText
                        typography={LeafTypography.subscript}
                        wide={false}
                    >
                        {"ID: " + idText}
                    </LeafText>
                </VStack>
            </HStack>
        </LeafFloatingCard>
    );
}

export default WorkerCard;