import { strings } from "../../localisation/Strings";
import Employee from "../../model/employee/Employee";
import LeafIcon from "../base/LeafIcon/LeafIcon";
import { LeafIconSize } from "../base/LeafIcon/LeafIconSize";
import LeafText from "../base/LeafText/LeafText";
import FlatContainer from "../containers/FlatContainer";
import HStack from "../containers/HStack";
import VStack from "../containers/VStack";
import VGap from "../containers/layout/VGap";
import LeafColors from "../styling/LeafColors";
import LeafTypography from "../styling/LeafTypography";

interface Props {
    employee: Employee;
}

const CreateAccountCard: React.FC<Props> = ({ employee }) => {
    const idText = employee.id.toString();
    return (
        <FlatContainer color={LeafColors.fillBackgroundLight} style={{ width: "100%" }}>
            <VStack
                style={{
                    flexWrap: "nowrap",
                }}
            >
                <HStack style={{ width: "100%" }}>
                    <VStack spacing={4} style={{ flex: 1 }}>
                        <LeafText typography={LeafTypography.title3}>
                            {strings("label.accountCreated1Param", employee.role.toString())}
                        </LeafText>

                        <LeafText typography={LeafTypography.subscript}>{strings("label.id") + idText}</LeafText>
                    </VStack>

                    <LeafIcon icon="check-bold" color={LeafColors.textSuccess} size={LeafIconSize.Large} />
                </HStack>

                <VGap size={22} />

                <LeafText typography={LeafTypography.subscript}>{strings("operation.activeAccount")}</LeafText>
            </VStack>
        </FlatContainer>
    );
};

export default CreateAccountCard;
