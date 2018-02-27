import { 
	PROFILE_LOADED, PROFILE_CHANGED,
	SAVE_USER, SAVE_USER_SUCCESS,
	PROFILE_SELECT_CATEGORY
} from '../../constants/types';
import * as apiCalls from '../../helpers/apiCalls'
import { NavigationActions } from 'react-navigation'


export const loadInitialProfileState = () => {
	return (dispatch) => {
		return apiCalls.getToken('acces_token').then(token => {
			return apiCalls.get('api/me', token).then(data => {
				dispatch({
					type: PROFILE_LOADED,
					payload: data
				})		
			})
		})
	}
}


export const goToDetails = (routeName, params) => {
	return (dispatch) => {
		dispatch(NavigationActions.navigate({ routeName, params }))
	}
}

export const goToCategory = (categoryId) => {
	return (dispatch) => {
		dispatch({
			type: PROFILE_SELECT_CATEGORY,
			payload: categoryId
		})
		dispatch(NavigationActions.navigate({ routeName: 'ProfileCategory', params: {} }))
	}
}

export const onProfileChange = (key, value) => {
	return {
		type: PROFILE_CHANGED,
		payload: {key, value}
	}
}

export const saveUser = (user) => {
	return (dispatch) => {
		dispatch({
			type: SAVE_USER
		})
		return apiCalls.getToken('acces_token').then(token => {
			return apiCalls.put('api/users', user, token).then(data => {
				dispatch({
					type: SAVE_USER_SUCCESS,
					payload: data
				})
				dispatch(NavigationActions.navigate({ routeName: 'ProfileList' }))	
			})
		})
	}
}

