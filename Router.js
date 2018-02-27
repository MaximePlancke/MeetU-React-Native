import React from 'react'
import { RootRouteParams } from './navigation/RootRoute'
import { DrawerRouteParams } from './navigation/DrawerRoute'
import { MainRouteParams } from './navigation/MainRoute'


// const initialState = {
	// root: RootRouteParams.router.getStateForAction(RootRouteParams.router.getActionForPathAndParams('Splash')),
	// drawer: DrawerRouteParams.router.getStateForAction(DrawerRouteParams.router.getActionForPathAndParams('Home')),
	// main: MainRouteParams.router.getStateForAction(MainRouteParams.router.getActionForPathAndParams('Drawer')),
// }
	
const initialState = RootRouteParams.router.getStateForAction(RootRouteParams.router.getActionForPathAndParams('Splash'))

export const NavReducer = (state = initialState, action) => {
	// const newState = { 
	// 	root: RootRouteParams.router.getStateForAction(action, state.root),
	// 	drawer: DrawerRouteParams.router.getStateForAction(action, state.drawer),
	// 	main: MainRouteParams.router.getStateForAction(action, state.main)    
	// }
	const newState = RootRouteParams.router.getStateForAction(action, state)
  	return newState || state;
};
