import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SellerHeader from "./SellerHeader";

const ShowHeader = ({ children }) => {
  const location = useLocation();

  const [navBar, setNavBar] = useState(false);

  useEffect(() => {
    if (location.pathname.includes("seller")) {
      setNavBar(false);
    } else {
      setNavBar(true);
    }
  }, [location]);
  return <div>{navBar? children : <SellerHeader/>}</div>;
};

export default ShowHeader;
