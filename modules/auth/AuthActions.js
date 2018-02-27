import { 
	USERNAME_CHANGED, PASSWORD_CHANGED, CHECK_PASSWORD_CHANGED, NAME_CHANGED,
	LOGIN_USER_SUCCESS, LOGIN_USER_FAIL, LOGIN_USER, LOGOUT_USER, AUTH_RESET_ERRORS,
	SIGNUP_USER, SIGNUP_USER_SUCCESS, SIGNUP_USER_FAIL,
	TOKEN_EXIST, TOKEN_IS_EMPTY, TOKEN_ERROR
} from '../../constants/types';
import * as apiCalls from '../../helpers/apiCalls'
import { NavigationActions } from 'react-navigation'
import { AsyncStorage } from 'react-native'


const accessProtectedRoute = (dispatch) => {
	return apiCalls.getToken('acces_token').then(token => {
		console.log('accessToken', token)
		// token='abc' // to remove

		if (token !== null){
			dispatch({
				type: TOKEN_EXIST,
				payload: token
			})
			return apiCalls.get('api/userInfo', token)
			.then(data => {
				console.log('dataaa', data)
				return { hasAccess: true }
			}, error => {
				console.log('error last', error)
				return { hasAccess: false }	
			})
		} else {
			dispatch({
				type: TOKEN_IS_EMPTY,
			})
			return { hasAccess: false }
		}
	}, error => {
		console.log('accessProtectedRoute', error)
		dispatch({
			type: TOKEN_ERROR,
		})
		return { hasAccess: false }
	})
}

// const _saveToken = async (acces_token, refresh_token) => {
//     try {
// 		await AsyncStorage.setItem('acces_token', acces_token)
// 		await AsyncStorage.setItem('refresh_token', refresh_token)
//     } catch (error) {
//   		console.log('AsyncStorage error: ' + error.message)
//     }
// }

// export const _deleteToken = async () => {
//     try {
// 		await AsyncStorage.removeItem('acces_token')
// 		await AsyncStorage.removeItem('refresh_token')
//     } catch (error) {
//   		console.log('AsyncStorage removal error: ' + error.message)
//     }
// }


// const getToken = async (dispatch, type) => {
//     try {
// 		var token = await AsyncStorage.getItem(type);
// 		console.log('token', token)
// 		if (token !== null){
// 			console.log('Recovered selection from disk: ' + token)
// 			dispatch({
// 				type: TOKEN_EXIST,
// 				payload: token
// 			})
// 			return token
// 			// dispatch(NavigationActions.navigate({ routeName: 'Main' }))
// 		} else {
// 			console.log('Initialized with no selection on disk.')
// 			dispatch({
// 				type: TOKEN_IS_EMPTY,
// 			})
// 			dispatch(NavigationActions.navigate({ routeName: 'Login' }))
// 			return null
// 		}
		
//     } catch (error) {
//   		console.log('AsyncStorage error: ' + error.message)
// 		dispatch({
// 			type: TOKEN_ERROR,
// 		})
// 		dispatch(NavigationActions.navigate({ routeName: 'Login' }))
// 		return null
//     }	
// }


export const loadInitialAuthState = () => {
	return (dispatch) => {
		accessProtectedRoute(dispatch).then(data => {
			if(data.hasAccess) {
				dispatch(NavigationActions.navigate({ routeName: 'Main' }))
			} else {
				dispatch(NavigationActions.navigate({ routeName: 'Login' }))
			}
		})	

		// apiCalls.get('api/userInfo')
		// .then(data => {
		// 	_saveToken(data.access_token, data.refresh_token).then(() => {
		// 		dispatch({
		// 			type: LOGIN_USER_SUCCESS,
		// 			payload: {}
		// 		})
		// 		dispatch(NavigationActions.navigate({ routeName: 'Main' }))	
		// 	})
		// }, error => {
		// 	dispatch({
		// 		type: LOGIN_USER_FAIL,
		// 		payload: error.message
		// 	})
	 //    })
	
	}
}


export const usernameChange = (text) => {
	return {
		type: USERNAME_CHANGED,
		payload: text
	}
}

export const passwordChange = (text) => {
	return {
		type: PASSWORD_CHANGED,
		payload: text
	}
}

export const checkPasswordChange = (text) => {
	return {
		type: CHECK_PASSWORD_CHANGED,
		payload: text
	}
}

export const nameChange = (text) => {
	return {
		type: NAME_CHANGED,
		payload: text
	}
}

export const signupUser = ({username, password, checkPassword, name}) => {
	// MAX TODO
	return (dispatch) => {
		dispatch({
			type: SIGNUP_USER
		})
		// setTimeout(() => {
			dispatch({
				type: SIGNUP_USER_SUCCESS,
				payload: {}
			})
			dispatch(NavigationActions.navigate({ routeName: 'Login' }))
		// }, 2000)
	}
}

export const loginUser = ({username, password}) => {
	return (dispatch) => {
		dispatch({
			type: LOGIN_USER
		})

		username = username.toLowerCase()
		apiCalls.login({username, password})
		.then(data => {
			apiCalls._saveToken(data.access_token, data.refresh_token).then(() => {
				dispatch({
					type: LOGIN_USER_SUCCESS,
					payload: data
				})
				dispatch(NavigationActions.navigate({ routeName: 'Main' }))	
			})
		}, error => {
			dispatch({
				type: LOGIN_USER_FAIL,
				payload: error.message
			})
	    })

	}
}

export const logoutUser = () => {
	return (dispatch) => {
		apiCalls._deleteToken().then(() => {
			dispatch({
				type: LOGOUT_USER
			})
			dispatch(NavigationActions.navigate({ routeName: 'Login' }))
		})
	}
}

export const resetError = () => {
	return {
		type: AUTH_RESET_ERRORS
	}
}

