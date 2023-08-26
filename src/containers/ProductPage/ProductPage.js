import React, { useState } from "react";
import style from "./ProductPage.module.css";
import { Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import SearchIcon from "@mui/icons-material/Search";
import ProductList from "./ProductList";

function valuetext(value) {
  return `${value}Rs`;
}

const allBrands = [
  { value: "Happilo", label: "Happilo", checked: false },
  { value: "Naturoz", label: "Naturoz", checked: false },
  { value: "Granola", label: "Granola", checked: false },
  { value: "Tulsi", label: "Tulsi", checked: false },
  { value: "Nutraj", label: "Nutraj", checked: false },
  { value: "Scoris", label: "Scoris", checked: false },
  { value: "Scoris", label: "Scoris", checked: false },
  { value: "Scoris", label: "Scoris", checked: false },
  { value: "Scoris", label: "Scoris", checked: false },
  { value: "Scoris", label: "Scoris", checked: false },
  { value: "Scoris", label: "Scoris", checked: false },
];

const allRating = [
  { value: "4", label: `4☆ & above`, checked: false },
  { value: "3", label: `3☆ & above`, checked: false },
  { value: "2", label: `2☆ & above`, checked: false },
  { value: "1", label: `1☆ & above`, checked: false },
];

const allDiscount = [
  { value: "50", label: `50% or more`, checked: false },
  { value: "40", label: `40% or more`, checked: false },
  { value: "30", label: `30% or more`, checked: false },
  { value: "20", label: `20% or more`, checked: false },
  { value: "10", label: `10% or more`, checked: false },
];

function ProductPage() {
  const [brands, setBrands] = useState(allBrands);
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
  const [searchQuery, setSearchQuery] = useState('')

  const handleChange = (event, newValue) => {
    setValue(newValue);
    const newPriceFilter = `₹${newValue[0]}-₹${newValue[1]}`;
    if (!selectedFilter.includes(newPriceFilter)) {
      const updatedFilters = selectedFilter.filter(
        (filter) => !filter.startsWith("₹")
      );
      setSelectedFilter([...updatedFilters, newPriceFilter]);
    }
  };

  //Remove perticuler filter
  function handleRemoveFilter(item) {
    const updatedFilters = selectedFilter.filter((filter) => filter != item);
    setSelectedFilter(updatedFilters);
    console.log(updatedFilters);

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
      (filter) => filter != currentPriceFilter
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
        (filter) => filter != "Plus(FAssured)"
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

  //handle search brand 
  const searchBrands = brands.filter(brand => brand.label.toLowerCase().includes(searchQuery.toLowerCase()))

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
    setValue([100, 10000])
    setAssuredCheckbox(false);

    //for brand filter
    const updatedBrands = brands.map(brand => ({...brand, checked: false}))
      setBrands(updatedBrands)
       //for rate filter
    const updatedRate = rating.map(rate => ({...rate, checked: false}))
      setRating(updatedRate)
       //for discount filter
    const updatedDiscount = discount.map(disc => ({...disc, checked: false}))
      setDiscount(updatedDiscount)
   
    //if Brands filter present-
    // const brandNames = brands.map((brand) => brand.label);
    // const isBrandFilter = selectedFilter.some((item) =>
    //   brandNames.includes(item)
    // );
    // if (isBrandFilter) {
    //   const updatedBrands = brands.map(brand => ({...brand, checked: false}))
    //   setBrands(updatedBrands)
    // }
   

  }

  return (
    <div className={style.product_main}>
      <div className={style.filterDiv}>
        {/* All filters container */}

        <div className={style.allFilters}>
          <div className={style.clrBtn}>
            <span className={style.filterSpan}>Filters</span>
            {selectedFilter.length > 0 && (
              <Button onClick={handleClearAllFilters}>Clear all</Button>
            )}
          </div>
          <div className={style.filterContainer}>
            {selectedFilter
              ?.slice(0, showAll ? selectedFilter.length : 4)
              .map((item, i) => (
                <span
                  key={i}
                  className={style.curFilter}
                  onClick={() => handleRemoveFilter(item)}
                >
                  <CloseIcon sx={{ fontSize: "12px", mb: "-2px" }} /> {item}
                </span>
              ))}
          </div>
          {selectedFilter.length > 4 && (
            <div>
              <Button onClick={() => setShowAll(!showAll)}>
                {showAll ? "Show Less" : "Show More"}
              </Button>
            </div>
          )}
        </div>

        {/* Price slider container */}

        <div className={style.priceDiv}>
          <div className={style.clrBtn}>
            <span>Price</span>
            <Button onClick={handlePriceRemove}>Clear all</Button>
          </div>
          <div>
            <Box>
              <Slider
                min={100}
                max={10000}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
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
            onClick={() => setIsBrandShow(!isBrandShow)}
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

                <input type="text" placeholder=" Search Brand" value={searchQuery} onChange={(e) =>setSearchQuery(e.target.value)} />
              </div>
              {searchBrands
                .slice(0, showAllBrands ? searchBrands.length : 6)
                .map((brand, i) => (
                  <div key={i} className={style.brandMap}>
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
                    {showAllBrands ? `show Less` : `${brands.length} more`}
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
        <ProductList/>
      </div>
    </div>
  );
}

export default ProductPage;
