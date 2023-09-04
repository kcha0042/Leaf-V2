import { View, ViewStyle } from "react-native";
import Patient from "../../model/patient/Patient";
import LeafText from "../base/LeafText/LeafText";
import FlatContainer from "../containers/FlatContainer";
import HStack from "../containers/HStack";
import VStack from "../containers/VStack";
import VGap from "../containers/layout/VGap";
import LeafColors from "../styling/LeafColors";
import LeafTypography from "../styling/LeafTypography";
import TriageCodeBadge from "./TriageCodeBadge";
import LeafIcon from "../base/LeafIcon/LeafIcon";
import { LeafIconSize } from "../base/LeafIcon/LeafIconSize";
import Spacer from "../containers/layout/Spacer";

interface Props {
    patient: Patient;
    style?: ViewStyle;
    isSelected: Boolean;
    onPress: () => void;
}

const ExportPatientCard: React.FC<Props> = ({ patient, style, isSelected, onPress }) => {
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
                borderColor: isSelected ?LeafColors.textSuccess.getColor(): LeafColors.fillBackgroundLight.getColor(),
                borderWidth: 2,
            }}
            onPress={onPress}
        >
            <HStack
                style={{
                    alignItems: "center",
                }}
            >
                <TriageCodeBadge
                    code={patient.triageCase.triageCode}
                    fillSpace={false}
                    style={{
                        alignSelf: "flex-start",
                        marginRight: 12,
                    }}
                />

                <VStack style={{ flexShrink: 1 }}>
                    <View style={{ alignSelf: "flex-start" }}>
                        <LeafText typography={LeafTypography.title3} verticalWrap={true}>
                            {patient.fullName}
                        </LeafText>
                    </View>

                    <VGap size={16} />

                    <LeafText typography={LeafTypography.subscript}>{datetimeText}</LeafText>
                </VStack>

                <Spacer />

                <LeafIcon icon="file-export" color={LeafColors.accent} size={LeafIconSize.Medium} />
            </HStack>
        </FlatContainer>
    );
};

export default ExportPatientCard;
