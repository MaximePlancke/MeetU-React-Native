import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native'
import { Button } from 'react-native-elements'
import { AuthActions } from '../modules/auth'
import { ConfigActions } from '../modules/config'

const { logoutUser } = AuthActions
const { loadInitialApp } = ConfigActions

class HomePage extends Component {

	componentWillMount() {
		this.props.loadInitialApp()	
	}

	onPressLogout() {
		this.props.logoutUser()
	}

	render() {
		return (
			<View>
				<Button
					raised
					large
					title="Logout"
					onPress={this.onPressLogout.bind(this)} 
				/>
			</View>
		)
	}
}

const mapStateToProps = state => {
	return {};
}

export default connect(mapStateToProps, { logoutUser, loadInitialApp })(HomePage);