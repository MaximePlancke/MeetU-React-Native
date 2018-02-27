import React, { Component } from 'react'
import { Provider, connect } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { RootRouteContainer } from './navigation/RootRoute'
import reducers from './rootReducer'
import ReduxThunk from 'redux-thunk'

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

class App extends Component {

	render() {
		return (
			<Provider store={store}>
				<RootRouteContainer/>
			</Provider>
		);
	}
}

export default App;