import React, { useEffect, useState } from "react";
import style from "./ProductPage.module.css";
import { Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import SearchIcon from "@mui/icons-material/Search";
import ProductList from "./ProductList";
import {
  collection,
  getCountFromServer,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase.config";
import { useNavigate, useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import NoResult from "../../components/empty/NoResult";

function valuetext(value) {
  return `${value}Rs`;
}

const allRating = [
  { value: 4, label: `4☆ & above`, checked: false },
  { value: 3, label: `3☆ & above`, checked: false },
  { value: 2, label: `2☆ & above`, checked: false },
  { value: 1, label: `1☆ & above`, checked: false },
];

const allDiscount = [
  { value: "50", label: `50% or more`, checked: false },
  { value: "40", label: `40% or more`, checked: false },
  { value: "30", label: `30% or more`, checked: false },
  { value: "20", label: `20% or more`, checked: false },
  { value: "10", label: `10% or more`, checked: false },
];

function ProductPage() {
  const [rating, setRating] = useState(allRating);
  const [discount, setDiscount] = useState(allDiscount);
  const [selectedFilter, setSelectedFilter] = useState([]);
  const [value, setValue] = useState([100, 10000]);
  const [assuredCheckbox, setAssuredCheckbox] = useState(false);
  const [isBrandShow, setIsBrandShow] = useState(false);
  const [isRatingShow, setIsRatingShow] = useState(true);
  const [isDiscountShow, setIsDiscountShow] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [showAllBrands, setShowAllBrands] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [brands, setBrands] = useState([]);
  const [page, setPage] = useState(1)


  const navigate = useNavigate();
  const params = useParams();
  const categoryType = params.id;

  const [allProducts, setAllProducts] = useState([]);

  const myBrands = allProducts?.map((product) => product.brand);
  const brandsList = [];
  const brandName = [];
  myBrands.forEach((doc) => {
    brandsList.push({ value: doc, label: doc, checked: false });
    brandName.push(doc);
  });

  const uniqueBrandName = [...new Set(brandName)];
  const ratingArray = allRating.map((rate) => rate.label);
  const discountArray = allDiscount.map((disc) => disc.label);

  //handle search brand
  const searchBrands = brands.filter((brand) =>
    brand.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const uniqueBrandsMap = new Map();
  searchBrands.forEach((brandObj) => {
    uniqueBrandsMap.set(brandObj.value, brandObj);
  });
  const uniqueBrandsArray = [...uniqueBrandsMap.values()];

  // Function for handleprice range
  const handleRange = async (event, newValue) => {
    setValue(newValue);
    const newPriceFilter = `₹${newValue[0]}-₹${newValue[1]}${newValue[1]===10000? '+':''}`;
    if (!selectedFilter.includes(newPriceFilter)) {
      const updatedFilters = selectedFilter.filter(
        (filter) => !filter.startsWith("₹")
      );
      setSelectedFilter([...updatedFilters, newPriceFilter]);
    }
  };

  //Remove perticuler filter from selectedFilter
  function handleRemoveFilter(item) {
    const updatedFilters = selectedFilter.filter((filter) => filter !== item);
    setSelectedFilter(updatedFilters);

    //for remove price filter
    if (item.startsWith("₹")) {
      setValue([100, 10000]);
    }

    //for remove Assured filter
    if (item === "Plus(FAssured)") {
      setAssuredCheckbox(false);
    }

    //for remove Brand filters
    const brandfilters = brands.filter((brand) => brand.value === item);
    if (item === brandfilters[0]?.value) {
      setBrands((prevBrands) =>
        prevBrands.map((brand) =>
          brand.value === item ? { ...brand, checked: false } : brand
        )
      );
    }

    //for remove Rating filters
    const ratingFilter = rating.filter((rate) => rate.label === item);
    if (item === ratingFilter[0]?.label) {
      setRating((prevRating) =>
        prevRating.map((rate) =>
          rate.label === item ? { ...rate, checked: false } : rate
        )
      );
    }

    //for remove discount filters
    const discountFilter = discount.filter((disc) => disc.label === item);
    if (item === discountFilter[0]?.label) {
      setDiscount((prevDisc) =>
        prevDisc.map((disc) =>
          disc.label === item ? { ...disc, checked: false } : disc
        )
      );
    }
  }

  //Price reset from clear btn
  function handlePriceRemove() {
    setValue([100, 10000]);
    const currentPriceFilter = `₹${value[0]}-₹${value[1]}`;
    const updatedFilter = selectedFilter.filter(
      (filter) => filter !== currentPriceFilter
    );
    setSelectedFilter(updatedFilter);
  }

  //handle Assured
  function handleAssured(e) {
    if (e.target.checked) {
      setAssuredCheckbox(true);
      setSelectedFilter([...selectedFilter, "Plus(FAssured)"]);
    } else {
      setAssuredCheckbox(false);
      const updatedAssured = selectedFilter.filter(
        (filter) => filter !== "Plus(FAssured)"
      );
      setSelectedFilter(updatedAssured);
    }
  }

  //handle Brands
  function handleBrandFilter(filter) {
    if (!selectedFilter.includes(filter)) {
      setBrands((prevBrands) =>
        prevBrands.map((brand) =>
          brand.value === filter ? { ...brand, checked: true } : brand
        )
      );
      setSelectedFilter([filter, ...selectedFilter]);
    } else {
      setBrands((prevBrands) =>
        prevBrands.map((brand) =>
          brand.value === filter ? { ...brand, checked: false } : brand
        )
      );
      const updatedBrandFilter = selectedFilter.filter(
        (brand) => brand !== filter
      );
      setSelectedFilter(updatedBrandFilter);
    }
  }

  //handle Rating
  function handleRaing(value, label) {
    if (!selectedFilter.includes(label)) {
      setSelectedFilter([label, ...selectedFilter]);
      setRating((prevRating) =>
        prevRating.map((rate) =>
          rate.value === value ? { ...rate, checked: true } : rate
        )
      );
    } else {
      setRating((prevRating) =>
        prevRating.map((rate) =>
          rate.value === value ? { ...rate, checked: false } : rate
        )
      );
      const updatedRateFilter = selectedFilter.filter((rate) => rate !== label);
      setSelectedFilter(updatedRateFilter);
    }
  }

  //handle Discount

  function handleDiscount(value, label) {
    if (!selectedFilter.includes(label)) {
      setSelectedFilter([label, ...selectedFilter]);
      setDiscount((prevDisc) =>
        prevDisc.map((disc) =>
          disc.value === value ? { ...disc, checked: true } : disc
        )
      );
    } else {
      setDiscount((prevDisc) =>
        prevDisc.map((disc) =>
          disc.value === value ? { ...disc, checked: false } : disc
        )
      );
      const updatedDiscountFilter = selectedFilter.filter(
        (disc) => disc !== label
      );
      setSelectedFilter(updatedDiscountFilter);
    }
  }

  //Handle clear All btn
  function handleClearAllFilters() {
    setSelectedFilter([]);
    setValue([100, 100000]);
    setAssuredCheckbox(false);

    //for brand filter
    const updatedBrands = uniqueBrandsArray.map((brand) => ({
      ...brand,
      checked: false,
    }));
    setBrands(updatedBrands);
    //for rate filter
    const updatedRate = rating.map((rate) => ({ ...rate, checked: false }));
    setRating(updatedRate);
    //for discount filter
    const updatedDiscount = discount.map((disc) => ({
      ...disc,
      checked: false,
    }));
    setDiscount(updatedDiscount);
  }

  // Function for handle Ascending order
  function handleAscendingOrder() {
    const colRef = collection(db, "products");
    const q = query(
      colRef,
      where("type", "==", categoryType),
      orderBy("actual_price", "asc")
    );
    const querySnap = onSnapshot(
      q,
      (snaps) => {
        let list = [];
        snaps.docs.forEach((doc) => {
          list.push({ ...doc.data(), id: doc.id });
        });
        setAllProducts(list);
        navigate(`/product/${params.id}/sort=price_asc`);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  // Function for handle Descending order
  async function handleDescendingOrder() {
    const colRef = collection(db, "products");
    const q = query(
      colRef,
      where("type", "==", categoryType),
      orderBy("actual_price", "desc")
    );
    const querySnap = onSnapshot(
      q,
      (snaps) => {
        let list = [];
        snaps.docs.forEach((doc) => {
          list.push({ ...doc.data(), id: doc.id });
        });
        setAllProducts(list);
        navigate(`/product/${params.id}/sort=price_desc`);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // Function for handle Newest order
  async function handleNewestOrder() {
    const colRef = collection(db, "products");
    const q = query(
      colRef,
      where("type", "==", categoryType),
      orderBy("uploadedTime", "desc")
    );
    const querySnap = onSnapshot(
      q,
      (snaps) => {
        let list = [];
        snaps.docs.forEach((doc) => {
          list.push({ ...doc.data(), id: doc.id });
        });
        setAllProducts(list);
        navigate(`/product/${params.id}/sort=newest`);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // Function for handle populer order
  async function handlePopularity() {
    const colRef = collection(db, "products");
    const q = query(colRef, where("type", "==", categoryType));
    const querySnap = onSnapshot(
      q,
      (snaps) => {
        let list = [];
        snaps.docs.forEach((doc) => {
          list.push({ ...doc.data(), id: doc.id });
        });
        setAllProducts(list);
        navigate(`/product/${params.id}/sort=popular`);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  useEffect(() => {
    const colRef = collection(db, "products");
    let q = query(colRef,where('type', '==', categoryType));

    // Apply filters based on selectedFilter
    const filterConditions = [];

    selectedFilter.forEach((filter) => {
      // Filter by price range
      if (filter.startsWith("₹")) {
        if(value[1] === 10000){
          filterConditions.push(
            where("final_price", ">=", value[0])
          );
        }else{
          filterConditions.push(
            where("final_price", ">=", value[0]),
            where("final_price", "<=", value[1])
          );
        }
       
      }
      if (filter === "Plus(FAssured)") {
        // Filter of assured products
        filterConditions.push(where("assured", "==", "true"));
      }

      if (uniqueBrandName.includes(filter)) {
        // Filter by brand
        filterConditions.push(where("brand", "in", selectedFilter));
      }
      // Filter by rating
      if (ratingArray.includes(filter)) {
        filterConditions.push(where("ratings", ">=", +filter[0]));
      }
      // Filter by discount
      if (discountArray.includes(filter)) {
        filterConditions.push(
          where("discount_percentage", ">=", +(filter[0] + filter[1]))
        );
      }
    });

    if (filterConditions.length > 0) {
      filterConditions.forEach((condition) => {
        q = query(q, condition);
      });
    }

    setLoading(true);
    const getData = onSnapshot(
      q,
      (snaps) => {
        let list = [];
        snaps.docs.forEach((doc) => {
          list.push({ ...doc.data(), id: doc.id });
          brandName.push(doc.data().brand);
        });
        setLoading(false);
        setAllProducts(list);
      },
      (error) => {
        console.log(error);
        setLoading(false);
      }
    );

    return () => {
      getData();
    };
  }, [selectedFilter]);

  useEffect(() => {
    window.scrollTo(0,0)
  },[page])

  return (
    <div className={style.product_main}>
      <div className={style.filterDiv}>
        {/* All filters container */}

        <div className={style.allFilters}>
          <div className={style.clrBtn}>
            <span className={style.filterSpan}>Filters</span>
            {selectedFilter.length > 0 && (
              <Button
                onClick={handleClearAllFilters}
                sx={{ fontSize: ".7rem" }}
              >
                Clear all
              </Button>
            )}
          </div>
          <div className={style.filterContainer}>
            {selectedFilter
              ?.slice(0, showAll ? selectedFilter.length : 4)
              .map((item, i) => (
                <span
                  key={i + item}
                  className={style.curFilter}
                  onClick={() => handleRemoveFilter(item)}
                >
                  <CloseIcon
                    sx={{ fontSize: ".8rem", mb: "-2px", color: "gray" }}
                  />{" "}
                  {item}
                </span>
              ))}
          </div>
          {selectedFilter.length > 4 && (
            <div>
              <Button
                sx={{ fontSize: ".7rem" }}
                onClick={() => setShowAll(!showAll)}
              >
                {showAll ? "Show Less" : "Show More"}
              </Button>
            </div>
          )}
        </div>

        {/* Price slider container */}

        <div className={style.priceDiv}>
          <div className={style.clrBtn}>
            <span>Price</span>
            {value[0] != 100 || value[1] != 100000 ? (
              <Button onClick={handlePriceRemove} sx={{ fontSize: ".7rem" }}>
                Clear all
              </Button>
            ) : null}
          </div>
          <div>
            <Box>
              <Slider
                min={100}
                max={10000}
                value={value}
                onChange={handleRange}
                // valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                size="small"
              />
            </Box>
          </div>
        </div>

        {/* Assured check-Box container */}
        <div className={style.assured}>
          <input
            name="checkbox"
            type="checkbox"
            checked={assuredCheckbox}
            onChange={handleAssured}
          />
          <label htmlFor="checkbox">
            <img
              src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png"
              alt=""
            />
          </label>
        </div>

        {/* Brand container */}

        <div className={style.brandContainer}>
          <div
            className={style.brandDiv}
            onClick={() => {
              setIsBrandShow(!isBrandShow);
              setBrands(brandsList);
            }}
          >
            <span>BRAND</span>
            {isBrandShow ? (
              <KeyboardArrowUpIcon sx={{ color: "gray" }} />
            ) : (
              <KeyboardArrowDownIcon sx={{ color: "gray" }} />
            )}
          </div>

          {isBrandShow && (
            <div className={style.allBrand}>
              <div className={style.searchDiv}>
                <SearchIcon sx={{ fontSize: "20px", color: "gray" }} />

                <input
                  type="text"
                  placeholder=" Search Brand"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              {uniqueBrandsArray
                .slice(0, showAllBrands ? uniqueBrandsArray.length : 6)
                .map((brand, i) => (
                  <div key={i + brand} className={style.brandMap}>
                    <input
                      type="checkbox"
                      checked={brand.checked}
                      onChange={() => handleBrandFilter(brand.value)}
                    />
                    <label htmlFor="">{brand.label}</label>
                  </div>
                ))}
              {brands.length > 6 && (
                <div>
                  <Button onClick={() => setShowAllBrands(!showAllBrands)}>
                    {showAllBrands ? `show Less` : `${brands.length - 6} more`}
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Rating container */}

        <div className={style.brandContainer}>
          <div
            className={style.brandDiv}
            onClick={() => setIsRatingShow(!isRatingShow)}
          >
            <span>CUSTOMER RATINGS</span>
            {isRatingShow ? (
              <KeyboardArrowUpIcon sx={{ color: "gray" }} />
            ) : (
              <KeyboardArrowDownIcon sx={{ color: "gray" }} />
            )}
          </div>

          {isRatingShow && (
            <div className={style.allBrand}>
              {rating.map((rate) => (
                <div className={style.brandMap}>
                  <input
                    type="checkbox"
                    checked={rate.checked}
                    onChange={() => handleRaing(rate.value, rate.label)}
                  />
                  <label htmlFor="">{rate.label}</label>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Discount container */}

        <div className={style.brandContainer}>
          <div
            className={style.brandDiv}
            onClick={() => setIsDiscountShow(!isDiscountShow)}
          >
            <span>DISCOUNT </span>
            {isDiscountShow ? (
              <KeyboardArrowUpIcon sx={{ color: "gray" }} />
            ) : (
              <KeyboardArrowDownIcon sx={{ color: "gray" }} />
            )}
          </div>

          {isDiscountShow && (
            <div className={style.allBrand}>
              {discount.map((disc) => (
                <div className={style.brandMap}>
                  <input
                    type="checkbox"
                    checked={disc.checked}
                    onChange={() => handleDiscount(disc.value, disc.label)}
                  />
                  <label htmlFor="">{disc.label}</label>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className={style.productListDiv}>
        {loading ? (
          <CircularProgress
            sx={{ ml: "50%", mt: "20%" }}
            thickness={4}
            size={40}
          />
        ) : (
          <>
            {allProducts.length === 0 ? (
              <div>
                {" "}
                <NoResult />{" "}
              </div>
            ) : (
              <ProductList
                viewProdcts={allProducts}
                handleAscendingOrder={handleAscendingOrder}
                handleDescendingOrder={handleDescendingOrder}
                handleNewestOrder={handleNewestOrder}
                handlePopularity={handlePopularity}
                page={page} setPage={setPage}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default ProductPage;
