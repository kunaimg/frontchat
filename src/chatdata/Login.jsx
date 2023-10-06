import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

import "../assets/css/_login.scss";
import { useNavigate } from "react-router-dom";
import app from "../firebase/Firestore";

import {
  GoogleAuthProvider,
  RecaptchaVerifier,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
  signInWithPopup,
} from "firebase/auth";
import Swal from "sweetalert2";
function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const auth = getAuth(app);
  const SignInUser = async () => {
    if (email && password) {
      try {
        const result = await signInWithEmailAndPassword(auth, email, password);

        Swal.fire({
          title: "Success",
          text: "successfully user login",
          icon: "success",
          showCancelButton: true,
          confirmButtonText: "confirm",
          cancelButtonText: "cancel",
        });
        navigate("/createid");
        localStorage.setItem("valid", "kunal");
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: error.message,
          icon: "error",
          showCancelButton: true,
          confirmButtonText: "confirm",
          cancelButtonText: "cancel",
        });
      }
    } else {
      Swal.fire({
        title: "Error",
        text: "somthing went wrong",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "confirm",
        cancelButtonText: "cancel",
      });
    }
  };
  const GooleAuth = async () => {
    try {
      const googleprovider = new GoogleAuthProvider();
      const resulttt = await signInWithPopup(auth, googleprovider);

      if (resulttt.user.emailVerified == true) {
        setTimeout(() => {
          Swal.fire({
            title: "Success",
            text: "successfully user google authenticate",
            icon: "success",
            showCancelButton: true,
            confirmButtonText: "confirm",
            cancelButtonText: "cancel",
          });
        }, 300);
        localStorage.setItem("valid", "kunal");
        navigate("/createid");
      } else {
        setTimeout(() => {
          Swal.fire({
            title: "Error",
            text: "google authnticate failed",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "confirm",
            cancelButtonText: "cancel",
          });
        }, 400);
        setTimeout(() => {
          navigate("/logi");
        }, 500);
        navigate("/login");
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
        showCancelButton: true,
        confirmButtonText: "confirm",
        cancelButtonText: "cancel",
      });
    }
  };
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const PhoneAuth = () => {
    const auth = getAuth(app);
    window.recaptchaVerifier = new RecaptchaVerifier(auth, "sign-in-button", {
      size: "visible",
      callback: (response) => {
        // CAPTCHA verification succeeded
      },
      "expired-callback": (response) => {
        // CAPTCHA verification expired

        Swal.fire({
          title: "Error",
          text: "CAPTCHA verification expired",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "confirm",
          cancelButtonText: "cancel",
        });
      },
    });
  };
  let userInput;
  const handlePrompt = async () => {
    try {
      const result = await Swal.fire({
        title: "Custom Prompt",
        input: "text",
        inputLabel: "Enter something:",
        inputValue: inputValue,
        showCancelButton: true,
        confirmButtonText: "Submit",
        preConfirm: (value) => {
          return value;
        },
      });

      if (result.isConfirmed) {
        userInput = result.value;

        Swal.fire(`You entered: ${userInput}`, "", "success");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onSignInSubmit = async () => {
    await handlePrompt();

    let phoneNumber = `+91${userInput}`;

    PhoneAuth();
    const appVerifier = window.recaptchaVerifier;

    const auth = getAuth(app);

    setTimeout(async () => {
      try {
        const confirmationResult = await signInWithPhoneNumber(
          auth,
          phoneNumber,
          appVerifier
        );
        window.confirmationResult = confirmationResult;
        if (confirmationResult) {
          Swal.fire({
            title: "Success",
            text: "CAPTCHA verification succeeded",
            icon: "success",
            showCancelButton: true,
            confirmButtonText: "confirm",
            cancelButtonText: "cancel",
          });
          localStorage.setItem("valid", "kunal");
          navigate("/createid");
        }
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: error.message,
          icon: "error",
          showCancelButton: true,
          confirmButtonText: "confirm",
          cancelButtonText: "cancel",
        });
        setTimeout(() => {
          navigate("/logi");
        }, 500);
        navigate("/login");
      }
    }, 500);
  };

  return (
    <Box>
      <Grid container className="login">
        <Grid item md={7} xs={12} className="left" data-aos="flip-left">
          <Box>
            <img src="./images/loginimage.jpg" alt="" />
          </Box>
        </Grid>
        <Grid item md={5} xs={12} className="right" data-aos="flip-right">
          <Box className="top">
            <i class="uil uil-comment-dots"></i>
            <Typography sx={{ color: "white" }} variant="h6" className="h6">
              Realichat
            </Typography>
          </Box>
          <Box className="top">
            <TextField
              variant="filled"
              type="email"
              className="field"
              placeholder="Enter your email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              fullWidth
            ></TextField>
          </Box>
          <Box className="top">
            <TextField
              variant="filled"
              fullWidth
              className="field"
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Enter your password"
            ></TextField>
          </Box>
          <Stack
            className="top stack"
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Box className="leftbutton1">
              <Button
                className="leftbutton"
                variant="contained"
                color="secondary"
                onClick={SignInUser}
              >
                Login
              </Button>
            </Box>
            <Box className="rightbutton1">
              <Button
                className="rightbutton"
                variant="contained"
                color="secondary"
                onClick={() => navigate("/signup")}
              >
                Signup
              </Button>
            </Box>
          </Stack>
          <Box className="top" id="sign-in-button"></Box>
          <Box className="top">
            <Button
              variant="contained"
              className="button button1"
              color="secondary"
              onClick={GooleAuth}
            >
              Continue with google
            </Button>
          </Box>
          <Box className="top">
            <Button
              variant="contained"
              className="button"
              color="secondary"
              onClick={onSignInSubmit}
            >
              Continue with phone
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Login;
