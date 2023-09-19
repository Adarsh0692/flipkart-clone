import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/header/Header';
import Home from './containers/HomePage/Home';
import ProductPage from './containers/ProductPage/ProductPage';
import SingleProduct from './containers/singleProduct/SingleProduct';
import ViewCart from './containers/cart/ViewCart';
import CheckOut from './containers/checkout/CheckOut';
import Account from './containers/profile/Account';
import Auth from './containers/authPage/Login';
import WriteReview from './containers/singleProduct/WriteReview';
import ManageAddresses from './containers/profile/ManageAddresses';
import ProfileInfo from './containers/profile/ProfileInfo';
import MyOrder from './containers/profile/MyOrder';
import MyReviews from './containers/profile/MyReviews';
import MyWishlist from './containers/profile/MyWishlist';


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
      <Route path='/account/' element={<Account/>}>
        <Route index element={<ProfileInfo/>} />
        <Route path='address' element={<ManageAddresses/>} />
        <Route path='orders' element={<MyOrder/>} />
        <Route path='reviews' element={<MyReviews/>} />
        <Route path='wishlist' element={<MyWishlist/>} />
        
      </Route>
      <Route path='/write-review/:id' element={<WriteReview/>}/>
      <Route path='/login' element={<Auth/>}/>
    </Routes> 
    </BrowserRouter>
  );
}

export default App;
