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
import VStack from "../containers/VStack";
import NavigationSession from "../navigation/state/NavigationEnvironment";
import LeafColors from "../styling/LeafColors";
import LeafDimensions from "../styling/LeafDimensions";
import DefaultScreenContainer from "./containers/DefaultScreenContainer";
import ValidateUtil from "../../utils/ValidateUtil";
import Session from "../../model/session/Session";
import PatientEvent from "../../model/patient/PatientEvent";

interface Props {
    navigation?: NavigationProp<ParamListBase>;
}

const AddEventScreen: React.FC<Props> = ({ navigation }) => {
    const [title, setTitle] = useState<string | undefined>();
    const [triggerTime, setTriggerTime] = useState<Date | undefined>();
    const [description, setDescription] = useState<string | undefined>();
    const [category, setCategory] = useState<PatientEventCategory | undefined>();

    const allIsValid = (): boolean => {
        return (
            ValidateUtil.stringIsValid(title) &&
            ValidateUtil.valueIsDefined(triggerTime) &&
            ValidateUtil.stringIsValid(description) &&
            ValidateUtil.valueIsDefined(category)
        );
    };

    const onSubmit = async () => {
        if (allIsValid()) {
            // We force-unwrap everything because we assume everything is validated already
            // If allIsValid() is every removed, TAKE OUT THE FORCE UNWRAPS
            // Otherwise this WILL cause errors
            const event = PatientEvent.new(triggerTime!, title!, description!, category!);
            const successful = await Session.inst.submitPatientEvent(event);
            if (successful) {
                // TODO: snackbar
                NavigationSession.inst.navigateBack(navigation);
            }
        } else {
            // TODO: snackbar
        }
    };

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: LeafColors.screenBackgroundLight.getColor(),
                padding: LeafDimensions.screenPadding,
            }}
        >
            <VStack
                spacing={LeafDimensions.screenSpacing}
                style={{
                    flex: 1,
                }}
            >
                <LeafTextInput label={strings("inputLabel.title")} onTextChange={(text: string) => setTitle(text)} />

                <LeafTimeInput
                    label={strings("inputLabel.triggerTime")}
                    onChange={(date?: Date) => setTriggerTime(date)}
                />

                <LeafMultilineTextInput
                    label={strings("inputLabel.description")}
                    onTextChange={(text: string) => setDescription(text)}
                />

                <LeafSelectionInput
                    navigation={navigation}
                    title={strings("inputLabel.category")}
                    items={[
                        new LeafSelectionItem<PatientEventCategory>(
                            PatientEventCategory.medication.toString(),
                            strings("label.category"),
                            PatientEventCategory.medication,
                        ),
                        new LeafSelectionItem<PatientEventCategory>(
                            PatientEventCategory.other.toString(),
                            strings("label.category"),
                            PatientEventCategory.other,
                        ),
                    ]}
                    selected={
                        category != undefined
                            ? new LeafSelectionItem<PatientEventCategory>(
                                  category.toString(),
                                  strings("label.category"),
                                  category,
                              )
                            : undefined
                    }
                    onSelection={(item: LeafSelectionItem<unknown> | undefined) => {
                        if (!item) {
                            setCategory(undefined);
                        } else {
                            setCategory((item as LeafSelectionItem<PatientEventCategory>).value);
                        }
                    }}
                />
            </VStack>

            <LeafButton label={strings("button.submit")} onPress={onSubmit} />
        </View>
    );
};

export default AddEventScreen;
