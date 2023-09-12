import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar, TextField } from "@mui/material";
import style from "./Header.module.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Badge from "@mui/material/Badge";
import { useNavigate } from "react-router-dom";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import LoginTippy from "./LoginTippy";
import "tippy.js/themes/light.css";
import MoreTippy from "./MoreTippy";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const styles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
};

function Header() {
  const [isLogin, setIsLogin] = useState(true);
  const [isSignup, setIsSignup] = useState(false);
  const [isNameInput, setIsNameInput] = useState(false);
  const [toLogin, setToLogin] = useState(false);

  const [signupFullName, setSignupFullName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [userInput, setUserInput] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  
  

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const signupBtnName = isNameInput ? "SignUp" : "CONTINUE";
  const loginBtnName = toLogin ? "Login" : "Request LOGIN";

  function handleExistingLogin() {
    setIsSignup(false);
    setIsNameInput(false);
    setToLogin(false);
  }

  const handleInputChange = (e) => {
    const input = e.target.value;
    if (isSignup) {
      if (/^\d+$/.test(input)) {
        setUserInput(input);
      } else {
        setUserInput("");
      }
    } else {
      setUserInput(input);
    }
  };

  const loginUserDetails = JSON.parse(localStorage.getItem("userData")) || [];
  const loginUser = loginUserDetails.find(
    (user) => user.phone === userInput || user.email === userInput
  );
  const existUser = loginUserDetails.find((user) => user.phone === userInput);

  function handleSignupBtn(btn) {
    // setIsNameInput(true)
    if (btn === "CONTINUE") {
      if (userInput) {
        if (userInput.length === 10) {
          if (existUser) {
            alert("user already exist!");
            setIsSignup(false);
            setIsNameInput(false);
            setToLogin(false);
          } else {
            setIsNameInput(true);
          }
        } else {
          alert("enter valid Mobile number");
        }
      }
    } else {
      if (signupFullName && signupEmail && signupPassword) {
        const existEmail = loginUserDetails.find(
          (user) => user.email === signupEmail
        );
        if (existEmail) {
          alert("email already exist");
        } else {
          console.log(userInput, signupFullName, signupEmail, signupPassword);
          setOpen(false);
          setIsSignup(false);
          setIsNameInput(false);
          setToLogin(false);
          setUserInput("");
          setSignupFullName("");
          setSignupEmail("");
          setSignupPassword("");
          const userDetails = {
            fullName: signupFullName,
            phone: userInput,
            email: signupEmail,
            password: signupPassword,
            isActive: false,
          };

          const newUserDeatils = [...loginUserDetails, userDetails];
          localStorage.setItem("userData", JSON.stringify(newUserDeatils));
        }
      } else {
        alert("Fill all fields");
      }
    }
  }

  const handleKeyPress = (e) => {
    // Allow only numeric characters (0-9)
    if (isSignup) {
      const charCode = e.which || e.keyCode;
      if (charCode < 48 || charCode > 57) {
        e.preventDefault();
      }
    }
  };

  function handleLoginBtn(btn) {
    if (btn === "Request LOGIN") {
      if (loginUser) {
        setToLogin(true);
        // setUserInput('')
      } else {
        alert("Please enter valid Email ID/Mobile number");
      }
    } else {
      //  alert(loginUser?.password)
      const existUserPass = loginUserDetails.find(
        (user) => user.password === loginPassword && user.phone === userInput
      );
      // console.log(existUserPass.password);
      if (existUserPass) {
        alert("login successfully");
      } else {
        alert("wrong password!");
      }
    }
  }

  function handleCreateAcc() {
    setIsSignup(true);
    setToLogin(false);
    setUserInput("");
  }

  return (
    <Box sx={{ flexGrow: 0, mb: "60px" }}>
      <AppBar position="fixed" sx={{ padding: "0 5rem" }}>
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
            <img
              onClick={() => navigate("/")}
              src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/flipkart-plus_8d85f4.png"
              alt=""
              className={style.logo}
            />
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
                  cursor: "pointer",
                }}
              />
            </div>

            <Modal open={open} onClose={handleClose}>
              <Box
                sx={{
                  ...styles,
                  width: "50vw",
                  height: "85vh",
                  border: "none",
                  overflowY: "scroll",
                }}
              >
                <div className={style.loginMainContainer}>
                  {isSignup ? (
                    <div className={style.loginText}>
                      <h1>Looks like yor're new here!</h1>
                      <p>Sign up with your mobile number to get started</p>
                    </div>
                  ) : (
                    <div className={style.loginText}>
                      <h1>Login</h1>
                      <p>
                        Get access to your Orders, Wishlist and Recommendations
                      </p>
                    </div>
                  )}
                  <div className={style.loginFormDiv}>
                    {/* <form> */}
                    {toLogin ? (
                      <TextField
                        type="password"
                        label="Enter Your Password"
                        variant="standard"
                        sx={{ width: "100%" }}
                        autoFocus
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                      />
                    ) : (
                      <TextField
                        label={
                          isSignup
                            ? "Enter Your Mobile number"
                            : "Enter Email/Mobile number"
                        }
                        variant="standard"
                        sx={{ width: isNameInput ? "80%" : "100%" }}
                        autoFocus
                        disabled={isNameInput}
                        value={userInput}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                      />
                    )}
                    {isNameInput && (
                      <button
                        onClick={() => setIsNameInput(false)}
                        className={style.changeBtn}
                      >
                        change?
                      </button>
                    )}

                    {isNameInput ? (
                      <>
                        <div className={style.terms}>
                          <TextField
                            label="Enter Your Full Name"
                            variant="standard"
                            sx={{ width: "100%" }}
                            autoFocus
                            value={signupFullName}
                            onChange={(e) => setSignupFullName(e.target.value)}
                          />
                        </div>
                        <div className={style.terms}>
                          <TextField
                            label="Enter Your Email"
                            variant="standard"
                            sx={{ width: "100%" }}
                            // autoFocus
                            value={signupEmail}
                            onChange={(e) => setSignupEmail(e.target.value)}
                          />
                        </div>
                        <div className={style.terms}>
                          <TextField
                            type="passsword"
                            label="Create Your Password"
                            variant="standard"
                            sx={{ width: "100%" }}
                            // autoFocus
                            value={signupPassword}
                            onChange={(e) => setSignupPassword(e.target.value)}
                          />
                        </div>
                      </>
                    ) : (
                      <div className={style.terms}>
                        By continuing, you agree to Flipkart's{" "}
                        <span>Terms of Use</span> and{" "}
                        <span>Privacy Policy.</span>
                      </div>
                    )}
                    {isSignup ? (
                      <>
                        <button
                          onClick={() => handleSignupBtn(signupBtnName)}
                          className={style.loginRequestBtn}
                        >
                          {signupBtnName}
                        </button>
                        <button
                          onClick={handleExistingLogin}
                          className={style.existBtn}
                        >
                          Existing User? Log in
                        </button>{" "}
                      </>
                    ) : (
                      <button
                        onClick={() => handleLoginBtn(loginBtnName)}
                        className={style.loginRequestBtn}
                      >
                        {loginBtnName}
                      </button>
                    )}
                    {/* </form> */}
                    {!isSignup && (
                      <div className={style.create}>
                        <span onClick={handleCreateAcc}>
                          New to Flipkart? Create an account{" "}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </Box>
            </Modal>

            {isLogin ? (
              <Tippy
                theme="light"
                content={<LoginTippy handleOpen={handleOpen} />}
                interactive={true}
              >
                <Button
                  sx={{
                    color: "white",
                    textTransform: "capitalize",
                    fontSize: "20px",
                  }}
                >
                  Adarsh
                  <KeyboardArrowDownIcon sx={{ fontSize: "18px" }} />
                </Button>
              </Tippy>
            ) : (
              <Tippy
                theme="light"
                content={<LoginTippy handleOpen={handleOpen} />}
                interactive
              >
                <button className={style.loginBtn} onClick={handleOpen}>
                  Login
                </button>
              </Tippy>
            )}
            <span>Become a seller</span>
            <Tippy theme="light" content={<MoreTippy />} interactive>
              <span>
                More
                <KeyboardArrowDownIcon
                  sx={{ ml: "-2px", mb: "-2px", fontSize: "15px" }}
                />
              </span>
            </Tippy>
          </Typography>
          <div className={style.cartdiv} onClick={() => navigate("/viewCart")}>
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

// function FadeMenu() {
//   const [anchorEl, setAnchorEl] = useState(null);
//   const open = Boolean(anchorEl);
//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <div>
//       <Button
//         sx={{ color: "white", textTransform: "capitalize", fontSize: "20px" }}
//         onClick={handleClick}
//       >
//         Adarsh
//         <KeyboardArrowDownIcon sx={{ fontSize: "18px" }} />
//       </Button>
//       <Menu
//         anchorEl={anchorEl}
//         open={open}
//         onClose={handleClose}
//         sx={{ mt: "10px" }}
//       >
//         <MenuItem onClick={handleClose}>
//           {" "}
//           <AccountCircleIcon
//             sx={{ fontSize: "20px", mr: "10px", color: "#1976D2" }}
//           />{" "}
//           My Profile
//         </MenuItem>
//         <MenuItem onClick={handleClose}>
//           <DriveFileMoveIcon
//             sx={{ fontSize: "20px", mr: "10px", color: "#1976D2" }}
//           />{" "}
//           Oders
//         </MenuItem>
//         <MenuItem onClick={handleClose}>
//           <LogoutIcon sx={{ fontSize: "20px", mr: "10px", color: "#1976D2" }} />{" "}
//           Logout
//         </MenuItem>
//       </Menu>
//     </div>
//   );
// }

export default Header;
