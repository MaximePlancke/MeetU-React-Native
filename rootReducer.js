import { combineReducers } from 'redux'
import { AuthReducer } from './modules/auth'
import { MessagesReducer } from './modules/messages'
import { ProfileReducer } from './modules/profile'
import { ConfigReducer } from './modules/config' 
import { CategoriesReducer } from './modules/categories'
import { NavReducer } from './Router'

export default combineReducers({
	auth: AuthReducer,
	messages: MessagesReducer,
	profile: ProfileReducer,
	nav: NavReducer,
	config: ConfigReducer, // have some changes cleanup to do here
	categories: CategoriesReducer
})