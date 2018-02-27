import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StackNavigator, addNavigationHelpers, TabNavigator } from "react-navigation"
import { Icon } from 'react-native-elements'
import HomePage from '../components/HomePage'
import ProfilePage from '../components/ProfilePage'
import ProfileGeneralPage from '../components/ProfileGeneralPage'
import ProfilePasswordPage from '../components/ProfilePasswordPage'
import ProfileCategoryPage from '../components/ProfileCategoryPage'
import MessagesListPage from '../components/MessagesListPage'
import MessagesDetailsPage from '../components/MessagesDetailsPage'


const ProfileContainer = StackNavigator({
	ProfileList: {
		screen: ProfilePage,
		navigationOptions: {
			title: 'My Profile'
		}	
	},
	ProfileGeneral: {
		screen: ProfileGeneralPage,
		navigationOptions: ({ navigation }) => ({
			title: 'General'
		})	
	},
	ProfilePassword: {
		screen: ProfilePasswordPage,
		navigationOptions: ({ navigation }) => ({
			title: 'Password'
		})	
	},
	ProfileCategory: {
		screen: ProfileCategoryPage,
		navigationOptions: ({ navigation }) => ({
			title: `${navigation.state.params.name}`
		})	
	}
}, {
	// mode: 'modal',
	initialRouteName: 'ProfileList'
})


const DashboardContainer = StackNavigator({
	GeneralDashboard: {
		screen: HomePage,
		navigationOptions: {
			title: 'My Match'
		}	
	},
	//Search
}, {
	// mode: 'modal',
	initialRouteName: 'GeneralDashboard'
})

const MessagesContainer = StackNavigator({
	MessagesList: {
		screen: MessagesListPage,
		navigationOptions: {
			title: 'My Conversations'
		}	
	},
	MessagesDetail: {
		screen: MessagesDetailsPage,
		navigationOptions: ({ navigation }) => ({
			title: `${navigation.state.params.name}`
		})	
	},
}, {
	initialRouteName: 'MessagesList'
})


export const MainRouteParams = TabNavigator({
	Home: { 
		screen: DashboardContainer,
		navigationOptions: ({navigation}) => ({
			tabBarLabel: 'My Match',
		    tabBarIcon: ({ tintColor }) => (
		      <Icon
		      	name="public"
		        style={[{width: 26, height: 26}]}
		        color={tintColor}
		      />
		    )
    	})
	},
	Messages: { 
		screen: MessagesContainer,
		navigationOptions: ({navigation}) => ({
			tabBarLabel: 'My Conversations',
		    tabBarIcon: ({ tintColor }) => (
		      <Icon
		      	name="textsms"
		        style={[{width: 26, height: 26}]}
		        color={tintColor}
		      />
		    )
    	})
	},
	Profile: { 
		screen: ProfileContainer,
		navigationOptions: ({navigation}) => ({
			tabBarLabel: 'My Profile',
		    tabBarIcon: ({ tintColor }) => (
		      <Icon
		      	name="face"
		        style={[{width: 26, height: 26}]}
		        color={tintColor}
		      />
		    )
    	})
	}
}, {
	initialRouteName: 'Home'
});