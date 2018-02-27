import { API_ROOT, GRANT_TYPE_PASSWORD, GRANT_TYPE_REFRESH, CLIENT_ID, CLIENT_SECRET, HEADERS } from '../constants/constants'
import { AsyncStorage } from 'react-native'

const bodyGrantTypePassword = {
	grant_type: GRANT_TYPE_PASSWORD,
	client_id: CLIENT_ID,
	client_secret: CLIENT_SECRET
}

const bodyGrantTypeRefresh = {
	grant_type: GRANT_TYPE_REFRESH,
	client_id: CLIENT_ID,
	client_secret: CLIENT_SECRET
}

const listOfCallsIfTokenExpired = [];

const authByRefreshToken = (endpoint, method) => {
	console.log('endpoint', endpoint)
	listOfCallsIfTokenExpired.push({endpoint, method})
	if(listOfCallsIfTokenExpired.length > 1) {
		console.log('already calling refresh token call')
		return Promise.resolve(null)
	}
	return getToken('refresh_token').then(refresh_token => {
		if (refresh_token !== null){
			return post('oauth/token', {...bodyGrantTypeRefresh, refresh_token}).then(data => {
				_saveToken(data.access_token, data.refresh_token).then(() => {
					console.log('save Token', listOfCallsIfTokenExpired)
					listOfCallsIfTokenExpired.map(call => {
						console.log('call', call, data.access_token)
						switch(call.method) {
							case 'get':
								return get(call.endpoint, data.access_token)
							case 'post':
								return post(call.endpoint, {}, data.access_token)
							case 'put':
								return put(call.endpoint, {},  data.access_token)
						}
					})
					listOfCallsIfTokenExpired.length = 0
					return Promise.resolve(null)
				})
			}, error => {
				throw Error('post oauth/token ' + error.message)
			})
		} else {
			// throw Error('Unauthorized 2')
			console.log('empty refresh_token')
			return Promise.resolve(null)
		}
	}, error => {
		throw Error('getToken ' + error.message)
	})
}

const returnErrorOrJson = (resp, endpoint, method) => {
	console.log('returnErrorOrJson', endpoint)
	if(resp.ok) {
		return resp.json()
	} else {
		if(resp.status == 401) {
			return authByRefreshToken(endpoint, method).then(token => {
				console.log('new token', token)
			}, error => {
				throw Error('authByRefreshToken ' + error.message)
			})
		} else {
			return resp.json().then(data => {throw Error(data.error_description)})
		}
	}
}

export const _saveToken = async (acces_token, refresh_token) => {
    try {
		await AsyncStorage.setItem('acces_token', acces_token)
		await AsyncStorage.setItem('refresh_token', refresh_token)
    } catch (error) {
  		console.log('AsyncStorage error: ' + error.message)
    }
}

export const _deleteToken = async () => {
    try {
		await AsyncStorage.removeItem('acces_token')
		await AsyncStorage.removeItem('refresh_token')
    } catch (error) {
  		console.log('AsyncStorage removal error: ' + error.message)
    }
}

export const getToken = async (type) => {
    try {
		var token = await AsyncStorage.getItem(type);
		console.log('token', token)
		return token
    } catch (error) {
  		console.log('AsyncStorage error: ' + error.message)
		return null
    }	
}


export const login = (params) => {
	return post('oauth/token', {...bodyGrantTypePassword, ...params})
}

export const post = (endpoint, params, token = null) => {
	HEADERS.Authorization = `Bearer ${token}`
	return fetch(`${API_ROOT}${endpoint}`, { 
	    method: 'POST', 
	    body: JSON.stringify(params),
	    headers: HEADERS
	})
	.then(resp => returnErrorOrJson(resp, endpoint, 'post'), error => {throw Error(error)})
}

export const put = (endpoint, params, token = null) => {
	HEADERS.Authorization = `Bearer ${token}`
	return fetch(`${API_ROOT}${endpoint}`, { 
	    method: 'PUT', 
	    body: JSON.stringify(params),
	    headers: HEADERS
	})
	.then(resp => returnErrorOrJson(resp, endpoint, 'put'), error => {throw Error(error)})
}

export const get = (endpoint, token = null) => {
	HEADERS.Authorization = `Bearer ${token}`
	return fetch(`${API_ROOT}${endpoint}`, { 
	    method: 'GET', 
	    headers: HEADERS
	})
	.then(resp => returnErrorOrJson(resp, endpoint, 'get'), error => {throw Error(error)})
}