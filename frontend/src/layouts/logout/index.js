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
import MDTypography from "components/MDTypography";
import {
  useMaterialUIController
} from './../../context'

import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();
  const [controller, dispatch] = useMaterialUIController();

  dispatch({ type: "SIGNIN", value: false });
  navigate('/sigin');

  return (
    <DashboardLayout>
      <MDTypography>Logging out...</MDTypography>
    </DashboardLayout>
  );
}

export default Logout;
