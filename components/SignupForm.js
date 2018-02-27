import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text } from 'react-native'
import { Button, Avatar } from 'react-native-elements'
import { AuthActions, AuthSelectors } from '../modules/auth'
import { LogoHeader, Input, Spinner } from './common'
import { MAIN_COLOR } from '../constants/constants'

const { getSelectorAuth } = AuthSelectors
const { usernameChange, passwordChange, checkPasswordChange, nameChange, signupUser } = AuthActions

class SignupForm extends Component {
	onButtonPress() {
		const { username, password, checkPassword, name } = this.props
		this.props.signupUser({ username, password, checkPassword, name })
	}

	onUsernameChange(text) {
		this.props.usernameChange(text)
	}

	onPasswordChange(text) {
		this.props.passwordChange(text)
	}

	onCheckPasswordChange(text) {
		this.props.checkPasswordChange(text)
	}

	onNameChange(text) {
		this.props.nameChange(text)
	}

	onLoginButtonPress() {
		this.props.navigation.navigate('Login')
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
						errorMessage={this.props.errors.username}
					/>

					<Input 
						label="Name"
						placeholder=""
						value={this.props.name}
						onChangeText={this.onNameChange.bind(this)}
						errorMessage={this.props.errors.name}
					/>

					<Input 
						label="Password"
						secureTextEntry={true}
						placeholder=""
						value={this.props.password}
						onChangeText={this.onPasswordChange.bind(this)}
						errorMessage={this.props.errors.password}
					/>

					<Input 
						label="Check Password"
						secureTextEntry={true}
						placeholder=""
						value={this.props.checkPassword}
						onChangeText={this.onCheckPasswordChange.bind(this)}
						errorMessage={this.props.errors.checkPassword}
					/>

				</View>

				<View style={{height: 80}}>
					{this.renderButton()}
				</View>

				<Text style={styles.loginText} onPress={this.onLoginButtonPress.bind(this)} >Already have an account</Text>

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
	loginText: {
		textAlign: 'center'
	}
}

const mapStateToProps = (state, props) => {
	return { ...getSelectorAuth(state) }
}

export default connect(mapStateToProps, {usernameChange, passwordChange, checkPasswordChange, nameChange, signupUser})(SignupForm);