import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/header/Header';
import Home from './containers/HomePage/Home';
import ProductPage from './containers/ProductPage/ProductPage';
import SingleProduct from './containers/singleProduct/SingleProduct';
import ViewCart from './containers/viewCart/ViewCart';
import CheckOut from './containers/checkout/CheckOut';


function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/product/:id' element={<ProductPage/>}/>
      <Route path='/singleProduct/:id' element={<SingleProduct/>}/>
      <Route path='/viewcart' element={<ViewCart/>}/>
      <Route path='/checkout' element={<CheckOut/>}/>
    </Routes> 
    </BrowserRouter>
  );
}

export default App;
