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
import LeafStackRoot from "../navigation/LeafStackRoot";
import NavigationEnvironment from "../navigation/navigators/NavigationEnvironment";
import LeafButton from "../base/LeafButton/LeafButton";
import { LeafButtonType } from "../base/LeafButton/LeafButtonType";
import LeafIcon from "../base/LeafIcon/LeafIcon";
import { LeafIconSize } from "../base/LeafIcon/LeafIconSize";

interface Props {
    leafStackRoot: LeafStackRoot;
}

const DrawerItem: React.FC<Props> = ({ 
    leafStackRoot,
}) => {
    let isFocused = NavigationEnvironment.inst.focusedStackRoot != undefined && NavigationEnvironment.inst.focusedStackRoot.matches(leafStackRoot.id);
    let icon = isFocused ? leafStackRoot.focusedIcon : leafStackRoot.icon;
    return (
        <FlatContainer 
            color={isFocused ? LeafColors.fillBackgroundLight : LeafColors.screenBackgroundLight}
            onPress={leafStackRoot.activateOnDrawer}
        >
            <HStack>
                <FlatContainer
                    color={isFocused ? LeafColors.textDark : LeafColors.fillBackgroundLight}
                    style={{
                        padding: 8,
                        borderRadius: 10,
                    }}
                >
                    <LeafIcon 
                        icon={icon}
                        color={isFocused ? LeafColors.screenBackgroundLight : LeafColors.textDark}
                        size={LeafIconSize.formCardTitle}
                    />
                </FlatContainer>

                <HGap size={12} />

                <LeafText
                    typography={LeafTypography.drawerItem}
                    wide={false}
                >
                    {leafStackRoot.title}
                </LeafText>
            </HStack>
        </FlatContainer>
    );
}

export default DrawerItem;