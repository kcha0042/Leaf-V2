import React from "react";
import LeafColors from "../styling/LeafColors";
import AllWorkersScreen from "./AllWorkersScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";

const LeaderScreen: React.FC = () => {
    return (
        <SafeAreaView style={style.safeArea}>
            <AllWorkersScreen />
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
