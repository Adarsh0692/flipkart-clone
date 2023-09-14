import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import { TextField } from "@mui/material";
import style from "./Header.module.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Badge from "@mui/material/Badge";
import { useLocation, useNavigate } from "react-router-dom";
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

  const [signupFirstName, setSignupFirstName] = useState("");
  const [signupLastName, setSignupLastName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [userInput, setUserInput] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [FNerr, setFNerr] = useState("");
  const [LNerr, setLNerr] = useState("");
  const [Eerr, setEerr] = useState("");
  const [PsErr, setPsErr] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsSignup(false);
    setIsNameInput(false);
    setToLogin(false);
    setUserInput("");
  };

  const signupBtnName = isNameInput ? "SignUp" : "CONTINUE";
  const loginBtnName = toLogin ? "Login" : "Request LOGIN";

  function handleExistingLogin() {
    setIsSignup(false);
    setIsNameInput(false);
    setToLogin(false);
  }

  const handleInputChange = (e) => {
    let input = e.target.value;
    if (isSignup) {
      input = input.replace(/\D/g, "");
      if (input.length > 10) {
        input = input.slice(0, 10);
      }
      setUserInput(input);
    } else {
      setUserInput(input);
    }
  };

  const loginUserDetails = JSON.parse(localStorage.getItem("userData")) || [];
  const loginUser = loginUserDetails.find(
    (user) => user.phone === userInput || user.email === userInput
  );
  const existUser = loginUserDetails.find((user) => user.phone === userInput);

  function handleFNameOnBlurr(e) {
    let value = e.target.value;
    if (isSignup) {
      if (/^[a-zA-Z][^0-9]{2,30}$/.test(value)) {
        setFNerr("");
      } else {
        setFNerr("First name is invalid!");
      }
    }
  }
  function handleLNameOnBlurr(e) {
    let value = e.target.value;
    if (isSignup) {
      if (/^[a-zA-Z][^0-9]{2,30}$/.test(value)) {
        setLNerr("");
      } else {
        setLNerr("Last name is invalid!");
      }
    }
  }
  function handleEmailOnBlurr(e) {
    let value = e.target.value;
    if (isSignup) {
      if (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(value)) {
        setEerr("");
      } else {
        setEerr("Email is invalid!");
      }
    }
  }
  function handlePasswOnBlurr(e) {
    let value = e.target.value;
    if (isSignup) {
      if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value)) {
        setPsErr("");
      } else {
        setPsErr(
          "Password must be minimum eight characters, at least one letter and one number!"
        );
      }
    }
  }

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
      if (!FNerr && !LNerr && !Eerr && !PsErr) {
        const existEmail = loginUserDetails.find(
          (user) => user.email === signupEmail
        );
        if (existEmail) {
          alert("email already exist");
        } else {
          console.log(
            userInput,
            signupFirstName,
            signupLastName,
            signupEmail,
            signupPassword
          );
          setOpen(false);
          setIsSignup(false);
          setIsNameInput(false);
          setToLogin(false);
          setUserInput("");
          setSignupFirstName("");
          setSignupLastName("");
          setSignupEmail("");
          setSignupPassword("");
          const userDetails = {
            firstName: signupFirstName,
            lastName: signupLastName,
            phone: userInput,
            email: signupEmail,
            password: signupPassword,
            isActive: false,
          };

          const newUserDeatils = [...loginUserDetails, userDetails];
          localStorage.setItem("userData", JSON.stringify(newUserDeatils));
        }
      } else {
        alert("Please fill currect value!");
      }
    }
  }

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
      <AppBar position="fixed" sx={{ padding: "0 9rem", backgroundColor:'#2874f0' }}>
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
              justifyContent: "space-between",
            }}
          >
            <div className={style.logo_search}>
            <div className={style.imgDiv}>
              <img
                onClick={() => navigate("/")}
                src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/flipkart-plus_8d85f4.png"
                alt=""
                className={style.logo}
              />
              <span className={style.plusDiv}>Explore <span>Plus</span>
              <span><img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/plus_aef861.png" alt="" /></span>
              </span>
              </div>
              {location.pathname !== "/checkout" && (
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
                      borderRadius: "0 2px 2px 0",
                      cursor: "pointer",
                    }}
                  />
                </div>
              )}
            </div>
            <Modal open={open} onClose={handleClose}>
              <Box
                sx={{
                  ...styles,
                  width: "50vw",
                  height: "90vh",
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
                        // onKeyPress={handleKeyPress}
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
                            label="Enter Your First Name"
                            variant="standard"
                            sx={{ width: "100%" }}
                            autoFocus
                            value={signupFirstName}
                            onChange={(e) => {
                              setSignupFirstName(e.target.value);
                              setFNerr("");
                            }}
                            required
                            error={FNerr ? true : false}
                            onBlur={handleFNameOnBlurr}
                          />
                          {FNerr && <p className={style.error}> {FNerr}</p>}
                        </div>
                        <div className={style.terms}>
                          <TextField
                            label="Enter Your Last Name"
                            variant="standard"
                            sx={{ width: "100%" }}
                            value={signupLastName}
                            onChange={(e) => {
                              setSignupLastName(e.target.value);
                              setLNerr("");
                            }}
                            required
                            error={LNerr ? true : false}
                            onBlur={handleLNameOnBlurr}
                          />
                          {LNerr && <p className={style.error}> {LNerr}</p>}
                        </div>
                        <div className={style.terms}>
                          <TextField
                            label="Enter Your Email"
                            variant="standard"
                            sx={{ width: "100%" }}
                            // autoFocus
                            value={signupEmail}
                            onChange={(e) => {
                              setSignupEmail(e.target.value);
                              setEerr("");
                            }}
                            required
                            error={Eerr ? true : false}
                            onBlur={handleEmailOnBlurr}
                          />
                          {Eerr && <p className={style.error}> {Eerr}</p>}
                        </div>
                        <div className={style.terms}>
                          <TextField
                            type="password"
                            label="Create Your Password"
                            variant="standard"
                            sx={{ width: "100%" }}
                            value={signupPassword}
                            onChange={(e) => {
                              setSignupPassword(e.target.value);
                              setPsErr("");
                            }}
                            required
                            error={PsErr ? true : false}
                            onBlur={handlePasswOnBlurr}
                          />
                          {PsErr && <p className={style.error}> {PsErr}</p>}
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
                {location.pathname !== "/checkout" && (
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
                )}
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
            {location.pathname !== "/viewCart" &&
              location.pathname !== "/checkout" && <span className={style.cartdiv}>Become a seller</span>}

            {location.pathname !== "/viewCart" &&
              location.pathname !== "/checkout" && (
                <Tippy theme="light" content={<MoreTippy />} interactive>
                  <span className={style.cartdiv}>
                    More
                    <span>
                      <KeyboardArrowDownIcon
                        sx={{ ml: "-2px", mb: "-2px", fontSize: "15px" }}
                      />
                    </span>
                  </span>
                </Tippy>
              )}

            {location.pathname !== "/viewCart" &&
              location.pathname !== "/checkout" && (
                <div
                  className={style.cartdiv}
                  onClick={() => navigate("/viewCart")}
                >
                  <Badge badgeContent={4} color="error">
                    <ShoppingCartIcon />
                  </Badge>
                  <span className={style.cart}>Cart</span>
                </div>
              )}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
