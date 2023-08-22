import logo from './logo.svg';
import './App.css';
import { getCookie } from './utils/utils';
import ProductListing from './Components/Products/ProductListing';
import Login from './Components/Login/Login';
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from './Components/Header/Header';

function App() {

  const location = useLocation();

  let hasToken = getCookie('user-session')

  return (
    <div className="App">
      {hasToken &&
      <>
        <Header />
        <Routes>
          <Route path='' exact element={<ProductListing />} />
        </Routes>
      </>
      }

      {!hasToken &&
        <Routes>
          <Route path='' exact element={<Login />} />
          <Route path='/login' exact element={<Login />} />
        </Routes>
      }
    </div>
  );
}

export default App;
