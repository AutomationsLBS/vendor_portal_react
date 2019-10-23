//Redux

console.log("In Redux");
const redux = require ('redux')
const createStore = redux.createStore
const initialState = { count : 1}
const rootReducer = (state = initialState,action) => { 
 switch(action.type){
  case 'add' :
	{
		return {...state, count :  state.count+1}
	}
  default : return state
	
 } 
}
const store = createStore(rootReducer);
console.log("store::",store)
console.log("store::getState",store.getState());

console.log("dispatcher ::",store.dispatch({type:"add"}));
console.log("store::getState::",store.getState());


