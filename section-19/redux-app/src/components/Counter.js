import { useDispatch, useSelector } from 'react-redux';
import classes from './Counter.module.css';
import { useRef } from 'react';
import { counterActions } from '../store/counter';

const Counter = () => {
  // react redux will automatically reexecute this component function whenever counter changes
  // this is because when using useSelector react redux will subscribe to the store by default
  // when the Counter component is unmounted/destroyed, react redux will also automatically clear the subscription for you
  // const counter = useSelector(state => state.counter);
  // const showCounter = useSelector(state => state.showCounter);

  const counter = useSelector(state => state.counter.counter);
  const showCounter = useSelector(state => state.counter.showCounter);

  const dispatch = useDispatch();

  const inputRef = useRef();


  console.log('refreshed counter component')



  // const toggleCounterHandler = () => {
  //   dispatch({
  //     type: 'toggle'
  //   })
  // };

  const toggleCounterHandler = () => {
    // we execute toggleCounter directly which will create the {type: "unique identifier for toggleCounter"} object
    dispatch(counterActions.toggleCounter());
  };


  // const handleIncrement = () => {
  //   dispatch({
  //     type: 'increment'
  //   })
  // };

  const handleIncrement = () => {
    dispatch(counterActions.increment());
  };

  // const handleIncrease = () => {
  //   dispatch({
  //     type: 'increase',
  //     value: +inputRef.current.value
  //   })
  // };

  const handleIncrease = () => {
    // the key for the value(can also be an object) passed into the reducer will be 'payload' which cannot be changed
    dispatch(counterActions.increase(+inputRef.current.value)) 
  };

  // const handleDecrement = () => {
  //   dispatch({
  //     type: 'decrement'
  //   })
  // };

  const handleDecrement = () => {
    dispatch(counterActions.decrement());
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>

      <div className={classes.value}>-- INCREASE BY --</div>
      <input type="number" ref={inputRef}/>
      <div className={classes.value}>-- COUNTER VALUE --</div>
      {showCounter && <div className={classes.value}>{counter}</div>}
      {/* <div className={classes.value}>{counter}</div> */}
      <div>
        <button onClick={handleIncrement}>Increment</button>
        <button onClick={handleIncrease}>Increase</button>
        <button onClick={handleDecrement}>Decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
