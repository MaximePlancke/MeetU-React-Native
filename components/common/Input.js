import React from 'react'
import { View } from 'react-native'
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'

const Input = ({ label, value, onChangeText, placeholder, secureTextEntry, multiline, errorMessage }) => {
	return (
		<View>
			<FormLabel>{label}</FormLabel>
			<FormInput 
				// style={{borderColor: 'gray'}}
				multiline={multiline}
				secureTextEntry={secureTextEntry}
				autoCorrect={false}
				placeholder={placeholder} 
				value={value}
				onChangeText={onChangeText}
				maxHeight={100}
			/>
			<FormValidationMessage>{errorMessage}</FormValidationMessage>
		</View>
	)
}

export { Input }