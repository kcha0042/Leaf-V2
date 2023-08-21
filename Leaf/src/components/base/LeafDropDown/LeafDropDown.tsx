import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { strings } from '../../../localisation/Strings';
import Environment from '../../../state/environment/Environment';
import { OS } from '../../../state/environment/types/OS';
import HStack from '../../containers/HStack';
import VStack from '../../containers/VStack';
import LeafColor from '../../styling/color/LeafColor';
import LeafColors from '../../styling/LeafColors';
import LeafTypography from '../../styling/LeafTypography';
import LeafTypographyConfig from '../../styling/typography/LeafTypographyConfig';
import LeafIcon from '../LeafIcon/LeafIcon';
import LeafText from '../LeafText/LeafText';

interface Props<T> {
    options: T[];
    initialValue?: T;
    setOption: (option?: T) => void;
    optionToString: (option: T) => string;
    header: string;
    noneOption?: boolean;
    height?: number;
    borderColor?: LeafColor;
    backgroundColor?: LeafColor;
    dropdownBackgroundColor?: LeafColor;
    selectedTypography?: LeafTypographyConfig;
    optionTypography?: LeafTypographyConfig;
}

/**
 * Be careful when using. If you wrap this in another view, the parent view must have a zIndex heigher than any other children of the same level.
 * Otherwise the options will be rendered behind the other views.
 * @param param0 
 * @returns 
 */
function LeafDropDown<T>({
    options,
    initialValue,
    setOption,
    optionToString,
    header,
    noneOption = true,
    borderColor = LeafColors.accent,
    backgroundColor = LeafColors.screenBackgroundLight,
    dropdownBackgroundColor = LeafColors.screenBackgroundSemiLight,
    height = 50,
    selectedTypography = LeafTypography.title4,
    optionTypography = LeafTypography.body
}: Props<T>){

    useEffect(() => {
        setSelectedValue(initialValue);
    }, [initialValue])

    const borderWidth = 2;
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(initialValue);
    const [icon, setIcon] = useState("chevron-down");
    const changeIcon = () => {
        setIcon(icon == "chevron-down" ? "chevron-up" : "chevron-down");
    }

    return (
        <View
            style={{
                zIndex: 1,
                flex: 1
            }}
        >
            <VStack>
                <LeafText typography={LeafTypography.subscript}>{header}</LeafText>
                <View 
                    style={{ 
                        height: height, 
                        width: "100%",
                        borderColor: borderColor.getColor(), 
                        justifyContent: 'center', 
                        borderRadius: 20 
                    }}
                >
                    <TouchableOpacity 
                        onPress={() => {
                            setIsOpen(!isOpen);
                            changeIcon();
                        }}
                        style={{
                            backgroundColor: backgroundColor.getColor()
                        }}
                    >
                        <HStack
                            style={{
                                alignItems: "center"
                            }}
                            spacing={5}
                        >
                            <LeafText wide={false} typography={selectedTypography}>{optionToString(selectedValue) || strings("button.selectAnOption")}</LeafText>
                            <LeafIcon icon={icon} color={selectedTypography.leafColor} size={20}/>
                        </HStack>
                    </TouchableOpacity>

                    {isOpen && (
                        <View style={{
                            position: 'absolute',
                            width: "100%",
                            top: height - borderWidth*2,
                            backgroundColor: dropdownBackgroundColor.getColor(),
                            borderRadius: 20,
                            shadowColor: LeafColors.shadow.getColor(),
                            shadowOffset: {
                                width: 0,
                                height: 4,
                            },
                            // Shadows appear sligntly differnt on web
                            shadowOpacity: Environment.inst.getOS() == OS.Web ? 0.16 : 0.12,
                            shadowRadius: Environment.inst.getOS() == OS.Web ? 12 : 7,
                        }}>
                            <ScrollView
                                style={{
                                    flex: 1
                                }}
                            >
                                {options.map((option, index) => (
                                    <TouchableOpacity 
                                        key={index} 
                                        style={{ 
                                            paddingHorizontal: 20,
                                            paddingVertical: 10,
                                            backgroundColor: dropdownBackgroundColor.getColor(),
                                            borderRadius: 20,
                                        }} 
                                        onPress={() => {
                                            changeIcon();
                                            setSelectedValue(option);
                                            setOption(option);
                                            setIsOpen(false);
                                        }}
                                    >
                                        <LeafText typography={optionTypography}>{optionToString(option)}</LeafText>
                                    </TouchableOpacity>
                                ))}
                                {/* None option */}
                                {
                                    !noneOption ? null : (
                                        <TouchableOpacity 
                                            style={{ 
                                                paddingHorizontal: 20,
                                                paddingVertical: 10,
                                                backgroundColor: dropdownBackgroundColor.getColor(),
                                                borderRadius: 20
                                            }} 
                                            onPress={() => {
                                                changeIcon()
                                                setSelectedValue(undefined);
                                                setOption(undefined);
                                                setIsOpen(false);
                                            }}
                                        >
                                            <LeafText typography={optionTypography}>{strings("button.none")}</LeafText>
                                        </TouchableOpacity>
                                    )
                                }
                            </ScrollView>
                        </View>
                    )}
                </View>
            </VStack>
        </View>
    )
}

export default LeafDropDown;
