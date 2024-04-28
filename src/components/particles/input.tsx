/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Image,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from 'react-native';

interface TextInputProps {
  isSearch?: boolean;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
}

const Input = ({
  value,
  onChangeText,
  isSearch = false,
  placeholder,
  onBlur,
}: TextInputProps) => {
  return (
    <View style={styles.textInputBox}>
      {isSearch && (
        <Image
          source={require('../../assets/search.png')}
          style={styles.searchImage}
        />
      )}
      <TextInput
        onBlur={onBlur}
        onChangeText={onChangeText}
        value={value}
        style={{...styles.textInput, marginLeft: isSearch === true ? 12 : 0}}
        numberOfLines={1}
        maxLength={20}
        placeholder={placeholder}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textInputBox: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: '#D9D8DA',
    backgroundColor: 'white',
    paddingLeft: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    color: 'black',
    fontSize: 16,
  },
  searchImage: {
    width: 13,
    height: 13,
  },
});

export default Input;
