import React, { useEffect, useRef, useState } from "react";
import style from '../../components/header/Header.module.css'
import { TextField } from "@mui/material";
import {  useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "../../firebase.config";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { selectUserName, setLogoutUser, setUser } from "../../redux/authSlice";
import CircularProgress from '@mui/material/CircularProgress';
import { doc, setDoc } from "firebase/firestore";


function Login() {

  const userName = useSelector(selectUserName)
  
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
  const dispatch = useDispatch();
  const toastId = useRef(null);

 

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
              gender: '',
              addresses: [],
              cart: [],
              orders: [],
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

      if(userName){
        navigate('/')
      }
    
    auth.onAuthStateChanged((user) => {
      setLoader(true)
      if (user) {
        setLoader(false)
        dispatch(
          setUser({
            userName: user.displayName,
            userEmail: user.email,
            userID: user.uid
          })
        );
       
      } else {
        setLoader(false)
        dispatch(setLogoutUser());
      }
    });
    
  }, []);

  


  return (
    <div className={style.mainAuthDiv}>
      <div className={style.authContainer}>
         
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
      </div>
    </div>
  )
}

export default Login
