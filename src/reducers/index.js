import {
	combineReducers
} from 'redux'
import nav from './nav'
import userInfo from './userInfo'
import expreducer from './expreducer'
import msgreducer from './msgreducer'
import purchase from './purchasereducer'
import record from './recordreducer'
import account from './accountreducer'
const reducer = combineReducers({
	nav,
	userInfo,
	expreducer,
	msgreducer,
	purchase,
	record,
	account
});

export default reducer;