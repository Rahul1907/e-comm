import { getCookie } from './utils/utils';
import ProductListing from './Pages/Products/ProductListing';
import Login from './Pages/Login/Login';
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from './Components/Header/Header';
import Cart from './Pages/Cart/Cart';

function App() {

  const location = useLocation();

  let hasToken = getCookie('user-session')
  // console.log(location);
  return (
    <div className="App">
      {/* this is to check weather user is logedin or not */}
      {hasToken &&
      <>
        <Header />
        <div className='container'>
          <Routes>
            <Route path='' exact element={<ProductListing />} />
            <Route path='/cart' exact element={<Cart />} />
          </Routes>
        </div>
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
