/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState } from "react";
// import fetch api from root folder
import api from "./../../../fetch-api";
import {
  useMaterialUIController,
  setLoginMode
} from "./../../../context";

// react-router-dom components
import { Routes, Link, Route, useNavigate } from 'react-router-dom';


// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
// import { Redirect } from 'react-router-dom';

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

function Basic() {
  // create state loginRedirect 
  const [loginRedirect, setLoginRedirect] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [controller, dispatch] = useMaterialUIController();
  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const navigate = useNavigate();

  if(controller.loggedIn) {
    navigate('/dashboard');
  }

  // create form data state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });


  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSignin() {
    console.log(formData, 'signin');
    // call signin api
    let resp = await api.signin(formData);
    console.log(resp, 'resp');
    if (resp.status == 400) {
      alert("Invalid email or password.");
    } else if (resp.status == 200) {
      setLoginMode(dispatch, true);
      navigate('/dashboard');
    }
  }


  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput name="email" onChange={handleChange} type="email" label="Email" fullWidth />
            </MDBox>
            {/* <MDBox mb={2}>
              <MDInput type="tel" label="Mobile" fullWidth />
            </MDBox> */}
            <MDBox mb={2}>
              <MDInput name="password" onChange={handleChange} type="password" label="Password" fullWidth />
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton onClick={handleSignin} to="/dashboard" variant="gradient" color="info" fullWidth>
                sign in
              </MDButton>
              {loginRedirect ? (<Link to="/dashboard" />) : <></>}
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/signup"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
