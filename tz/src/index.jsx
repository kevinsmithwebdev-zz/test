import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import reducers from './reducers'
import AppContainer from './components/AppContainer'


let store = createStore(reducers);

ReactDOM.render(
	<Provider store={store}>
		<AppContainer />
	</Provider>,
	 document.getElementById('app')
);
