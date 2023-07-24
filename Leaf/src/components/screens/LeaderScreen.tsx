import React from "react";
import LeafColors from "../styling/LeafColors";
import AllocatePatientsScreen from "./AllocatePatientsScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";

const LeaderScreen: React.FC = () => {
    return (
        <SafeAreaView style={style.safeArea}>
            <AllocatePatientsScreen />
        </SafeAreaView>
    );
};

const style = StyleSheet.create({
    safeArea: {
        backgroundColor: LeafColors.screenBackgroundLight.getColor(),
        flex: 1,
    },
});

export default LeaderScreen;
