import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Alert } from 'react-native'
import { Input, Spinner } from './common'
import { ProfileActions, ProfileSelectors } from '../modules/profile'
import { MAIN_COLOR } from '../constants/constants'
import { Button } from 'react-native-elements'

const { getSelectorPasswordProfile } = ProfileSelectors
const { onProfileChange, saveUser } = ProfileActions


class ProfilePasswordPage extends Component { 

	onPasswordChange(text) {
		this.props.onProfileChange('password', text)
	}

	onConfirmPasswordChange(text) {
		this.props.onProfileChange('confirmPassword', text)
	}

	onButtonPress() {
		const { password, confirmPassword } = this.props.profile
		if(!password) {
			Alert.alert(
		  		'Warning',
		  		'Password cannot be empty',
			  	[ {text: 'Close'} ]
			)
		} else if(password !== confirmPassword) {
			Alert.alert(
		  		'Warning',
		  		'Passwords are not similar',
			  	[ {text: 'Close'} ]
			)
		} else {
			this.props.saveUser({ password })
		}
		
	}

	componentWillUnmount() {
		console.log('componentWillUnmount')
		this.props.onProfileChange('confirmPassword', '')
		this.props.onProfileChange('password', '')
	}

	renderButton() {
		const { loading } = this.props.profile
		if(loading) {
			return <Spinner size="large"/>
		}
		return(
			<Button
				disabled={loading}
				raised
				large
				title="Save"
				onPress={this.onButtonPress.bind(this)} 
				buttonStyle={styles.button}
			/>
		)
	}

	render() {
		const { profile } = this.props
		return (
			<View>
				<Input 
					label="Password"
					placeholder=""
					value={profile.password}
					onChangeText={this.onPasswordChange.bind(this)}
					secureTextEntry={true}
				/>

				<Input 
					label="Confirm Password"
					placeholder=""
					value={profile.confirmPassword}
					onChangeText={this.onConfirmPasswordChange.bind(this)}
					secureTextEntry={true}
				/>

				<View style={{height: 80}}>
					{this.renderButton()}
				</View>

			</View>
		)
	}
}

const styles = {
	button: {
		backgroundColor: MAIN_COLOR
	}
}

const mapStateToProps = state => {
	return { profile : getSelectorPasswordProfile(state) }
}

export default connect(mapStateToProps, { onProfileChange, saveUser })(ProfilePasswordPage);