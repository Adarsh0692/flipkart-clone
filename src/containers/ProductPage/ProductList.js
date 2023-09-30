import React, { useEffect } from "react";
import style from "./ProductPage.module.css";
import StarIcon from "@mui/icons-material/Star";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Pagination from "./Pagination";
import { useNavigate } from "react-router-dom";
import CalculateTotalRatings from "./CalculateTotalRatings";

function ProductList({ viewProdcts }) {
  const navigate = useNavigate();

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <div className={style.mainList}>
      <div className={style.upperDiv}>
        <div className={style.productType}>
          <h1>Dry Fruit, Nut & seed</h1>
          <span>{`(Showing 1 - 20 products of 1000 products)`}</span>
        </div>
        <div className={style.sortBy}>
          <span>Sort By</span>
          <div className={style.active}>Popularity</div>
          <div>Price -- Low to High</div>
          <div>Price -- High to Low</div>
          <div>Newest First</div>
        </div>
      </div>

      <div className={style.proListDiv}>
        {viewProdcts && viewProdcts?.map((product) => (
          <div
            className={style.cart}
            onClick={() => navigate(`/productDetails/${product.id}`)}
          >
            <div key={product.id} className={style.imgDiv}>
              <img src={product.images[0].image} alt="image" />
              <span className={style.heart}>
                <FavoriteIcon sx={{ color: "lightgray" }} />
              </span>
            </div>
            <div>
              <div className={style.gram}>Sponsored</div>
              <p className={style.discp}>{product.title}</p>
              <div className={style.gram}>{product.quantity}</div>
              <div className={style.rateDiv}>
                {product.ratings > 0 && (
                  <div
                    style={{
                      backgroundColor:
                        product.ratings >= 3
                          ? "green"
                          : product.ratings >= 2
                          ? "orange"
                          : "red",
                    }}
                  >
                    {product.ratings} <StarIcon sx={{ fontSize: "1rem" }} />
                  </div>
                )}
                {product.ratings > 0 && (
                  <span>
                    (<CalculateTotalRatings ratings={product.stars} />)
                  </span>
                )}
                {product.assured === 'true' && (
                  <img
                    src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png"
                    alt=""
                  />
                )}
              </div>
              <div className={style.newpriceDiv}>
                <div>
                  ₹
                  {Math.round(
                    product.actual_price -
                      (product.discount_percentage / 100) * product.actual_price
                  )}
                </div>
                <div className={style.oldPrice}>₹{product.actual_price}</div>
                <span>{product.discount_percentage}% off</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* <div >
        <Pagination />
      </div> */}
    </div>
  );
}

export default ProductList;
