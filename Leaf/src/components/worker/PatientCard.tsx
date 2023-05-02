import { Text, ViewStyle } from "react-native";
import Patient from "../../model/patient/Patient";
import LeafFlatContainer from "../core/containers/LeafFlatContainer/LeafRoundedContainer";
import LeafColors from "../core/styles/LeafColors";
import LeafTypography from "../core/styles/LeafTypography";
import LeafText from "../core/views/LeafText/LeafText";
import { HStack, Spacer, VStack, View } from "native-base";
import TriageCodeBadge from "./TriageCodeBadge";
import LeafFloatingCard from "../core/containers/LeafFloatingCard/LeafFloatingCard";

interface Props {
    patient: Patient;
    style?: ViewStyle;
    onPress: (patient) => void;
}

const PatientCard: React.FC<Props> = ({ 
    patient,
    style,
    onPress,
}) => {
    let datetimeText = patient.triageCase.arrivalDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + "  |  " + patient.triageCase.arrivalDate.toDateString();
    return (
        <LeafFloatingCard 
            color={LeafColors.textBackgroundLight}
            style={style}
        >
            <HStack>
                <TriageCodeBadge
                    code={patient.triageCase.triageCode}
                    fillSpace={false}
                    style={{
                        alignSelf: 'flex-start',
                        marginRight: 10,
                    }}
                />

                <VStack>
                    <View alignSelf={'flex-start'}>
                        <LeafText
                            typography={LeafTypography.cardTitle}
                            verticalWrap={true}
                        >
                            {patient.fullName}
                        </LeafText>
                    </View>

                    <Spacer size={3} />

                    <LeafText
                        typography={LeafTypography.subscript}
                        wide={false}
                    >
                        {datetimeText}
                    </LeafText>
                </VStack>
            </HStack>
        </LeafFloatingCard>
    );
}

export default PatientCard;