import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/header/Header";
import Home from "./containers/HomePage/Home";
import ProductPage from "./containers/ProductPage/ProductPage";
import SingleProduct from "./containers/singleProduct/SingleProduct";
import ViewCart from "./containers/cart/ViewCart";
import CheckOut from "./containers/checkout/CheckOut";
import Account from "./containers/profile/Account";
import Auth from "./containers/authPage/Login";
import WriteReview from "./containers/singleProduct/WriteReview";
import ManageAddresses from "./containers/profile/ManageAddresses";
import ProfileInfo from "./containers/profile/ProfileInfo";
import MyOrder from "./containers/profile/MyOrder";
import MyReviews from "./containers/profile/MyReviews";
import MyWishlist from "./containers/profile/MyWishlist";
import AddProduct from "./containers/sellerPage/AddProduct";
import OrderDetails from "./containers/profile/OrderDetails";
import OrderSuccess from "./components/success/OrderSuccess";
import SellerDashBoard from "./containers/sellerPage/SellerDashBoard";
import SellerAccount from "./containers/sellerPage/SellerAccount";
import ShowHeader from "./components/header/ShowHeader";
import SellerOrders from "./containers/sellerPage/SellerOrders";

function App() {
  return (
    <BrowserRouter>
      <ShowHeader>
        <Header />
      </ShowHeader>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id/:name" element={<ProductPage />} />
        <Route path="/productDetails/:id" element={<SingleProduct />} />
        <Route path="/viewcart" element={<ViewCart />} />
        <Route path="/checkout" element={<CheckOut />} />

        <Route path="/account/" element={<Account />}>
          <Route index element={<ProfileInfo />} />
          <Route path="address" element={<ManageAddresses />} />
          <Route path="orders" element={<MyOrder />} />
          <Route path="orderDetails/:id" element={<OrderDetails />} />
          <Route path="reviews" element={<MyReviews />} />
          <Route path="wishlist" element={<MyWishlist />} />
        </Route>

        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/write-review/:id" element={<WriteReview />} />
        <Route path="/login" element={<Auth />} />
        
        <Route path="/seller-addProduct" element={<AddProduct />} />
        <Route path="/seller-dashBoard" element={<SellerDashBoard />} />
        <Route path="/seller-account" element={<SellerAccount />} />
        <Route path="/seller-orders" element={<SellerOrders />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
