import { View, ViewStyle } from "react-native";
import Patient from "../../../model/patient/Patient";
import LeafFlatCard from "../../core/containers/LeafFlatContainer/LeafFlatContainer";
import LeafColors from "../../core/styles/LeafColors";
import LeafTypography from "../../core/styles/LeafTypography";
import LeafText from "../../core/views/LeafText/LeafText";
import TriageCodeBadge from "./TriageCodeBadge";
import VStack from "../../core/containers/VStack";
import HStack from "../../core/containers/HStack";
import HGap from "../../core/containers/HGap";
import VGap from "../../core/containers/VGap";

interface Props {
    patient: Patient;
    style?: ViewStyle;
    onPress: () => void;
}

const PatientCard: React.FC<Props> = ({ 
    patient,
    style,
    onPress,
}) => {
    let timeText = patient.triageCase.arrivalDate.toLocaleTimeString('en-AU', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    }).toUpperCase();
    let dateText = patient.triageCase.arrivalDate.toDateString();
    let datetimeText = `${timeText}  |  ${dateText}`;
    return (
        <LeafFlatCard 
            color={LeafColors.fillBackgroundLight}
            style={{
                ...style
            }}
            onPress={onPress}
        >
            <HStack>
                <TriageCodeBadge
                    code={patient.triageCase.triageCode}
                    fillSpace={false}
                    style={{
                        alignSelf: 'flex-start',
                        marginRight: 12,
                    }}
                />

                <VStack style={{ flexShrink: 1 }}>
                    <View style={{ alignSelf: 'flex-start' }}>
                        <LeafText
                            typography={LeafTypography.cardTitle}
                            verticalWrap={true}
                        >
                            {patient.fullName}
                        </LeafText>
                    </View>

                    <VGap size={16} />

                    <LeafText
                        typography={LeafTypography.subscript}
                        wide={false}
                    >
                        {datetimeText}
                    </LeafText>
                </VStack>
            </HStack>
        </LeafFlatCard>
    );
}

export const PatientCardWrapper = (patient: Patient): React.FC => {
    const SidebarItem: React.FC = () => {
        return (
            <PatientCard patient={patient} onPress={() => null}/>
        )
    }

    return SidebarItem
}

export default PatientCard;