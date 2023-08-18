import { strings } from "../../localisation/Strings";
import LeafText from "../base/LeafText/LeafText";
import VStack from "../containers/VStack";
import LeafColors from "../styling/LeafColors";
import LeafTypography from "../styling/LeafTypography";

export const ErrorScreen: React.FC = () => {
    return (
        <VStack
            style={{
                flex: 1,
                alignItems: "center",
                width: "100%",
                backgroundColor: LeafColors.screenBackgroundLight.getColor(),
                justifyContent: "center",
            }}
        >
            <LeafText typography={LeafTypography.body.withColor(LeafColors.textError)} style={{ textAlign: "center" }}>
                {strings("label.anErrorOccurred")}
            </LeafText>
        </VStack>
    );
};
