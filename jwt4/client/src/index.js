import React from 'react'
import ReactDOM from 'react-dom'
// import { Provider } from 'react-redux'
// import { createStore } from 'redux'

import App from './components/App'
import registerServiceWorker from './registerServiceWorker'

// import reducers from './redux/reducers/reducers'

import './index.css'

// const store = createStore(reducers)


ReactDOM.render(
    <App />,
  document.getElementById('root')
)

registerServiceWorker()
