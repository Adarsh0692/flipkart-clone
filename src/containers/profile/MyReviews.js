import React from "react";
import style from "./Account.module.css";
import StarIcon from "@mui/icons-material/Star";
import { useEffect } from "react";
import { auth, db } from "../../firebase.config";
import { useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { CircularProgress } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { format, addDays } from "date-fns";
import Empty from "../../components/empty/Empty";

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

function MyReviews() {
  const [products, setProducts] = useState([]);
  const [loading, setloading] = useState(false);
  //  console.log(products);

  useEffect(() => {
    const isAuth = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userID = user.uid;
        setloading(true);
        const list = [];
        const docSnap = await getDocs(collection(db, "review " + userID));
        docSnap.forEach((doc) => {
          list.push(doc.data());
        });
        setProducts(list);
        setloading(false);
      }
    });

    return () => isAuth();
  }, []);

  if (loading) {
    return (
      <>
        <CircularProgress
          sx={{ ml: "50%", mt: "20%" }}
          thickness={4}
          size={40}
        />
      </>
    );
  }

  return (
    <>
      {products.length === 0 ? (
        <div style={{ width: "70vw" }}>
          <Empty name={"Review list"} />
        </div>
      ) : (
        <div>
          <div className={style.myReview}>
            My Reviews <span>({products.length})</span>
          </div>
          {products.map((product) => (
            <div className={style.mainProductDiv}>
              <div className={style.reviewImgDiv}>
                <div>
                  <img src={product.image} alt="" />
                </div>
              </div>
              <div className={style.reviewProDtlsDiv}>
                <div>{product.title}</div>
                <div className={style.revRate}>
                  <span
                    style={{
                      backgroundColor:
                        product.rating >= 3
                          ? "green"
                          : product.rating >= 2
                          ? "orange"
                          : "red",
                    }}
                  >
                    {" "}
                    {product.rating}{" "}
                    <StarIcon
                      sx={{ fontSize: ".8rem", mb: "-2px", ml: "-2px" }}
                    />
                  </span>

                  <span>{product.reviewTitle}</span>
                </div>
                <div>{product.description}</div>
                <div className={style.name_time}>
                  {product.buyerName}
                  <span>
                    <CheckCircleIcon sx={{ fontSize: "1rem" }} />
                  </span>
                  <span>Certified Buyer</span>
                  <span>
                    {format(addDays(product.time, 0), "eee do MMM yyyy")}
                  </span>
                </div>
                {/* <div>
              <button>Edit</button>
              <button>Delete</button>
            </div> */}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default MyReviews;
