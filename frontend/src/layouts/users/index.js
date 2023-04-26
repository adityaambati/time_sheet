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
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import userTableData from "layouts/users/data/userTableData";
import employeeTableData from "layouts/users/data/employeeTableData";
import MDButton from "components/MDButton";
import { Icon } from "@mui/material";
import { Link } from "react-router-dom";

import {
  useMaterialUIController,
  setUsers,
  setEmployees,
} from './../../context'
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import api from "./../../fetch-api";

function Tables() {
  const navigate = useNavigate();
  const [controller, dispatch] = useMaterialUIController();
  // get context value users and employees
  const { users, employees } = controller;

  const printCell = ({ text }) => (
    <MDTypography component="span" variant="caption" color="text" fontWeight="medium">
      {text}
    </MDTypography>
  );

  const [userColumns, setUserColumns] = useState([
    { Header: "email", accessor: "email", align: "left" },
    { Header: "role", accessor: "role", align: "center" },
    { Header: "action", accessor: "action", align: "center" }
  ]);


  const [employeeColumns, setEmployeeColumns] = useState([
    { Header: "name", accessor: "name", align: "left" },
    { Header: "email", accessor: "email", align: "center" },
    { Header: "action", accessor: "action", align: "center" }
  ]);

  const [userRows, setUserRows] = useState([
    {
      email: printCell({ text: "-" }),
      role: printCell({ text: "-" }),
      action: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          Edit
        </MDTypography>
      ),
    }
  ]);

  const [employeeRows, setEmployeeRows] = useState([
    {
      name: printCell({ text: "-" }),
      email: printCell({ text: "-" }),
      action: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          Edit
        </MDTypography>
      ),
    }
  ]);

  useEffect(() => {
    console.log('calling api');
    api.user_getAll().then((res) => {
      console.log(res);
      if (res.status === 200) {
        const data = res.instance;
        const userRows = data.map((user) => {
          return {
            email: printCell({ text: user.email }),
            role: printCell({ text: user.role }),
            action: (
              <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
                Edit
              </MDTypography>
            ),
          }
        });
        setUserRows(userRows);
        // setUsers(dispatch, userRows);
      }
    });

    api.employee_getAll().then((res) => {
      console.log(res);
      if (res.status === 200) {
        const data = res.instance;
        const userRows = data.map((user) => {
          return {
            name: printCell({ text: user.name }),
            email: printCell({ text: user.email }),
            action: (
              <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
                Edit
              </MDTypography>
            ),
          }
        });
        setEmployeeRows(userRows);
        // setEmployees(dispatch, userRows);
      }
    });
  }, [])

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
                  Managers & Supervisers
                  <MDButton
                    component={Link}
                    to="/user-form"
                    variant="contained"
                    color="white"
                    size="small"
                    rounded="true"
                    sx={{
                      fontWeight: 500,
                      fontSize: "0.875rem",
                      ml: 2
                    }}

                  >
                    Add New
                  </MDButton>
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns: userColumns, rows: userRows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
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
                  Employees

                  <MDButton
                    component={Link}
                    to="/employee-form"
                    variant="contained"
                    color="white"
                    size="small"
                    rounded="true"
                    sx={{
                      fontWeight: 500,
                      fontSize: "0.875rem",
                      ml: 2
                    }}

                  >
                    Add New
                  </MDButton>
                </MDTypography>
              </MDBox>
              {/* <MDBox color="text">
                <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small" onClick={null}>
                  more_vert
                </Icon>
              </MDBox> */}
              <MDBox pt={3}>
                <DataTable
                  table={{ columns: employeeColumns, rows: employeeRows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
