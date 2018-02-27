import { 
	CONFIG_LOADED
} from '../../constants/types';
import * as apiCalls from '../../helpers/apiCalls'
import { normalize } from 'normalizr'
import * as schema from './ConfigSchema'



export const loadInitialApp = () => {
	return (dispatch) => {
		return apiCalls.getToken('acces_token').then(token => {
			return apiCalls.get('api/config', token).then(data => {
				let {entities, result} = normalize(data, schema.config);
				dispatch({
					type: CONFIG_LOADED,
					payload: entities
				})		
			})
		})
	}
}