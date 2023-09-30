import React, { useEffect, useState } from "react";
import style from "./SellerPage.module.css";
import { categories } from "./categoryData";
import CloseIcon from '@mui/icons-material/Close';
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase.config";
import { useSelector } from "react-redux";
import { selectUserID } from "../../redux/authSlice";

function AddProduct() {
  const [productCategory, setProductCategory] = useState("");
  const [typeOfOption, setTypeOfOption] = useState("");
  const [title, setTitle] = useState('');
  const [brand, setBrand] = useState('');
  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState('');
  const [actualPrice, setActualPrice] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState('');
  const [deliveryCharge, setDeliveryCharge] = useState('');
  const [assured, setAssured] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [images, setImages] = useState([]);

  const userID = useSelector(selectUserID)

  const typeOfArray = categories.find(
    (categories) => categories.category === productCategory
  );

  function handleRemovePic(index){
    const updatedImg = images.filter((img,i) => i !== index)
    setImages(updatedImg)
  }

  function clearAllInput(){
    setProductCategory('')
    setTypeOfOption('')
    setTitle('')
    setBrand('')
    setQuantity('')
    setDescription('')
    setActualPrice('')
    setDiscountPercentage('')
    setDeliveryCharge('')
    setAssured('')
    setImages([])
  }

 async function handleSubmit(e){
    e.preventDefault()
    const product = {
        title: title,
        brand: brand,
        description: description,
        actual_price: actualPrice,
        discount_percentage: discountPercentage,
        category: productCategory,
        type: typeOfOption,
        quantity: quantity,
        images: images,
        assured: assured,
        deliveryCharge: deliveryCharge
    }

    if(productCategory && typeOfOption && title && brand && description && actualPrice && discountPercentage && deliveryCharge && assured && images.length>=4){
        try {
          await addDoc(collection(db, 'products'), {
            sellerID: userID, ...product
          })
            alert('added')
            clearAllInput()
        } catch (error) {
            console.log(error);
        }
    }else{
        alert("please fill all fields")
    }
    
  }

  useEffect(() => {
    const docRef = doc(db, 'products','9GEsdZVsWTfHtHGmXplJ') 
    const getData = async () => {
   
      try {
        const docSnap = await getDoc(docRef)
        if(docSnap.exists()){
          //  setProduct(docSnap.data())
           console.log(docSnap.data());
        }else{
          console.log("No such Data");
        }
      } catch (error) {
        console.log(error);
      }
     
    }


    return ()=>  getData()
    
   
  },[])

  return (
    <div className={style.sellerWrapper}>
      <h2>Add Product</h2>
      <div className={style.addFormContainer}>
       
        <div className={style.formDiv}>
          <select
            value={productCategory}
            onChange={(e) => setProductCategory(e.target.value)}
          >
            <option>Select category...</option>
            {categories.map((item, i) => (
              <option value={item.category}>{item.category}</option>
            ))}
          </select>

          <select
            value={typeOfOption}
            onChange={(e) => setTypeOfOption(e.target.value)}
          >
            <option value="">Select type...</option>
            {typeOfArray &&
              typeOfArray.typeOf.map((item) => (
                <option value={item}>{item}</option>
              ))}
          </select>
        </div>
        <div className={style.formDiv}>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Product title" required />
          <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} placeholder="Product Brand" required />
        </div>
        <div className={style.textDiv}>
          <textarea
           value={description} onChange={(e) => setDescription(e.target.value)}
            placeholder="Product Description..."
            required
          ></textarea>
        </div>
        <div className={style.formDiv}>
          <input type="text" value={imageURL} onChange={(e)=> setImageURL(e.target.value)} placeholder="Image URL (min 4 images)" />
          <button className={style.addImgBtn} onClick={()=> {setImages([...images, {image:imageURL}]); setImageURL('')}}>ADD</button>
          <input type="text" value={quantity} onChange={(e)=> setQuantity(e.target.value)} placeholder="Quantity" />
          {/* <div></div> */}
        </div>
      {images.length>0 &&  <div className={style.imgContainer}>
            {
                images.map((img,i) => (
                   <div key={i} className={style.imgDiv}>
                    <img src={img.image} alt="image" />
                    <div className={style.clearBtn} onClick={()=>handleRemovePic(i)}> <CloseIcon sx={{fontSize:'1rem'}}/></div> 
                   </div>
                ))
            }
          
        </div>}
        <div className={style.formDiv}>
          <input type="number"  value={actualPrice} onChange={(e) => setActualPrice(e.target.value)} placeholder="Actual Price" required/>
          <input type="number" value={discountPercentage} onChange={(e) => setDiscountPercentage(e.target.value)} placeholder="Discount in percentage(%)" required/>
        </div>
        <div className={style.formDiv}>
          <select value={deliveryCharge} onChange={(e)=> setDeliveryCharge(e.target.value)}>
            <option value="">Select Delivery charge..</option>
            <option value="0"> Free</option>
            <option value="40"> ₹40</option>
            <option value="70"> ₹70</option>
          </select>
          <select  value={assured} onChange={(e) => setAssured(e.target.value)}>
            <option value="">Select Assured..</option>
            <option value="true"> True</option>
            <option value="false"> False</option>
          </select>
        </div>
        <div className={style.addPrBtn}>
          <button onClick={handleSubmit}>Add Product</button>
        </div>
       
      </div>
    </div>
  );
}

export default AddProduct;
