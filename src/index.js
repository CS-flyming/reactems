import React from 'react'
import ReactDOM from 'react-dom'
import {
	BrowserRouter as Router,
	Route
} from 'react-router-dom'
import {
	createStore,
	applyMiddleware
} from 'redux'
import {
	Provider
} from 'react-redux'
import {
	createLogger
} from 'redux-logger'
import thunk from 'redux-thunk'
import reducer from './reducers'
import {
	initEnv
} from 'actions'
import registerServiceWorker from './registerServiceWorker'
import 'assets/less/base.less'
import App from 'containers/AppContainer'
const middleware = [thunk]
if (process.env.NODE_ENV !== 'production') {
	middleware.push(createLogger())
}
const store = createStore(
	reducer, applyMiddleware(...middleware)
)
ReactDOM.render(
	<Provider store={ store } >
	<Router>
		<Route path='/' component={App}/>
	</Router>
   </Provider>, document.getElementById('root'))
registerServiceWorker()
store.dispatch(initEnv())