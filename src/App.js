import './App.css';
import React, { useState, useCallback } from 'react';

const App = () => {
  const [data, setData] = useState([
      { id: 1, value: 0 },
      { id: 2, value: 0 },
      { id: 3, value: 0 },
      { id: 4, value: 0 }
    ]
  );

  const onIncrement = useCallback((key) => {
    // time complexity is high if implemented with both find and splice functions.
    // so implemented with map function.
    const newData = data.map(d => {
      if(d.id === key) {
        d.value++;
      } 
      return d;
    });
    setData(newData);
  }, [data]);

  const onDecrement = useCallback((key) => {
    const newData = data.map(d => {
      if(d.id === key) {
        d.value--;
      } 
      return d;
    });
    setData(newData);
  }, [data]);

  const totalComponent = () => {
    return (
      <div>
        Total Counter Values: {data
        .map(d => d.value)
        .reduce(
          (previousValue, currentValue, currentIndex, array) => previousValue + currentValue
        )}
      </div>
    );
  }

  return (
    <div>
      {data.map(counter => ( 
        <Counter 
          key={counter.id}
          id={counter.id} 
          value={counter.value}
          onIncrement={onIncrement}
          onDecrement={onDecrement}
          />
      ))}
      { totalComponent() }
    </div>
  );
}

const Counter = (props) => {
  const { id, value, onIncrement, onDecrement } = props;
  return (
    <div className="counter">
      <b>Value-{value}</b>
      <div className="counter-controls">
        <button className="button is-danger is-small" onClick={() => onDecrement(id)}>-</button>
        <button className="button is-success is-small" onClick={() => onIncrement(id)}>+</button>
      </div>
    </div>
  );
}

export default App;
