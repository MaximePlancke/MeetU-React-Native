import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, Alert } from 'react-native'
import { Button, Avatar } from 'react-native-elements'
import { AuthActions, AuthSelectors } from '../modules/auth'
import { LogoHeader, Input, Spinner } from './common'
import { MAIN_COLOR } from '../constants/constants'


const { getSelectorAuth } = AuthSelectors
const { usernameChange, passwordChange, loginUser, resetError } = AuthActions


class LoginForm extends Component {

	componentWillReceiveProps(nextProps) {
		if(nextProps.errors) {
			// Alert.alert(
		 //  		'Error',
		 //  		nextProps.errors,
			//   	[ {text: 'Close', onPress: () => this.props.resetError()} ]
			// )
		}
	}

	onButtonPress() {
		const { username, password } = this.props
		this.props.loginUser({ username, password })
	}

	onSignupButtonPress() {
		this.props.navigation.navigate('Signup')
	}

	onUsernameChange(text) {
		this.props.usernameChange(text)
	}

	onPasswordChange(text) {
		this.props.passwordChange(text)
	}

	renderButton() {
		if(this.props.loading) {
			return <Spinner size="large"/>
		}
		return(
			<Button
				disabled={this.props.loading}
				raised
				large
				title="Let's go"
				onPress={this.onButtonPress.bind(this)} 
				buttonStyle={styles.button}
			/>
		)
	}

	render() {
		return (
			<View style={styles.container}>

				<LogoHeader/>

				<View>

					<Input 
						label="Email"
						placeholder=""
						value={this.props.username}
						onChangeText={this.onUsernameChange.bind(this)}
						// errorMessage={this.props.errors.username}
					/>

					<Input 
						label="Password"
						secureTextEntry={true}
						placeholder=""
						value={this.props.password}
						onChangeText={this.onPasswordChange.bind(this)}
						// errorMessage={this.props.errors.password}
					/>

				</View>

				<View style={{height: 80}}>
					{this.renderButton()}
				</View>

				<Text style={styles.signupText} onPress={this.onSignupButtonPress.bind(this)} >Sign up</Text>

			</View> 

		)
	}
}

const styles = {
	container: {
		marginTop: 20,
		marginBottom: 20,
		flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between'
	},
	button: {
		backgroundColor: MAIN_COLOR
	},
	signupText: {
		textAlign: 'center'
	}
}

const mapStateToProps = (state, props) => {
	return { ...getSelectorAuth(state) }
}

export default connect(mapStateToProps, {usernameChange, passwordChange, loginUser, resetError})(LoginForm);

