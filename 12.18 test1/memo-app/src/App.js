import './App.css';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Memo from './Memo'

function App() {
  return (
    <Router>
    <div className="App">
      <header>
        <nav className='menu'>
          <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/memo'>Memo</Link></li>
          </ul>
        </nav>
      </header>
    <section>
    <Routes>
      <Route path='/' element={<div><h1>HomePage</h1></div>} />
      <Route path='/memo' element={<Memo />} />
    </Routes>
    </section>
    </div>
    </Router>
  );
}

export default App;
