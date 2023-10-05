import React, { useEffect, useRef, useState } from "react";
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
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "../../firebase.config";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { selectUserID, selectUserName, setLogoutUser, setUser } from "../../redux/authSlice";
import CircularProgress from '@mui/material/CircularProgress';
import { collection, doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import { ALLProducts, addToCart } from "../../redux/productSlice";

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
  const currentUser = useSelector(selectUserName);
  const userId = useSelector(selectUserID)
  
  const [isSignup, setIsSignup] = useState(false);
  const [isNameInput, setIsNameInput] = useState(false);
  const [toLogin, setToLogin] = useState(false);
  const [isEditEmail, setIsEditEmail] = useState(false);

  const [signupFirstName, setSignupFirstName] = useState("");
  const [signupLastName, setSignupLastName] = useState("");
  const [userInput, setUserInput] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [FNerr, setFNerr] = useState("");
  const [LNerr, setLNerr] = useState("");
  const [Eerr, setEerr] = useState("");
  const [PsErr, setPsErr] = useState("");
  const [disable, setDisable] = useState(false)

  const [loader, setLoader] = useState(false)
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const toastId = useRef(null);
  const [cartLength, setCartLength] = useState(0)

  const [open, setOpen] = useState(false);

  const handleOpen = (btn) => {
    if (btn === "signup") {
      setOpen(true);
      handleCreateAcc();
    } else {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setIsSignup(false);
    setIsNameInput(false);
    setToLogin(false);
    setUserInput("");
    clearAllErrors();
    setIsEditEmail(false);
  };

  const signupBtnName = isNameInput ? "SignUp" : "CONTINUE";
  const loginBtnName = toLogin ? "Login" : "Request LOGIN";

  function clearAllSignupInputFields() {
    setUserInput("");
    setSignupFirstName("");
    setSignupLastName("");
    setSignupPassword("");
    clearAllErrors();
  }

  function clearAllErrors() {
    setEerr("");
    setFNerr("");
    setLNerr("");
    setPsErr("");
  }

  function handleExistingLogin() {
    setIsSignup(false);
    setIsNameInput(false);
    setToLogin(false);
    setUserInput("");
    clearAllErrors();
    setIsEditEmail(false);
  }

  const handleInputChange = (e) => {
    let input = e.target.value;
      setUserInput(input);
      setEerr("");
  };

  const existUser = false;

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
      if (/^[a-zA-Z][^0-9]{1,30}$/.test(value)) {
        setLNerr("");
      } else {
        setLNerr("Last name is invalid!");
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

  function handleLoginEmailOnBlurr(e) {
    let value = e.target.value;
    
      if (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(value)) {
        setEerr("");
      } else {
        setEerr("Please enter valid Email ID");
      }
    
  }

  async function handleSignupBtn(btn) {
    if (btn === "CONTINUE") {
     
        if (existUser) {
          if (!toast.isActive(toastId.current)) {
            toastId.current = toast.info("User already exist.");
          }
          setIsSignup(false);
          setIsNameInput(false);
          setToLogin(false);
        } else {
          setIsNameInput(true); // open sign form....
        }
      // handle signup form submit ===>>
    } else {
      if (!FNerr && !LNerr && !Eerr && !PsErr) {
        // check no any errors
          setDisable(true)
        createUserWithEmailAndPassword(auth, userInput, signupPassword)
          .then(async (res) => {
            setDisable(false)
            const user = res.user;
            await updateProfile(user, {
              displayName: `${signupFirstName} ${signupLastName}`,
            });

            await setDoc(doc(db, 'users', user.uid), {
              name: user.displayName,
              email: user.email,
              phone: '',
              cart: [],
              orders: []
            })
            dispatch(
              setUser({
                userName: user.displayName,
                userEmail: user.email,
                userID: user.uid
              })
            );
           
            if (!toast.isActive(toastId.current)) {
              toastId.current = toast.success(
                "Signup complete! you're now online.",
                {
                  position: toast.POSITION.TOP_RIGHT,
                }
              );
            }
            handleClose();
            clearAllSignupInputFields();
          })
          .catch((error) => {
            setDisable(false)
            if (
              error.message === "Firebase: Error (auth/email-already-in-use)."
            ) {
              if (!toast.isActive(toastId.current)) {
                toastId.current = toast.info(
                  "Yoy are already registered. Please log in."
                );
              }
              clearAllSignupInputFields();
              handleExistingLogin();
              setUserInput(userInput);
            } else {
              if (!toast.isActive(toastId.current)) {
                toastId.current = toast.error("Something went worng!");
              }
            }
          });
      } else {
        if (!toast.isActive(toastId.current)) {
          toastId.current = toast.error("Please fill all valid inputs.");
        }
      }
    }
  }

  async function handleLoginBtn(btn) {
    if (btn === "Request LOGIN") {
      if (!Eerr) {
        setToLogin(true);
        setIsEditEmail(true);
      }
    } else {
      setDisable(true)
      signInWithEmailAndPassword(auth, userInput, loginPassword)
        .then( (res) => {
          setDisable(false)
          dispatch(
            setUser({
              userName: res.user.displayName,
              userEmail: res.user.email,
              userID: res.user.uid
            })
          );

          if (!toast.isActive(toastId.current)) {
            toastId.current = toast.success("Success! You're logged in.", {
              position: toast.POSITION.TOP_RIGHT,
            });
          }
          handleClose();
          setLoginPassword("");
        })
        .catch((err) => {
          setDisable(false)
          if (!toast.isActive(toastId.current)) {
            toastId.current = toast.error("Invalid credentails!");
          }
        });
    }
  }

  function handleCreateAcc() {
    setIsSignup(true);
    setToLogin(false);
    setUserInput("");
    clearAllErrors();
    setIsEditEmail(false);
  }

  function openChangeEmail() {
    setToLogin(false);
    setIsEditEmail(false);
  }


  useEffect(() => {
    
    auth.onAuthStateChanged((user) => {
      setLoader(true)
      if (user) {
        let list =[]
        setLoader(false)
        dispatch(
          setUser({
            userName: user.displayName,
            userEmail: user.email,
            userID: user.uid
          })
        );
        const getCartData = async () => {
          const cartDoc =  onSnapshot(doc(db, 'users', user.uid), (doc) => {
            setCartLength(doc.data().cart.length)
          })
        
           
          }
          getCartData()
       localStorage.setItem('isActive', true)
      } else {
        localStorage.setItem('isActive', false)
        setLoader(false)
        dispatch(setLogoutUser());
      }
    });
    
  }, [auth]);


 
  

  return (
    <Box sx={{ flexGrow: 0, mb: "60px" }}>
      <AppBar
        position="fixed"
        sx={{ padding: "0 9rem", backgroundColor: "#2874f0",height:'10vh' }}
      >
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
           <ToastContainer
              position="bottom-center"
              hideProgressBar
              closeButton={false}
              pauseOnHover={false}
              role="alert"
              autoClose={2000}
              theme="dark"
              style={{ width: "auto" , fontSize: "1rem" }}
            />
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
                <span className={style.plusDiv}>
                  Explore <span>Plus</span>
                  <span>
                    <img
                      src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/plus_aef861.png"
                      alt=""
                    />
                  </span>
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
                      height: "2.1rem",
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
                  width: "55vw",
                  height: "90vh",
                  border: "none",
                  overflowY: "scroll",
                }}
              >
                <ToastContainer
                  position="bottom-center"
                  hideProgressBar
                  closeButton={false}
                  pauseOnHover={false}
                  role="alert"
                  autoClose={3000}
                  theme="dark"
                />
                <div className={style.loginMainContainer}>
                  {isSignup ? (
                    <div className={style.loginText}>
                      <h1>Looks like </h1>
                      <h1>yor're new here!</h1>
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

                    {isEditEmail && (
                      <div className={style.changeEmailInpt}>
                        <TextField
                          label="Enter Email Address"
                          variant="standard"
                          sx={{ width: !isNameInput ? "80%" : "100%" }}
                          disabled
                          value={userInput}
                          onChange={(e) => setLoginPassword(e.target.value)}
                        />
                        <button
                          onClick={openChangeEmail}
                          className={style.changeBtn}
                        >
                          change?
                        </button>
                      </div>
                    )}

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
                      <>
                        <TextField
                          label={
                            isSignup
                              ? "Enter Your Email Address"
                              : "Enter Email Address"
                          }
                          variant="standard"
                          sx={{ width: isNameInput ? "80%" : "100%" }}
                          autoFocus
                          disabled={isNameInput}
                          value={userInput}
                          onChange={handleInputChange}
                          onBlur={handleLoginEmailOnBlurr}
                        />
                        {Eerr &&  (
                          <p className={style.error}> {Eerr}</p>
                        )}
                      </>
                    )}
                    {isNameInput && (
                      <button
                        onClick={() => {setIsNameInput(false); clearAllErrors()}}
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
                      <>
                        <div className={style.terms}>
                          By continuing, you agree to Flipkart's{" "}
                          <span>Terms of Use</span> and{" "}
                          <span>Privacy Policy.</span>
                        </div>
                      </>
                    )}
                    {isSignup ? (
                      <>
                        <button
                          onClick={() => handleSignupBtn(signupBtnName)}
                          className={style.loginRequestBtn}
                          disabled={disable}
                        >
                          {disable? <CircularProgress color="inherit" thickness={5} size={30}/> : signupBtnName}
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
                        disabled={disable}
                      >
                        {disable? <CircularProgress color="inherit" thickness={5} size={30}/> : loginBtnName}
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

            {currentUser ? (
              <>
                {location.pathname !== "/checkout" && (
                  <Tippy
                  theme="light"
                  content={
                    <LoginTippy
                      handleOpen={handleOpen}
                      currentUser={currentUser}
                      toastId={toastId}
                      toast={toast}
                    />
                  }
                  interactive={true}
                >
                  <Button
                    sx={{
                      color: "white",
                      textTransform: "capitalize",
                      fontSize: "1rem",
                    }}
                  >
                    {currentUser.split(' ')[0]}
                    <KeyboardArrowDownIcon sx={{ fontSize: "18px" }} />
                  </Button>
                  </Tippy>
                )}
             </>
            ) : (
              <Tippy
                theme="light"
                content={<LoginTippy handleOpen={handleOpen} />}
                interactive
              >
                 {location.pathname !== "/checkout" && (
                <button
                  className={style.loginBtn}
                  onClick={() => handleOpen("login")}
                >
                  Login
                </button>
                 )}
              </Tippy>
            )}
            {location.pathname !== "/viewCart" &&
              location.pathname !== "/checkout" && (
                <span className={style.cartdiv} onClick={() => navigate('/seller')}>Become a seller</span>
              )}

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
                  <Badge badgeContent={cartLength>0 && userId && cartLength} color={cartLength>0 ? "error" : "default"} >
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
