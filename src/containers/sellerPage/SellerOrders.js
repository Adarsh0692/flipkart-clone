import React from "react";
import style from "./SellerPage.module.css";
import { useState } from "react";
import { useEffect } from "react";
import { auth, db } from "../../firebase.config";
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { CircularProgress } from "@mui/material";
import Empty from "../../components/empty/Empty";
import CloseIcon from "@mui/icons-material/Close";
import { format, addDays } from "date-fns";
import { toast } from "react-toastify";

function SellerOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userID, setUserID] = useState(null);

  const sortedOrders = [...orders].sort((a, b) => b.orderTime - a.orderTime);

  async function handleDeliveredOrder(id) {
    const docRef = doc(db, "orders",id);
    await updateDoc(docRef, {
      status: "Delivered",
      deliveryTime: Date.now(),
    });
    toast.success("Success! Item has been Delivered.");
  }
  async function handleCancelOrder(id) {
    const docRef = doc(db, "orders", id);
    await updateDoc(docRef, {
      status: "Cancelled",
      deliveryTime: Date.now(),
    });
    toast.success("Success! Item has been cancelled.");
  }

  useEffect(() => {
    const isAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        const uid = user.uid;
        setUserID(uid);
        const getOrderData = async () => {
          setLoading(true);
          let list = [];
          const docRef = query(collection(db, "orders"),where('sellerID', '==', user.uid));
          const getData = onSnapshot(docRef, (querySnap) => {
            querySnap.forEach((doc) => {
              list.push({ orderID: doc.id, ...doc.data() });
              setOrders(list);
              console.log('hh');
            });
          });
  
          setLoading(false);
        };
        getOrderData();
      }
    });

    return () => isAuth();
  }, [handleCancelOrder, handleDeliveredOrder]);

  return (
    <div className={style.wraper}>
      {loading ? (
        <>
          <CircularProgress
            sx={{ ml: "50%", mt: "20%" }}
            thickness={4}
            size={40}
          />{" "}
        </>
      ) : (
        <>
          {sortedOrders.length === 0 ? (
            <Empty name="Order List" />
          ) : (
            <table className={style.productTable}>
              <tr>
                <th>S.No</th>
                <th>Product Details</th>
                <th>Final Price</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Payment</th>
                <th>Delivery Address</th>
                <th>Status</th>
              </tr>
              {sortedOrders.map((product, i) => (
                <tr key={product.orderID}>
                  <td>{i + 1}.</td>
                  <td>
                    <div className={style.imgtd}>
                      <div className={style.imgSpan}>
                        <img src={product.images[0].image} alt="image" />
                      </div>
                      <div className={style.title}>{product.title}</div>
                    </div>
                  </td>
                  <td>₹{product.final_price * product.productQuantity}</td>
                  <td>{product.category}</td>
                  <td>{product.productQuantity}</td>
                  <td>{product.payment}</td>
                  <td>
                    <div className={style.name}>{product.address.name}</div>
                    <div>
                      {product.address.address} {product.address.city}
                    </div>
                    <div>
                      ({product.address.pinCode}) {product.address.state}
                    </div>
                    <div>
                      {" "}
                      <span className={style.name}>Phone:</span>{" "}
                      {product.address.phone}
                    </div>
                  </td>
                  <td>
                    {product.status === "Confirmed" ? (
                      <>
                        <div className={style.confirm}>
                          Confirmed on{" "}
                          {format(addDays(product.orderTime, 0), "eee, do MMM")}
                        </div>
                        <button
                          className={style.btn}
                          onClick={() => handleDeliveredOrder(product.orderID)}
                        >
                          Delivered
                        </button>
                        <button
                          className={style.btn}
                          onClick={() => handleCancelOrder(product.orderID)}
                        >
                          {" "}
                          <CloseIcon
                            sx={{ fontSize: "1rem", mr: "-5px", mb: "-3px" }}
                          />{" "}
                          Cancel
                        </button>
                      </>
                    ) : (
                      <div className={style.status}>
                        <div
                          className={style.delivered}
                          style={{
                            backgroundColor:
                              product.status === "Cancelled" ? "red" : "green",
                          }}
                        ></div>
                        {product.status} on{" "}
                        {format(
                          addDays(product.deliveryTime, 0),
                          "eee, do MMM"
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </table>
          )}
        </>
      )}
    </div>
  );
}

export default SellerOrders;
