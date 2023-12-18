import './App.css';
import Counter from './Counter';
import Container from './Container';

function App() {
  const number = 5;
  const counterProps = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    num: number,
  };

  return (
    <div className="App">
      <header className='App-header'>
      <Container>
        <h1>ㅎㅇ요</h1>
      {/* <Counter num = {number}/></p> */}
        <Counter {...counterProps}/>
      </Container>
      </header>
      <Container>
        <h1>ㅎㅇ요</h1>
      {/* <Counter num = {number}/></p> */}
        <Counter {...counterProps}/>
      </Container>
      <Container>
        <h1>ㅎㅇ요</h1>
      {/* <Counter num = {number}/></p> */}
        <Counter {...counterProps}/>
      </Container>
    </div>
  );
}

export default App;
