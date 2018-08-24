const {
    createStore,
    combineReducers,
    compose,
    bindActionCreators,
    applyMiddleware
  } = Redux;
  
  
  const initialState = { result: 0 };
  
  const addAction = {
    type: 'ADD',
    value: 4
  };
  
  const calculatorReducer = (
    state = initialState,
    action
  ) => {
    if (action.type === 'ADD') {
      return {
        ...state,
        result: state.result + action.value
      }
    }
    return state;  
  }
  
  const subscriber = () => {
    console.log('SUBSCRIPTION!!!!', store.getState())
  };
  
  const logger = ({ getState }) => {
    return next => action => {
      console.log(
        'MIDDLEWARE',
        getState(),
        action
      );
      const value = next(action);
      console.log({value});
      return value;
    }
  }
  
  const initialError = { message: '' };
  
  let errorMessageReducer = (
    state = initialError,
    action
  ) => {
    if (action.type === 'SET_ERROR_MESSAGE')
      return { message: action.message };
    if (action.type === 'CLEAR_ERROR_MESSAGE')
      return { message: '' };
    return state;
  };
  
  const store = createStore(combineReducers({
    calculator: calculatorReducer,
    error: errorMessageReducer
  }), {}, applyMiddleware(logger));
  
  const unsubscribe = store.subscribe(subscriber);
  
  const add = value => ({ type: 'ADD', value });
  
  const setError = (message) => (
    { type: 'SET_ERROR_MESSAGE', message}
  );
  
  const clearError = () => (
    { type: 'CLEAR_ERROR_MESSAGE' }
  );
  
  const bindActionCreator =
        (action, dispatch) => 
          (...args) => dispatch(action(...args));
  
  const addValue = bindActionCreator(add, store.dispatch);
  
  const bindActionCreatorz = (actions, dispatch) => {
    return Object.keys(actions).reduce((boundActions, key) => {
      boundActions[key] = bindActionCreator(actions[key], dispatch);
      return boundActions;
    }, {});
  }
  
  const errors = bindActionCreatorz({ 
    set: setError,
    clear: clearError
  }, store.dispatch);
  
  
  