import React from "react";
import { Searchbar } from "react-native-paper";
import LeafColor from "../../styling/color/LeafColor";
import { strings } from "../../../localisation/Strings";
import LeafColors from "../../styling/LeafColors";
import LeafIcon from "../LeafIcon/LeafIcon";
import LeafTypography from "../../styling/LeafTypography";

/*
// EXAMPLE

const [searchQuery, setSearchQuery] = React.useState("");
const onSearch = (query: string) => {
    setSearchQuery(query);

    // Do something with query
    // ...
}

// ...

<LeafSearchBar searchQuery={searchQuery} onSearch={onSearch}></LeafSearchBar>
 */

interface Props {
    // The search query (what text is being searched)
    // (Passed in so parent components can manage the search query - e.g. a "clear filters" button may want to clear the search query)
    searchQuery: string;
    // Callback for when the user changes the search text
    onSearch: (query: string) => void;
}

const LeafSearchBar: React.FC<Props> = ({ searchQuery, onSearch }) => {
    // Base the typography off body
    const searchTypography = LeafTypography.body;
    searchTypography.size = 18;

    return (
        <Searchbar
            placeholder={strings("search.underlying")}
            placeholderTextColor={LeafColors.textUnderlyingAccent.getColor()}
            onChangeText={onSearch}
            value={searchQuery}
            theme={{ colors: { primary: LeafColors.textDark.getColor() } }}
            icon={({ size, color }) => (
                <LeafIcon icon="magnify" color={new LeafColor(color)} size={size} style={{ paddingLeft: 8 }} />
            )}
            iconColor={LeafColors.textDark.getColor()}
            inputStyle={{
                color: LeafColors.textDark.getColor(),
                ...searchTypography.getStylesheet(),
                marginVertical: -10,
            }}
            style={{
                backgroundColor: LeafColors.textBackgroundAccent.getColor(),
                borderRadius: 30,
                borderWidth: 1,
                borderColor: LeafColors.outlineTextBackgroundAccent.getColor(),
                height: 55,
            }}
        />
    );
};

export default LeafSearchBar;
