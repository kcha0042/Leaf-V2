import React, { useEffect } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import StateManager from "../../../../state/publishers/StateManager";
import LeafColors from "../../styles/LeafColors";
import LeafTypography from "../../styles/LeafTypography";
import LeafText from "../../views/LeafText/LeafText";
import { Searchbar } from 'react-native-paper';
import LeafSidebarItem from "../LeafSidebarItem";

interface Props {
    items: LeafSidebarItem[];
    title: string;
    searchable: boolean;
}

/**
 * Renders an item list, we wrap each item in a touchable opacity so that we can overwrite the onPress of the item component. 
 * The onPress calls the passProps function of the item then updates state telling our drawer to render the stack next to the sidebar
 * @param param0 {@link Props}
 * @returns our custom sidebar
 */
export const Sidebar: React.FC<Props> = ({ items, title, searchable }) => {

    useEffect(() => {
        StateManager.drawerShowStack.publish(false);
    }, [])

    // Searchbar
    const [ searchQuery, setSearchQuery ] = React.useState('');
    const [ filteredSidebarItems, setFilteredSidebarItems] = React.useState(items)

    // Filter items
    const onChangeSearch = (query) => {
        setFilteredSidebarItems(items.filter(item => item.searchableString != undefined ? item.searchableString.includes(query) : false));
        setSearchQuery(query);
    }

    return (
        <SafeAreaView style={styles.container}>
            <LeafText typography={LeafTypography.header} style={{ padding: 10 }}> 
                { title }
            </LeafText>

            {
                searchable ? 
                    <View style={styles.searchBarWrapper}>
                        {/* TODO: add style to search bar */}
                        <Searchbar
                            placeholder="Search"
                            onChangeText={onChangeSearch}
                            value={searchQuery}
                        />
                    </View>
                :
                    null
            }

            <ScrollView>
                {
                    filteredSidebarItems.map(item => {
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    item.passProps();
                                    StateManager.drawerShowStack.publish(true);
                                }}
                            >
                                <item.component />
                            </TouchableOpacity>
                        )
                    })
                }
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRightWidth: 0.5,
        backgroundColor: LeafColors.screenBackgroundLight.getColor(),
        borderColor: LeafColors.sideBarBorderLight.getColor()
    },
    searchBarWrapper: {
        padding: 5
    }
})