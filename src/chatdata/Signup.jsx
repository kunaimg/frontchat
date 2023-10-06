import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

import "../assets/css/_login.scss";
import { useNavigate } from "react-router-dom";
import app from "../firebase/Firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Swal from "sweetalert2";
function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const auth = getAuth(app);
  const SignUpUser = async () => {
    if (email && password && name && confirmPassword) {
      if (password === confirmPassword) {
        try {
          const result = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );

          Swal.fire({
            title: "Success",
            text: "successfully user signup",
            icon: "success",
            showCancelButton: true,
            confirmButtonText: "confirm",
            cancelButtonText: "cancel",
          });

          navigate("/login");
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
          text: "Password somthing wrong",
          icon: "warning",
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

  return (
    <Box> 
      <Grid container className="login">
        <Grid item lg={7} xs={12} className="left" data-aos="flip-left">
          <Box>
            <img src="./images/loginimage.jpg" alt="" />
          </Box>
        </Grid>
        <Grid item lg={5} xs={12} className="right" data-aos="flip-right">
          <Box className="top">
            <i class="uil uil-comment-dots"></i>
            <Typography sx={{ color: "white" }} variant="h6" className="h6">
              Realichat
            </Typography>
          </Box>
          <Box className="top">
            <TextField
              variant="filled"
              className="field"
              placeholder="Enter your name"
              type="text"
              onChange={(e) => {
                setName(e.target.value);
              }}
              fullWidth
            ></TextField>
          </Box>

          <Box className="top">
            <TextField
              variant="filled"
              className="field"
              placeholder="Enter your email"
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              fullWidth
            ></TextField>
          </Box>
          <Box className="top">
            <TextField
              variant="filled"
              className="field"
              placeholder="Enter your password"
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
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
                setConfirmPassword(e.target.value);
              }}
              placeholder="Enter your confirmpassword"
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
                onClick={SignUpUser}
              >
                Login
              </Button>
            </Box>
            <Box className="rightbutton1">
              <Button
                className="rightbutton"
                variant="contained"
                color="secondary"
                onClick={SignUpUser}
              >
                Signup
              </Button>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Signup;
