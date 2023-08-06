import { strings } from "../../localisation/Strings";
import Worker from "../../model/employee/Worker";
import LeafIcon from "../base/LeafIcon/LeafIcon";
import { LeafIconSize } from "../base/LeafIcon/LeafIconSize";
import LeafText from "../base/LeafText/LeafText";
import FlatContainer from "../containers/FlatContainer";
import HStack from "../containers/HStack";
import VStack from "../containers/VStack";
import LeafColors from "../styling/LeafColors";
import LeafTypography from "../styling/LeafTypography";

interface Props {
    worker: Worker;
    display?: Boolean;
    onPress: () => void;
}

const CreateAccountCard: React.FC<Props> = ({ worker, display, onPress }) => {
    const idText = worker.id.toString();
    if (!display) {
        return null;
    }
    return (
        <FlatContainer color={LeafColors.fillBackgroundLight} onPress={onPress}>
            <HStack>
                <VStack
                    style={{
                        alignSelf: "flex-start"
                    }}
                >
                    <LeafText typography={LeafTypography.title3} verticalWrap={true}>
                        {strings("label.accountCreated")}
                    </LeafText>

                    <LeafText typography={LeafTypography.subscript} wide={false}>
                        {strings("label.id") + idText + strings("operation.activeAccount")}
                    </LeafText>
                </VStack>

                <LeafIcon
                    icon="check-bold"
                    color={LeafColors.textSuccess}
                    size={LeafIconSize.Large}
                    style={{ position: "absolute", right: 0 }}
                />
            </HStack>
        </FlatContainer>
    );
};

export default CreateAccountCard;
