import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/header/Header';
import Home from './containers/HomePage/Home';
import ProductPage from './containers/ProductPage/ProductPage';
import SingleProduct from './containers/singleProduct/SingleProduct';
import ViewCart from './containers/viewCart/ViewCart';
import CheckOut from './containers/checkout/CheckOut';
import Account from './containers/account/Account';
import WriteReview from './containers/singleProduct/WriteReview';


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
      <Route path='/account/:id' element={<Account/>}/>
      <Route path='/write-review/:id' element={<WriteReview/>}/>
    </Routes> 
    </BrowserRouter>
  );
}

export default App;
