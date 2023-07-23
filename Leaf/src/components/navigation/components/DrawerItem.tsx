import LeafIcon from "../../base/LeafIcon/LeafIcon";
import { LeafIconSize } from "../../base/LeafIcon/LeafIconSize";
import LeafText from "../../base/LeafText/LeafText";
import FlatContainer from "../../containers/FlatContainer";
import HStack from "../../containers/HStack";
import HGap from "../../containers/layout/HGap";
import LeafInterfaceSection from "../LeafInterfaceSection";
import NavigationSession from "../state/NavigationEnvironment";
import LeafColors from "../../styling/LeafColors";
import LeafTypography from "../../styling/LeafTypography";

interface Props {
    interfaceSection: LeafInterfaceSection;
}

const DrawerItem: React.FC<Props> = ({ interfaceSection }) => {
    const isFocused =
        NavigationSession.inst.focusedInterfaceSection != undefined &&
        NavigationSession.inst.focusedInterfaceSection.matches(interfaceSection.id);
    const icon = isFocused ? interfaceSection.focusedIcon : interfaceSection.icon;
    return (
        <FlatContainer
            color={isFocused ? LeafColors.fillBackgroundLight : LeafColors.screenBackgroundLight}
            onPress={interfaceSection.activateOnDrawer}
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
                        size={LeafIconSize.FormCardTitle}
                    />
                </FlatContainer>

                <HGap size={12} />

                <LeafText typography={LeafTypography.drawerItem} wide={false}>
                    {interfaceSection.title}
                </LeafText>
            </HStack>
        </FlatContainer>
    );
};

export default DrawerItem;
