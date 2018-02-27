import { 
	USERNAME_CHANGED, PASSWORD_CHANGED, CHECK_PASSWORD_CHANGED, NAME_CHANGED,
	LOGIN_USER_SUCCESS, LOGIN_USER_FAIL, LOGIN_USER, LOGOUT_USER, AUTH_RESET_ERRORS,
	SIGNUP_USER, SIGNUP_USER_SUCCESS, SIGNUP_USER_FAIL,
	TOKEN_EXIST, TOKEN_IS_EMPTY, TOKEN_ERROR
} from '../../constants/types'


const INITIAL_STATE = { 
	username: '', 
	password: '', 
	checkPassword: '',
	name: '',
	errors: '',
	loading: false,
	hasToken: false,
};


export default (state = INITIAL_STATE, action) => {
	switch(action.type) {
		case USERNAME_CHANGED: 
			return {...state, username: action.payload}
		case PASSWORD_CHANGED: 
			return {...state, password: action.payload}
		case CHECK_PASSWORD_CHANGED: 
			return {...state, checkPassword: action.payload}
		case NAME_CHANGED: 
			return {...state, name: action.payload}
		case LOGIN_USER:
			return {...state, loading: true, errors: INITIAL_STATE.errors}
		case AUTH_RESET_ERRORS:
			return {...state, errors: INITIAL_STATE.errors}
		case LOGIN_USER_SUCCESS:
			return {...state, hasToken: true, username: INITIAL_STATE.username, password: INITIAL_STATE.password, loading: false}
		case LOGIN_USER_FAIL:
			return {...state, loading: false, errors: action.payload }
		case LOGOUT_USER:
			return {...state, user: INITIAL_STATE.user, hasToken: false }
		case TOKEN_EXIST:
			return {...state, hasToken: true }
		case TOKEN_IS_EMPTY:
		case TOKEN_ERROR:
			return {...state, hasToken: false }
		default: 
			return state;
	}
}