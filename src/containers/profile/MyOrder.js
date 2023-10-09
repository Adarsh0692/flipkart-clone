import React, { useEffect, useState } from "react";
import style from "./Account.module.css";
import CircularProgress from "@mui/material/CircularProgress";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { auth, db } from "../../firebase.config";
import { useSelector } from "react-redux";
import { selectUserID } from "../../redux/authSlice";
import { format, isToday, isYesterday, differenceInDays, addDays } from 'date-fns';
import { useNavigate } from "react-router-dom";
import Empty from "../../components/empty/Empty";

function OrderTime({ orderDate }) {
  // Convert orderDate to a JavaScript Date object
  const orderDateTime = new Date(orderDate);

  // Get the current date
  const currentDate = new Date();

  // Calculate the difference in days between the current date and the order date
  const daysDifference = differenceInDays(currentDate, orderDateTime);

  let formattedTime;

  if (isToday(orderDateTime)) {
    formattedTime = 'Today, ' + format(orderDate, 'MMM dd');
  } else if (isYesterday(orderDateTime)) {
    formattedTime = 'yesterday, ' + format(orderDate, 'MMM dd');
  } else {
    formattedTime = 'on ' + format(orderDateTime, 'MMM dd');
  }

  return <>{formattedTime}</>;
}

function MyOrder() {
  const navigate = useNavigate()

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const sortedOrders = [...orders].sort((a, b) => b.orderTime - a.orderTime);
 
  useEffect(() => {
    const isAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        const uid = user.uid;

        const getOrderData = async () => {
          setLoading(true);
          let list = [];
          const docSnap = await getDocs(collection(db, "orders " + uid));
          docSnap.forEach((doc) => {
            list.push({orderID: doc.id , ...doc.data()});
            setOrders(list);
          });

          setLoading(false);
        };
        getOrderData();
      }
    });

    return () => isAuth();
  }, []);

  if(loading){
    return (
      <div>
       <CircularProgress
          sx={{ ml: "50%", mt: "20%" }}
          thickness={4}
          size={40}
        />
      </div>
    )
  }

  return (
    <>
      {orders.length === 0 ? (
        <div style={{width:"70vw"}}>
          <Empty name={'Order list'}/>
        </div>
      ) : (
        <div>
          <div className={style.myReview}>
            My Orders <span>({orders.length})</span>
          </div>
          {sortedOrders.map((product,i) => (
            <div className={style.wishProductDiv} key={product.orderID} onClick={() => navigate(`/account/orderDetails/${product.orderID}`)}>
              <div className={style.orderProdImgDiv}>
                <div>
                  <img src={product.images[0].image} alt="" />
                </div>
              </div>
              <div className={style.orderProdName}>
                <div> {product.title}</div>

                <div>Seller: Blue Tide 
                  <div>
                    Quantity: {product.productQuantity}
                  </div>
                </div>
              </div>
              <div className={style.orderProdPrice}>
                ₹
                {Math.floor(
                  product.actual_price * product.productQuantity -
                    (product.discount_percentage / 100) *
                      (product.actual_price * product.productQuantity)
                )}
              </div>
              <div className={style.orderProdStatus}>
                <div>
                  <div className={style.delivered} style={{backgroundColor: product.status === "Cancelled"? "red" : "green"}} ></div>
                  <span>{product.status} {product.status === "Confirmed" ? <OrderTime orderDate={product.orderTime}/> : "on " + format(addDays(product?.deliveryTime,0), "eee, do MMM") }</span>
                </div>
                <div>Your item has been {product.status}. </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default MyOrder;
