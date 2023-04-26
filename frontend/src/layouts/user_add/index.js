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

// @mui material components
// import Grid from "@mui/material/Grid";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { useState } from "react";
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import api from "../../fetch-api";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";

import Checkbox from '@mui/material/Checkbox';

import { useNavigate } from 'react-router-dom';

function UserForm() {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({

  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value == 'true' ? true : event.target.value == 'false' ? false : event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();


    console.log(formData);
    let resp = await api.user_add(formData);
    // console.log(resp, 'resp');
    if (resp.status == 202) {
      alert(resp.message);
    } else if (resp.status == 200) {
      alert("User added successfully.");
      navigate('/users');
    } else {
      alert("Something went wrong.");
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  User Registration
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <MDBox px={2}>
                  <MDTypography variant="h6" color="text" fontWeight="400">
                    Login Information
                  </MDTypography>
                </MDBox>

                <MDBox px={2} pb={2}>
                  <MDInput
                    id="email"
                    label="Email"
                    placeholder="Email"
                    onChange={handleChange}
                    fullWidth
                  />
                </MDBox>
                <MDBox px={2} pb={2}>
                  <MDInput
                    id="password"
                    label="Password"
                    placeholder="Password"
                    onChange={handleChange}
                    fullWidth
                  />
                </MDBox>

                <MDBox px={3} pb={2}>

                  <MDTypography variant="h6" color="text" fontWeight="400">
                    Superviser?
                  </MDTypography>
                  <Checkbox
                    id="role"
                    label="Authorized to Work in the US?"
                    placeholder="Yes/No"
                    value={"superviser"}
                    onChange={handleChange}
                    fullWidth
                  /> Yes
                </MDBox>

                <MDBox px={3} pb={2}>

                  <MDTypography variant="h6" color="text" fontWeight="400">
                    Manager?
                  </MDTypography>
                  <Checkbox
                    id="role"
                    label="Authorized to Work in the US?"
                    placeholder="Yes/No"
                    value={"manager"}
                    onChange={handleChange}
                    fullWidth
                  /> Yes
                </MDBox>

                <MDButton
                  // component={Link}
                  // to="/employee-form"
                  onClick={handleSubmit}
                  variant="contained"
                  color="info"
                  size="small"
                  rounded
                  sx={{
                    fontWeight: 500,
                    fontSize: "0.875rem",
                    ml: 2
                  }}

                >
                  Save
                </MDButton>

                <MDBox px={2} pb={2}>
                  <MDTypography variant="body2" color="text" fontWeight="400"></MDTypography>
                </MDBox>

              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>

      <Footer />
    </DashboardLayout >
  );
}

export default UserForm;
