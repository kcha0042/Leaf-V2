import { View, ViewStyle } from "react-native";
import { strings } from "../../localisation/Strings";
import Patient from "../../model/patient/Patient";
import { LeafIconSize } from "../base/LeafIcon/LeafIconSize";
import LeafIconButton from "../base/LeafIconButton/LeafIconButton";
import LeafText from "../base/LeafText/LeafText";
import FlatContainer from "../containers/FlatContainer";
import HStack from "../containers/HStack";
import VStack from "../containers/VStack";
import VGap from "../containers/layout/VGap";
import LeafColors from "../styling/LeafColors";
import LeafTypography from "../styling/LeafTypography";
import TriageCodeBadge from "./TriageCodeBadge";

interface Props {
    patient: Patient;
    style?: ViewStyle;
}

const AllocatedPatientsCard: React.FC<Props> = ({ patient, style }) => {
    const idText = patient.mrn.toString();
    const dateText = patient.triageCase.arrivalDate.toDateString();

    const typography = LeafTypography.subscriptLabel;
    typography.leafColor = LeafColors.accent;

    return (
        <FlatContainer>
            <HStack
                style={{
                    flex: 1,
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

                <VStack
                    style={{
                        flex: 1,
                    }}
                >
                    <LeafText typography={LeafTypography.title3} verticalWrap={true}>
                        {patient.fullName}
                    </LeafText>

                    <VGap size={16} />

                    <LeafText typography={LeafTypography.subscript}>
                        {strings("label.id")} {idText}
                    </LeafText>

                    <LeafText typography={LeafTypography.subscript}>
                        {strings("label.date")} {dateText}
                    </LeafText>

                    <VGap size={16} />
                    <HStack spacing={10}>
                        {patient.events.map((event) => (
                            <View
                                key={event.id.toString()}
                                style={{
                                    borderRadius: 30,
                                    borderWidth: 1,
                                    borderColor: typography.color,
                                    paddingHorizontal: 10,
                                    paddingVertical: 5,
                                    alignSelf: "flex-start",
                                }}
                            >
                                <LeafText wide={false} typography={typography}>
                                    {event.title.toString()}
                                </LeafText>
                            </View>
                        ))}
                    </HStack>
                </VStack>

                <LeafIconButton
                    icon="trash-can-outline"
                    color={LeafColors.fillBackgroundLight}
                    iconColor={LeafColors.fillBackgroundRed}
                    size={LeafIconSize.Large}
                    onPress={() => {}}
                />
            </HStack>
        </FlatContainer>
    );
};

export default AllocatedPatientsCard;
