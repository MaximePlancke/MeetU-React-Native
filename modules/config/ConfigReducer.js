import { 
	CONFIG_LOADED
} from '../../constants/types'


const INITIAL_STATE = { 
	categories: [] 
};

export default (state = INITIAL_STATE, action) => {
	switch(action.type) {
		case CONFIG_LOADED: 
			return {...state, ...action.payload.config.currentConfig}
		default: 
			return state;
	}
}


// function configsById(state = INITIAL_STATE, action) => {
// 	switch(action.type) {
// 		case CONFIG_LOADED: 
// 		console.log('action.payload.categories', action.payload.categories)
// 			return {...state, ...action.payload}
// 		default: 
// 			return state;
// 	}
// }

// function allConfigs(state = INITIAL_STATE, action) => {
// 	switch(action.type) {
// 		case CONFIG_LOADED: 
// 		console.log('action.payload.categories', action.payload.categories)
// 			return {...state, ...action.payload}
// 		default: 
// 			return state;
// 	}
// }


// const configReducer = combineReducers({
//     byId : configsById,
//     allIds : allConfigs
// });

// export default configReducer
