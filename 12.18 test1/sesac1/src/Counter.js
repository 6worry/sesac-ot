import { useState } from 'react';
import CounterResult from './CounterResult';

const Counter = (props) => {
    const [ count, setCount ] = useState(props.a); // 초기값을 0으로 설정

    const onIncrease = () => {
        setCount(count + 1);
    };

    const onDecrease = () => {
        setCount(count - 1);
    };

    return (
        <div>
            <h2>{ count }</h2>
            <button onClick= { onIncrease }>+</button>
            <button onClick= { onDecrease }>-</button>
            <CounterResult num = { count }/>
        </div>
    );
};

export default Counter;