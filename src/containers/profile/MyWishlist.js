import React, { useEffect } from "react";
import style from "./Account.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import StarIcon from "@mui/icons-material/Star";
import Empty from "../../components/empty/Empty";
import { auth, db } from "../../firebase.config";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { useState } from "react";
import CalculateTotalRatings from "../ProductPage/CalculateTotalRatings";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const image = [
  {
    image:
      "https://rukminim2.flixcart.com/image/612/612/xif0q/snack-savourie/d/r/v/-original-imaghfn8j2vrwfcy.jpeg?q=70",
  },
  {
    image:
      "https://rukminim2.flixcart.com/image/832/832/l3hmwsw0/nut-dry-fruit/i/1/t/500-premium-cashews-kaju-100-natural-tasty-crunchy-immunity-original-imagehsmewfmmygr.jpeg?q=70",
  },
  {
    image:
      "https://rukminim2.flixcart.com/image/612/612/xif0q/edible-seed/6/h/9/-original-imaggrgrzcmv7pmc.jpeg?q=70",
  },
  {
    image:
      "https://rukminim2.flixcart.com/image/612/612/xif0q/nut-dry-fruit/j/k/t/-original-imagmkb9jskrcffe.jpeg?q=70",
  },
  {
    image:
      "https://rukminim2.flixcart.com/image/612/612/kzhbfrk0/nut-dry-fruit/z/b/7/-original-imagbh7hgctxc3zd.jpeg?q=70",
  },
  {
    image:
      "https://rukminim2.flixcart.com/image/612/612/xif0q/nut-dry-fruit/i/t/n/250-gold-makhana-1-pouch-farmley-original-imagqdth9nwgkhdu.jpeg?q=70",
  },
];

function MyWishlist() {
  const [userWishlist, setUserWishlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userID, setUserID] = useState(null)

  const navigate = useNavigate()

  function handleProductClick(id) {
    navigate(`/productDetails/${id}`)
  }

 async function handleRemoveItem(Id){
    const docRef = doc(db, "wishlist " + userID, Id);
    await deleteDoc(docRef)
    toast.success("Remove from your wishlist.")
  }

  useEffect(() => {
    window.scroll(0, 0);
    const isAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserID(user.uid);
        const uId = user.uid
        setLoading(true);
        const getWishlist = onSnapshot(
          collection(db, "wishlist " + uId),
          (querySnap) => {
            const list = [];
            querySnap.forEach((doc) => {
              list.push(doc.data());
            });
            setUserWishlist(list);
            setLoading(false);
          }
        );
      }
    });
    return () => isAuth();
  }, []);


  if (loading) {
    return (
      <div>
        <CircularProgress
          sx={{ ml: "50%", mt: "20%" }}
          thickness={4}
          size={40}
        />
      </div>
    );
  }

  return (
    <>
      {userWishlist.length === 0 ? (
        <div style={{ width: "70vw" }}>
          <Empty name={"Order list"} />
        </div>
      ) : (
        <div>
          <div className={style.myReview}>
            My Wishlist <span>({userWishlist.length})</span>
          </div>
          {userWishlist.map((product) => (
            <div
              key={product.id}
              className={style.wishProductDiv}
              
            >
              <div className={style.wishProdImg} onClick={() => handleProductClick(product.id)}>
                <div>
                  <img src={product.images[0].image} alt="image" />
                </div>
              </div>
              <div className={style.wishProdDtls}>
                <div>
                  <span>{product.title}</span>
                  <span>
                    <DeleteIcon onClick={() => handleRemoveItem(product.id)} sx={{ color: "gray", fontSize: "1.1rem" }} />
                  </span>
                </div>
                <div className={style.wishRate}>
                  {product.ratings > 0 && (
                    <span  style={{
                      backgroundColor:
                        product.ratings >= 3
                          ? "green"
                          : product.ratings >= 2
                          ? "orange"
                          : "red",
                    }}>
                      {product.ratings}
                      <StarIcon sx={{ fontSize: ".8rem", mb: "-1px" }} />
                    </span>
                  )}
                  {product.ratings > 0 && (
                    <span>
                      (<CalculateTotalRatings ratings={product.stars} />)
                    </span>
                  )}
                  <span>
                    <img
                      src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png"
                      alt=""
                    />
                  </span>
                </div>
                <div className={style.newpriceDiv}>
                  <div>
                    ₹
                    {Math.round(
                      product.actual_price -
                        (product.discount_percentage / 100) *
                          product.actual_price
                    )}
                  </div>
                  <div className={style.oldPrice}>₹{product.actual_price}</div>
                  <span>{product.discount_percentage}% off</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default MyWishlist;
