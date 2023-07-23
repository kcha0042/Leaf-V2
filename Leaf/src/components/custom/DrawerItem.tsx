import LeafIcon from "../base/LeafIcon/LeafIcon";
import { LeafIconSize } from "../base/LeafIcon/LeafIconSize";
import LeafText from "../base/LeafText/LeafText";
import FlatContainer from "../containers/FlatContainer";
import HStack from "../containers/HStack";
import HGap from "../containers/layout/HGap";
import LeafStackRoot from "../navigation/LeafStackRoot";
import NavigationEnvironment from "../navigation/navigators/NavigationEnvironment";
import LeafColors from "../styling/LeafColors";
import LeafTypography from "../styling/LeafTypography";

interface Props {
    leafStackRoot: LeafStackRoot;
}

const DrawerItem: React.FC<Props> = ({ leafStackRoot }) => {
    const isFocused =
        NavigationEnvironment.inst.focusedStackRoot != undefined &&
        NavigationEnvironment.inst.focusedStackRoot.matches(leafStackRoot.id);
    const icon = isFocused ? leafStackRoot.focusedIcon : leafStackRoot.icon;
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

                <LeafText typography={LeafTypography.drawerItem} wide={false}>
                    {leafStackRoot.title}
                </LeafText>
            </HStack>
        </FlatContainer>
    );
};

export default DrawerItem;
