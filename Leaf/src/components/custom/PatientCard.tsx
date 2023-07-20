import { View, ViewStyle } from "react-native";
import Patient from "../../model/patient/Patient";
import FlatContainer from "../containers/FlatContainer";
import LeafColors from "../styling/LeafColors";
import LeafTypography from "../styling/LeafTypography";
import LeafText from "../base/LeafText/LeafText";
import TriageCodeBadge from "./TriageCodeBadge";
import VStack from "../containers/VStack";
import HStack from "../containers/HStack";
import HGap from "../containers/layout/HGap";
import VGap from "../containers/layout/VGap";

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
        <FlatContainer 
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
        </FlatContainer>
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