const {
  createStore,
  combineReducers,
  compose,
  bindActionCreators,
  applyMiddleware
} = Redux;

const makeLouder=string.toUpperCase();
const embolden = string.bold();

const makeLouderAndEmbolden=compose(embolden,makeLouder);
console.log(makeLouderAndEmbolden('hello'));
// Output: <b>HELLO</b>

const reducer=(state={value:1},action)=>{
    return state;
}

const store=createStore(reducer);

store.dispatch({type:'ADD'},payload:{});