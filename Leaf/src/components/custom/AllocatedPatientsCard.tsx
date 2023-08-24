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
import { TouchableOpacity } from "react-native-gesture-handler";
import LeafIcon from "../base/LeafIcon/LeafIcon";
import Spacer from "../containers/layout/Spacer";

interface Props {
    patient: Patient;
    style?: ViewStyle;
}

const AllocatedPatientsCard: React.FC<Props> = ({ patient, style }) => {
    const idText = patient.mrn.toString();
    const dateText = patient.triageCase.arrivalDate.toDateString();

    const typography = LeafTypography.subscriptLabel;
    typography.leafColor = LeafColors.textDark;

    const formatTime = (date: Date): string => {
        let hours = date.getHours();
        let minutes = date.getMinutes();

        return `${hours < 10 ? "0".concat(hours.toString()) : hours.toString()}:${minutes < 10 ? "0".concat(minutes.toString()) : minutes.toString()}`
    }

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
                        flex: 1
                    }}
                >
                    <HStack>
                        <LeafText wide={false} typography={LeafTypography.title3} style={{ alignSelf: "flex-start" }}>
                            {patient.fullName}
                        </LeafText>
                        <Spacer/>
                        <TouchableOpacity onPress={() => null} style={{ alignSelf: "flex-start" }}>
                            <LeafIcon
                                icon="minus"
                                color={LeafColors.fillBackgroundRed}
                                size={LeafIconSize.Large}
                            />
                        </TouchableOpacity>
                    </HStack>

                    <VGap size={16} />

                    <LeafText typography={LeafTypography.subscript}>
                        {strings("label.id")} {idText}
                    </LeafText>

                    <LeafText typography={LeafTypography.subscript}>
                        {strings("label.date")} {dateText}
                    </LeafText>

                    <VGap size={16} />

                    {/* // TODO: change to cusotm chip component on merge */}
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
                                    {`${event.title.toString()} @ ${formatTime(event.triggerTime)}`}
                                </LeafText>
                            </View>
                        ))}
                    </HStack>
                </VStack>
            </HStack>
        </FlatContainer>
    );
};

export default AllocatedPatientsCard;
