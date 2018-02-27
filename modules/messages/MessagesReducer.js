import { 
	SELECT_MESSAGE
} from '../../constants/types'

//USE NORMALIZR
const INITIAL_STATE = { 
	selectedMessage: null, 
	list: [
		{
		  	data: [
		  		{
		  			key: 1,
				    name: 'Amy Farha 1',
				    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
				    subtitle: 'Vice President',
				    messages: [
				    	{}
				    ]
			  	}
		  	],
		  	key: 1
		},
		{
			data: [			    
				{
			    	key: 2,
				    name: 'Chris Jackson 2',
				    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
				    subtitle: 'MessagesPage',
				    messages: []
			    }
			],
			key: 2
		}
	]
};


export default (state = INITIAL_STATE, action) => {
	switch(action.type) {
		case SELECT_MESSAGE:
			return {...state, selectedMessage: action.payload}
		default: 
			return state;
	}
}