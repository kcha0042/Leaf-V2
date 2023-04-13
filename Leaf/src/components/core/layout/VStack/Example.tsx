import React from 'react';
import { StyleSheet, View } from 'react-native';

const Example = props => {
    return (
        <View style={{...styles.example, ...props.style, paddingRight: props.spacing}}>
            {props.children}
        </View>
    );
};

const styles = StyleSheet.create({
    example: {
        backgroundColor: 'red',
        flex: 1,
        justifyContent: 'center',
        padding: 15,
    }
});

//export default Example;