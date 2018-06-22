import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers, bindActionCreators } from 'redux';
import thunk from 'redux-thunk';


import './index.css';

//*************
//*** REDUX ***
//*************

// *** ACTIONS
const INCREMENT_REQUESTED = 'counter/INCREMENT_REQUESTED';
const INCREMENT = 'counter/INCREMENT';
const DECREMENT_REQUESTED = 'counter/DECREMENT_REQUESTED';
const DECREMENT = 'counter/DECREMENT';

const actionCreators = {
  increment: () => {
    return dispatch => {
      dispatch({
        type: INCREMENT_REQUESTED
      })

      dispatch({
        type: INCREMENT
      })
    }
  },

  // incrementAsync = () => {
  //   return dispatch => {
  //     dispatch({
  //       type: INCREMENT_REQUESTED
  //     })
  //
  //     return setTimeout(() => {
  //       dispatch({
  //         type: INCREMENT
  //       })
  //     }, 3000)
  //   }
  // }

  decrement: () => {
    return dispatch => {
      dispatch({
        type: DECREMENT_REQUESTED
      })

      dispatch({
        type: DECREMENT
      })
    }
  }


}

//*** REDUCERS

const initialState = {
  count: 0,
  isIncrementing: false,
  isDecrementing: false
}

const counterReducer = (state = initialState, action) => {
  console.log('reducer', state, action)
  switch (action.type) {
    case INCREMENT_REQUESTED:
      return {
        ...state,
        isIncrementing: true
      }

    case INCREMENT:
      return {
        ...state,
        count: state.count + 1,
        isIncrementing: !state.isIncrementing
      }

    case DECREMENT_REQUESTED:
      return {
        ...state,
        isDecrementing: true
      }

    case DECREMENT:
      return {
        ...state,
        count: state.count - 1,
        isDecrementing: !state.isDecrementing
      }

    default:
      return state
  }
}

const rootReducer = combineReducers({ counterReducer })
const initialRootState = {};
const enhancers = [];
const middleware = [thunk];

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

const store = createStore(rootReducer, { counter: initialState }, composedEnhancers);


//*************
//*** REACT ***
//*************

class App extends React.Component {
  render() {
    console.log(this.props)
    return (
        <div>
          <h1>My App!!!</h1>
        </div>
    )
  }
}


const AppContainer = connect(
  function mapStateToProps(state, props) {
		return {
      counter: state.count
		};
	},
  function mapDispatchToProps(dispatch) {
		return bindActionCreators(actionCreators, dispatch);
	}
)(App);


ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.querySelector('#root')
)
