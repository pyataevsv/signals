import { createStore, applyMiddleware } from 'redux'
import { rootReducer } from '../reducers/reducers'
import ThunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'


export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(ThunkMiddleware)))

store.subscribe(() => console.log(store.getState()))

