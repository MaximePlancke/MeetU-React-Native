import { 
	SELECT_MESSAGE
} from '../../constants/types'
import { NavigationActions } from 'react-navigation'



export const selectMessage = (item) => {
	return (dispatch) => {
		dispatch({
			type: SELECT_MESSAGE,
			payload: item.key
		})
		dispatch(NavigationActions.navigate({ routeName: 'MessagesDetail', params: item }))
	}
}