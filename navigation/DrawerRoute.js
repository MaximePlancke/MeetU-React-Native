import React, { Component } from 'react'
import { connect } from 'react-redux'
import { DrawerNavigator, addNavigationHelpers, DrawerItems } from "react-navigation"
import HomePage from '../components/HomePage'
import { Icon } from 'react-native-elements'
import { Text, ScrollView } from 'react-native'


export const DrawerRouteParams = DrawerNavigator({
	Home: { 
		screen: HomePage,
		navigationOptions: ({navigation}) => ({
    		drawerLabel: 'Home',
    		headerTitle: "Home",
    	})
	}
}, {
	contentComponent: props => <ScrollView><Text>Your Own Header Area Before</Text><DrawerItems {...props} /></ScrollView>,
});