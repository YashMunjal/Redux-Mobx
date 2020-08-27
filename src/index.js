import React, { Component } from 'react';
import { render } from 'react-dom';

import redux from 'redux';
import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';

import './styles.scss';

const INCREMENT = 'INCREMENT';
const DECREMENT='DECREMENT';
const initialState = {
  count: 0,
};

const incrementValue = () => ({
  type: INCREMENT,
});
const decrementValue=()=>({
  type:DECREMENT,
})
const reducer = (state = initialState, action) => {
  if (action.type === INCREMENT) {
    return {
      count: state.count + 1,
    };
  }
  if(action.type === DECREMENT){
    return{
      count:state.count -1,
    }
  }
  return state;
};

const store = createStore(reducer);



class Counter extends Component {
  render() {
    const { count, increment,decrement } = this.props;
    console.log({ count, increment });
    return (
      <main className="Counter">
        <p className="count">{count}</p>
        <section className="controls">
          <button onClick={increment}>Increment</button>
          <button onClick={decrement}>Decrement</button>
          <button>Reset</button>
        </section>
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};
const mapDispatchToProps = (dispatch) => {
  return {
    increment() {
      dispatch(incrementValue());
    },
    decrement(){
      dispatch(decrementValue());
    }
  };
};

const CounterContainer = connect(mapStateToProps, mapDispatchToProps)(Counter);

render(
  <Provider store={store}>
    <CounterContainer />
  </Provider>,
  document.getElementById('root'),
);
