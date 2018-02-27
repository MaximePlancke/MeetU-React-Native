import { 
	PROFILE_LOADED, PROFILE_CHANGED,
	SAVE_USER, SAVE_USER_SUCCESS,
	PROFILE_SELECT_CATEGORY
} from '../../constants/types'


const INITIAL_STATE = { 
	name: '', 
	username: '',
	password: '',
	confirmPassword: '',
	gender: null,
	avatar: '',
	firstTime: null,
	created: null,
	lastLogin: null,
	bio: '',
	location: null,
	pictures: [],
	categories: {
		1: {
			knows: [],
			wants: []
		},
		2: {
			knows: [],
			wants: []
		},
		3: {
			knows: [],
			wants: []
		}
	},
	loading: false,
	selectedCategory: null
};


export default (state = INITIAL_STATE, action) => {
	switch(action.type) {
		case PROFILE_LOADED:
			return { ...state, ...action.payload }
		case PROFILE_CHANGED:
			return {...state, [action.payload.key]: action.payload.value}
		case SAVE_USER:
			return {...state, loading: true}
		case SAVE_USER_SUCCESS:
			return {...state, ...action.payload, loading: false, password: INITIAL_STATE.password, confirmPassword: INITIAL_STATE.confirmPassword}
		case PROFILE_SELECT_CATEGORY:
			return {...state, selectedCategory: action.payload}
		default: 
			return state;
	}
}