import React, { useEffect, useState } from "react";
import style from "./Account.module.css";
import OrderTrackingProgressBar from "./OrderTrackingProgressBar";
import CloseIcon from "@mui/icons-material/Close";
import { useParams } from "react-router-dom";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebase.config";
import CircularProgress from "@mui/material/CircularProgress";
import { format, addDays } from 'date-fns';
import { toast } from "react-toastify";



function OrderDetails() {
  const params = useParams();
  const [userID, setUserID] = useState(null)
  const [product, setOrderProduct] = useState({});
  const [loading, setLoading] = useState(false);
    // console.log(product.length);


   async function handleCancelOrder(){
        const docRef = doc(db, 'orders ' + userID, params.id)
        await updateDoc(docRef, {
            status: "Cancelled",
            deliveryTime: Date.now()
        })
      toast.success("Successfully! Your item has been cancelled.")
    }

  useEffect(() => {
    window.scroll(0,0)
    const isAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        const uid = user.uid;
         setUserID(uid)
         const docRef = doc(db, "orders " + uid, params.id);
         setLoading(true)
        const getData = onSnapshot(docRef, (doc)=> {
            setOrderProduct(doc.data())
            setLoading(false)
        } )
        
        // getData();
      }
    });
    return () => isAuth();
  }, []);

  if (loading ) {
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
   
        <div className={style.orDe_main}>
          <div className={style.addressDiv}>
            <div>Delivery Address</div>
            <div>{product?.address?.name}</div>
            <p>
              {product?.address?.address} {product?.address?.city}{" "}
            </p>
            <p>
              {" "}
              {product?.address?.pinCode} {product?.address?.state}
            </p>
            <div>
              Phone number- <span> {product?.address?.phone}</span>{" "}
            </div>
          </div>
          <div className={style.orCart}>
            <div className={style.odImgDiv}>
              <div className={style.odimg}>
              {product?.images?.length>0 &&  <img src={product?.images[0]?.image} alt="Image" />}
              </div>
            </div>
            <div className={style.odTitleDiv}>
              <div>{product?.title}</div>
              <div>Seller: AdarshNet</div>
              <div>Quantity: {product?.productQuantity}</div>
              <div>
                ₹
                {Math.floor(
                  product?.actual_price * product?.productQuantity -
                    (product?.discount_percentage / 100) *
                      (product?.actual_price * product?.productQuantity)
                )}
              </div>
            </div>
            <div className={style.odStatusDiv}>
              <div className={style.odStatus}>
                <span>Order Confirmed</span>
               {product?.status === "Confirmed" ? 
               <span>Expected Delivery</span> : <span style={{color: product?.status === "Cancelled"? 'red' : "green"}}>{product?.status}</span>}
              </div>
              <div className={style.odBar}>
                <OrderTrackingProgressBar status ={product?.status}/>
              </div>
            {product?.orderTime &&  <div className={style.odTime}>
                <span> {format(addDays(product?.orderTime, 0), "eee, do MMM")} </span>
              {product?.status === "Confirmed"? <span> {format(addDays(product?.orderTime, 2), "eee, do MMM")} </span> : <span> {format(addDays(product?.deliveryTime,0), "eee, do MMM")} </span>}
              </div>}
            {product?.status === "Confirmed" && <div className={style.cancelBtn}>
                <button onClick={handleCancelOrder}>
                  {" "}
                  <CloseIcon sx={{ fontSize: "1rem" }} /> Cancel
                </button>
              </div>}
            </div>
          </div>
        </div>
     
  );
}

export default OrderDetails;

{
  /* <div>
        <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/orderPlacedV2_cb4f64.png" alt="" />
        </div>
        <div>
        <img src="https://img1a.flixcart.com/www/helpcenter/assets/images/1529927950114/group-2%403x.png" alt="" />
        </div> */
}
