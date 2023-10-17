import React, { useEffect } from "react";
import style from "./SellerPage.module.css";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../firebase.config";
import { useState } from "react";
import { CircularProgress } from "@mui/material";
import Empty from "../../components/empty/Empty";

function SellerDashBoard() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  function handleEdit(product) {
     alert(product.id)
  }

  function handleDelete(product) {
     alert(product.id)
  }

  useEffect(() => {
    const isAuth = auth.onAuthStateChanged(async(user) => {
      if(user){
        try {
          setLoading(true)
          const q = query(collection(db, 'products'), where('sellerID', '==', user.uid))
          const list = []
          const querySnap = await getDocs(q)
          querySnap.forEach((doc) => {
           list.push({id: doc.id, ...doc.data()});
          })
          setProducts(list)
          setLoading(false)
        } catch (error) {
          console.log(error);
          setLoading(false)
        }
       
      }
    })
    return () => isAuth()
  }, []);

  return (
    <div className={style.wraper}>
      {loading  ? (
        <>
          <CircularProgress
            sx={{ ml: "50%", mt: "20%" }}
            thickness={4}
            size={40}
          />{" "}
        </>
      ) : (
        <>
       {products.length === 0 ? <Empty name="Product List"/> : 
       <table className={style.productTable}>
          <tr>
            <th>S.No</th>
            <th>Product Details</th>
            <th>Listing Price</th>
            <th>Final Price</th>
            <th>Stock</th>
            <th>Category</th>
            <th>Action</th>
          </tr>

          {products.map((product, i) => (
            <tr key={product.id}>
              <td>{i + 1}</td>
              <td>
                <div className={style.imgtd}>
                  <div className={style.imgSpan}>
                    <img src={product.images[0].image} alt="image" />
                  </div>
                  <div className={style.title}>{product.title}</div>
                </div>
              </td>
              <td>₹{product.actual_price}</td>
              <td>₹{product.final_price}</td>
              <td>{product.quantity}</td>
              <td>{product.category}</td>
              <td>
                <button className={style.btn} onClick={()=>handleEdit(product)}>Edit</button>
                <button className={style.btn} onClick={()=>handleDelete(product)}>Delete</button>
              </td>
            </tr>
          ))}
        </table>}
        </>
      )}
    </div>
  );
}

export default SellerDashBoard;
