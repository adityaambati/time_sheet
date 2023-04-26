/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
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

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import api from "./../../../fetch-api";

export default function data() {

  const printCell = ({ text }) => (
    <MDTypography component="span" variant="caption" color="text" fontWeight="medium">
      {text}
    </MDTypography>
  );

  const createRow = ({ email, role }) => (
    {
      email: printCell(email),
      role: printCell(role),
      action: (
        <MDTypography component="span" variant="caption" color="text" fontWeight="medium">
          Edit
        </MDTypography>
      )
    }
  );

  return {
    columns: [
      { Header: "email", accessor: "email", align: "left" },
      { Header: "role", accessor: "role", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],

    rows: [
      {
        email: printCell({ text: "user1" }),
        role: printCell({ text: "admin" }),
        action: (
          <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
            X
          </MDTypography>
        )
      }
    ],
  };
}