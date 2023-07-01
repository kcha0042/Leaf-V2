import React from 'react';
import { Searchbar } from 'react-native-paper';
import LeafColor from '../../styles/color/LeafColor';
import { strings } from '../../../../localisation/Strings';
import LeafColors from '../../styles/LeafColors';
import LeafIcon from '../LeafIcon/LeafIcon';
import LeafTypography from '../../styles/LeafTypography';

interface Props {
    searchQuery: string;
    onSearch: (query: string) => void;
}

const LeafSearchBar: React.FC<Props> = ({ 
    searchQuery,
    onSearch,
}) => {
    // Base the typography off body
    let searchTypography = LeafTypography.body;
    searchTypography.size = 18;

    return (
        <Searchbar
            placeholder={strings("search.underlying")}
            placeholderTextColor={LeafColors.textUnderlyingAccent.getColor()}
            onChangeText={onSearch}
            value={searchQuery}
            theme={{ colors: { primary: LeafColors.textDark.getColor() } }}
            icon={({ size, color }) => (
                <LeafIcon icon="magnify" color={new LeafColor(color)} size={size} style={{paddingLeft: 8}} />
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
}

export default LeafSearchBar;