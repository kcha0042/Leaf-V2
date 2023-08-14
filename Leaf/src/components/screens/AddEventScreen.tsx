import { NavigationProp, ParamListBase } from "@react-navigation/native";
import React, { useState } from "react";
import { View } from "react-native";
import { strings } from "../../localisation/Strings";
import { PatientEventCategory } from "../../model/patient/PatientEventCategory";
import LeafButton from "../base/LeafButton/LeafButton";
import LeafSelectionInput from "../base/LeafListSelection/LeafSelectionInput";
import LeafSelectionItem from "../base/LeafListSelection/LeafSelectionItem";
import LeafMultilineTextInput from "../base/LeafMultilineTextInput/LeafMultilineTextInput";
import LeafTextInput from "../base/LeafTextInput/LeafTextInput";
import LeafTimeInput from "../base/LeafTimeInput/LeafTimeInput";
import Spacer from "../containers/layout/Spacer";
import VStack from "../containers/VStack";
import FormHeader from "../custom/FormHeader";
import NavigationSession from "../navigation/state/NavigationEnvironment";
import LeafColors from "../styling/LeafColors";
import LeafDimensions from "../styling/LeafDimensions";
import DefaultScreenContainer from "./containers/DefaultScreenContainer";

interface Props {
    navigation?: NavigationProp<ParamListBase>;
}

const AddEventScreen: React.FC<Props> = ({ navigation }) => {

    const [title, setTitle] = useState<string | undefined>();
    const [triggerTime, setTriggerTime] = useState<Date | undefined>();
    const [description, setDescription] = useState<string | undefined>();
    const [category, setCategory] = useState<PatientEventCategory | undefined>();

    const validateVariable = (variable: unknown): boolean => {
        return variable != undefined && variable != null;
    }

    const allIsValid = (): boolean => {
        return (
            validateVariable(title) && 
            validateVariable(triggerTime) && 
            validateVariable(description) && 
            validateVariable(category)
        );
    }

    const onDone = () => {
        if (allIsValid()){
            NavigationSession.inst.navigateBack(navigation);
        }else{
            // TODO: snackbar
        }
    }

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: LeafColors.screenBackgroundLight.getColor(),
                padding: LeafDimensions.screenPadding
            }}
        >
            <VStack
                spacing={LeafDimensions.screenSpacing}
                style={{
                    flex: 1
                }}
            >
                <LeafTextInput
                    label={strings("inputLabel.title")}
                    onTextChange={(text: string) => setTitle(text)}
                />
                <LeafTimeInput
                    label={strings("inputLabel.triggerTime")}
                    onChange={(date: Date) => setTriggerTime(date)}
                />
                <LeafMultilineTextInput
                    label={strings("inputLabel.description")}
                    onTextChange={(text: string) => setDescription(text)}
                />
                <LeafSelectionInput
                    navigation={navigation}
                    title={strings("inputLabel.category")}
                    items={[
                        new LeafSelectionItem<PatientEventCategory>(PatientEventCategory.medication.toString(), strings("label.category"), PatientEventCategory.medication),
                        new LeafSelectionItem<PatientEventCategory>(PatientEventCategory.other.toString(), strings("label.category"), PatientEventCategory.other)
                    ]}
                    selected={category != undefined ? new LeafSelectionItem<PatientEventCategory>(category.toString(), strings("label.category"), category) : null}
                    onSelection={(item: LeafSelectionItem<PatientEventCategory>) => setCategory(item.value)}
                />
            </VStack>
            <LeafButton
                label={"Done"}
                onPress={onDone}
            />
        </View>
    );
}

export default AddEventScreen;