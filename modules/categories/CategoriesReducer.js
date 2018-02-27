import { 
	CONFIG_LOADED
} from '../../constants/types'


const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
	switch(action.type) {
		case CONFIG_LOADED: 
			return {...state, ...action.payload.categories}
		default: 
			return state;
	}
}
