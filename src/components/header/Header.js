import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Avatar, TextField } from "@mui/material";
import style from "./Header.module.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import { useNavigate } from "react-router-dom";

function Header() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate()

  return (
    <Box sx={{ flexGrow: 0, mb:'60px' }}>
      <AppBar position="fixed"  sx={{padding:'0 5rem'}}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            
          }}
        >
          
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <img onClick={() => navigate('/')} src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/flipkart-plus_8d85f4.png" alt="" className={style.logo} />
            <div className={style.searchDiv}>
              <input
                className={style.searchInput}
                type="text"
                placeholder="Search for products, brand and more"
              />
              <SearchIcon
                sx={{
                  backgroundColor: "white",
                  color: "blue",
                  height: "2.5rem",
                  width: "2rem",
                  borderRadius: "0 3px 3px 0",
                  cursor:'pointer'
                }}
              />
            </div>
            {isLogin ? (
              <button className={style.loginBtn}>Login</button>
            ) : (
              <FadeMenu />
            )}
            <span>Become a seller</span>
            <span>
              More
              <KeyboardArrowDownIcon
                sx={{ ml: "-2px", mb: "-2px", fontSize: "15px" }}
              />
            </span>
          </Typography>
          <div className={style.cartdiv} onClick={() => navigate('/viewCart/1')}>
            <Badge badgeContent={4} color="error">
              <ShoppingCartIcon />
            </Badge>
            <span className={style.cart}>Cart</span>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

function FadeMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button sx={{ color: "white",textTransform:'capitalize', fontSize:'20px' }} onClick={handleClick}>
        Adarsh
        <KeyboardArrowDownIcon sx={{fontSize:'18px'}} />
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose} sx={{mt:'10px'}}>
        <MenuItem onClick={handleClose}> <AccountCircleIcon sx={{fontSize:'20px', mr:'10px',color:'#1976D2'}}/> My Profile</MenuItem>
        <MenuItem onClick={handleClose}><DriveFileMoveIcon sx={{fontSize:'20px', mr:'10px',color:'#1976D2'}}/> Oders</MenuItem>
        <MenuItem onClick={handleClose}><LogoutIcon sx={{fontSize:'20px', mr:'10px',color:'#1976D2'}} /> Logout</MenuItem>
      </Menu>
    </div>
  );
}

export default Header;
