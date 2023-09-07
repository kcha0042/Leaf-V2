import { ViewStyle } from "react-native";
import Patient from "../../model/patient/Patient";
import LeafText from "../base/LeafText/LeafText";
import FlatContainer from "../containers/FlatContainer";
import HStack from "../containers/HStack";
import VStack from "../containers/VStack";
import LeafColors from "../styling/LeafColors";
import LeafTypography from "../styling/LeafTypography";
import TriageCodeBadge from "./TriageCodeBadge";
import TriageCodeLabel from "./TriageCodeLabel";
import VGap from "../containers/layout/VGap";
import { LeafFontWeight } from "../styling/typography/LeafFontWeight";

interface Props {
    patient: Patient;
    style?: ViewStyle;
    onPress: () => void;
}

const PatientCard: React.FC<Props> = ({ patient, style, onPress }) => {
    const timeText = patient.triageCase.arrivalDate
        .toLocaleTimeString("en-AU", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
        })
        .toUpperCase();
    const dateText = patient.triageCase.arrivalDate.toDateString();
    const datetimeText = `${timeText}  |  ${dateText}`;
    return (
        <FlatContainer
            color={LeafColors.fillBackgroundLight}
            style={{
                ...style,
            }}
            onPress={onPress}
        >
            <VStack spacing={6} style={{ flex: 1, flexWrap: "nowrap" }}>
                <LeafText typography={LeafTypography.title3.withWeight(LeafFontWeight.Bold)}>
                    {patient.fullName}
                </LeafText>

                <TriageCodeLabel code={patient.triageCase.triageCode} />

                <VGap size={10} />

                <LeafText typography={LeafTypography.subscript} wide={false} style={{ alignSelf: "flex-start" }}>
                    {datetimeText}
                </LeafText>
            </VStack>
        </FlatContainer>
    );
};

export default PatientCard;
