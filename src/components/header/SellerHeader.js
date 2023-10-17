import React from "react";
import style from "./../../containers/sellerPage/SellerPage.module.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function SellerHeader() {
  const navigate = useNavigate();
  
  return (
    <>
      <ToastContainer
        position="bottom-center"
        hideProgressBar
        closeButton={false}
        pauseOnHover={false}
        role="alert"
        autoClose={2000}
        theme="dark"
        style={{ width: "auto", fontSize: "1rem" }}
      />
      <div className={style.nav}>
        <div className={style.right}>
          <span onClick={() => navigate("/seller-dashBoard")}>
            <img
              src="https://static-assets-web.flixcart.com/fk-sp-static/images/flipkart_logo_color_revamp.svg"
              alt="image"
            />
          </span>

          <h1>Seller</h1>
        </div>
        <div>
          <span onClick={() => navigate("/seller-orders")}>Orders</span>
          <button onClick={() => navigate("/seller-addProduct")}>
            Start Selling
          </button>
        </div>
      </div>
    </>
  );
}

export default SellerHeader;
