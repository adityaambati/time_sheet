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

import api from "./../../fetch-api";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";



import Checkbox from '@mui/material/Checkbox';


import { useNavigate } from 'react-router-dom';

function EmployeeForm() {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    date_submitted: "2022-01-01T01:00:00.000+00:00",
    status: "Submitted",
    today_date: "2022-01-01",
    convicted_felony: false,
    authorised_to_work_usa: true
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value == 'true' ? true : event.target.value == 'false' ? false : event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const date = new Date();
    let dob_formatted = formData.dob.replace(/\//g, "-");
    setFormData({
      ...formData,
      status: "Submitted",
      convicted_felony: false,
      authorised_to_work_usa: true,
      dob: dob_formatted
    });

    console.log(formData);
    let resp = await api.employee_add(formData);
    // console.log(resp, 'resp');
    if (resp.status == 202) {
      alert("Employee already exists with this phone number.");
    } else if (resp.status == 200) {
      alert("Employee added successfully.");
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
                  Employee Registration
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <MDBox px={2}>
                  <MDTypography variant="h6" color="text" fontWeight="400">
                    Personal Information
                  </MDTypography>
                </MDBox>

                <MDBox px={2} pb={2}>
                  <MDTypography variant="body2" color="text" fontWeight="400">
                    Use full name as displayed on your government issued ID
                    <br />
                    Use a permanent address where you can receive mail.
                  </MDTypography>
                </MDBox>

                <MDBox px={2} pb={2}>
                  <MDInput
                    id="name"
                    label="Name"
                    placeholder="Name"
                    onChange={handleChange}
                    fullWidth
                  />
                </MDBox>


                <MDBox px={2} pb={2}>
                  <MDInput
                    id="phone"
                    label="Phone"
                    placeholder="Phone"
                    onChange={handleChange}
                    fullWidth
                  />
                </MDBox>
                <MDBox px={2} pb={2}>
                  <MDInput
                    id="address"
                    label="Address"
                    placeholder="Address"
                    onChange={handleChange}
                    fullWidth
                  />
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
                    id="ssn"
                    label="SSN"
                    placeholder="SSN"
                    onChange={handleChange}
                    fullWidth
                  />
                </MDBox>

                <MDBox px={2} pb={2}>
                  <MDInput
                    id="dob"
                    label="Date of Birth"
                    placeholder="YYYY-MM-DD"
                    onChange={handleChange}
                    fullWidth
                  />
                </MDBox>


                <MDBox px={2} pb={2}>
                  <MDInput
                    id="gender"
                    label="Gender"
                    placeholder="Male/Female/Other"
                    onChange={handleChange}
                    fullWidth
                  />
                </MDBox>

                <MDBox px={2} pb={2}>
                  <MDInput
                    id="poi"
                    label="Position of Interest"
                    placeholder="Position of Interest"
                    onChange={handleChange}
                    fullWidth
                  />
                </MDBox>

                <MDBox px={3} pb={2}>

                  <MDTypography variant="h6" color="text" fontWeight="400">
                    Authorized to Work in the US?
                  </MDTypography>
                  <Checkbox
                    id="authorised_to_work_usa"
                    label="Authorized to Work in the US?"
                    placeholder="Yes/No"
                    value={true}
                    onChange={handleChange}
                    fullWidth
                  /> Yes
                </MDBox>

                <MDBox px={3} pb={2}>

                  <MDTypography variant="h6" color="text" fontWeight="400">
                    Have you ever been convicted of a felony?
                  </MDTypography>
                  <Checkbox
                    id="convicted_felony"
                    label="Have you ever been convicted of a felony?"
                    placeholder="Yes/No"
                    onChange={handleChange}
                    fullWidth
                  /> Yes
                </MDBox>

                <MDBox px={2} pb={2}>
                  <MDInput
                    id="next_of_kin"
                    label="Name and Number of Next of Kin"
                    placeholder="Name and Number of Next of Kin"
                    onChange={handleChange}
                    fullWidth
                  />
                </MDBox>

                <MDBox px={2} pb={2}>
                  <MDInput
                    id="today_date"
                    label="Today's Date"
                    placeholder="YYYY-MM-DD"
                    onChange={handleChange}
                    value={new Date().toLocaleDateString().replace(/\//g, '-')}
                    fullWidth
                  />
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

export default EmployeeForm;
