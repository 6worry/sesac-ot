import './App.css';
import MyFooter from './MyFooter';
import MyHeader from './MyHeader';

function App() {
  let name = '6worry'

  const style = {
    h2: {
      color: 'green',
    },
    my_text: {
      color: 'blue',
    }
  };

  return (
    <div className="App">
      <MyHeader />
      <header className='App-header'>
        <h1>Hi, 리엑트 { name } </h1>
      </header>
      <h2 style={style.h2}>헤더양</h2>
      <p style={style.my_text}>본문 내용: ㅎㅇㅎㅇ</p>
      <MyFooter />
    </div>
  );
};

export default App;
