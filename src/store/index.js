import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const initialState = {

};                          


let logger = store =>{
      return next =>{
         return action =>{
             console.log("middle ware logger ",action )
              const result = next(action);
              console.log("current state",store.getState());
             return result
         }
      }
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = [thunk,logger];
const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunk,logger)
  )
);

export default store;