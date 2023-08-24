import React, { useRef, useState } from "react";
import style from "./Carousel.module.css";
import { Button } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

function Carousel(props) {
  const [leftArrowHide, setLeftArrowHide] = useState(false);
  const [rightArrowHide, setRightArrowHide] = useState(true);
  const scrollRef = useRef(null);

  function scrollLeft() {
    scrollRef.current.scrollBy({ left: -scrollRef.current.clientWidth, behavior: 'auto' });

  }
  function scrollRight() {
    scrollRef.current.scrollBy({ left: scrollRef.current.clientWidth, behavior: 'auto' });
  }

  function handleScroll() {
    const maxScrollLeft = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
    const currentScrollLeft = scrollRef.current.scrollLeft;

    setLeftArrowHide(currentScrollLeft > 0);
    setRightArrowHide(currentScrollLeft < maxScrollLeft -1);
  }

  return (
    <div className={style.main}>
      <div className={style.left}>
        <span>{props.categoryFor}</span>
        <Button variant="contained">View All</Button>
      </div>

      <div
        className={style.right}
        ref={scrollRef}
        onScroll={handleScroll}
      >
        {props.data.slice(0,8).map((item, i) => (
          <div key={i} className={style.box}>
            <img src={item.image} alt=""  />
            <span className={style.name}>{item.name}</span>
            <span className={style.shop}>{item.shop}</span>
            <span className={style.allCat}>{item.category}</span>
          </div>
        ))}
      </div>
      <div className={style.arrow}>
        {leftArrowHide ? (
          <ArrowBackIosNewIcon
            sx={{
              position: "absolute",
              left: "20%",
              top: "35%",
              padding: "40px 15px",
              backgroundColor: "white",
              borderRadius: "0 5px 5px 0",
              boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
            }}
            onClick={scrollLeft}
          />
        ) : (
          ""
        )}
        {rightArrowHide ? (
          <ArrowForwardIosIcon
            sx={{
              position: "absolute",
              right: ".7%",
              top: "35%",
              padding: "40px 15px",
              backgroundColor: "white",
              borderRadius: "5px 0 0 5px",
              boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
            }}
            onClick={scrollRight}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Carousel;
