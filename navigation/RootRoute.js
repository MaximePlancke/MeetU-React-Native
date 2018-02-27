import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StackNavigator, addNavigationHelpers, DrawerNavigator, DrawerItems } from "react-navigation"
import Splash from '../components/Splash'
import LoginForm from '../components/LoginForm'
import SignupForm from '../components/SignupForm'
import { MainRouteParams } from './MainRoute'



export const RootRouteParams = StackNavigator(
	{
		Splash: { 
			screen: Splash 
		},
		Login: { 
			screen: LoginForm,
		},
		Signup: { 
			screen: SignupForm 
		},
		Main: {
			screen: MainRouteParams
		}
	},
	{
		initialRouteName: 'Splash',
		headerMode: 'none',
		cardStyle: {
			// paddingTop: 25
		}
	}
)


class RootRoute extends Component {
	render() {
		return (
			<RootRouteParams
                navigation={addNavigationHelpers({
                    dispatch: this.props.dispatch,
                    state: this.props.nav
                })}
            />
		)
	}
}

const mapStateToProps = state => {
	return {
		// nav: state.nav.root
		nav: state.nav
	}
}

export const RootRouteContainer = connect(mapStateToProps)(RootRoute)