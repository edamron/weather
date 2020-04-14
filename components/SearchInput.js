import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const SearchInput = (props) => {
    const [city, setCity] = useState('');

    return (
        <View style={ styles.container } >
            <TextInput
                autoCorrect={ false }
                placeholder={ props.placeholder }
                placeholderTextColor="white"
                underlineColorAndroid="transparent"
                style={ styles.textInput }
                clearButtonMode="always"
                onChangeText={ (text) => setCity(text) }
                onSubmitEditing={ () => props.onSubmit(city) }
            />
        </View>
    );
}

SearchInput.propTypes = {
    placeholder: PropTypes.string,
    onSubmit: PropTypes.func.isRequired,
};

SearchInput.defaultProps = {
    placeholder: 'City name',
};

export default SearchInput;

const styles = StyleSheet.create({
    container: {
        height: 40,
        width: 300,
        marginTop: 20,
        backgroundColor: '#666',
        marginHorizontal: 40,
        paddingHorizontal: 10,
        borderRadius: 5,
        alignSelf: 'center',
      },
    textInput: {
        flex: 1,
        color: 'white',
    },
});