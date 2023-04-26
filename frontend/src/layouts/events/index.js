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
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import MDButton from "components/MDButton";
import { Link } from "react-router-dom";

import {
  useMaterialUIController,
} from './../../context'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import api from "./../../fetch-api";

function Tables() {
  const navigate = useNavigate();
  const [controller, dispatch] = useMaterialUIController();

  const printCell = ({ text }) => (
    <MDTypography component="span" variant="caption" color="text" fontWeight="medium">
      {text}
    </MDTypography>
  );

  const linkCell = ({ text, to }) => (
    <MDTypography component={Link} to={to} color="text" fontWeight="medium" fontSize="14.5px">
      {text}
    </MDTypography>
  );

  const [eventColumns, setEventColumns] = useState([
    { Header: "title", accessor: "title", align: "left" },
    { Header: "start_time", accessor: "start_time", align: "center" },
    { Header: "end_time", accessor: "end_time", align: "center" },
    { Header: "location", accessor: "location", align: "center" },
    { Header: "action", accessor: "action", align: "center" }
  ]);

  const [eventRows, setEventRows] = useState([
    {
      id: 0,
      title: printCell({ text: "" }),
      start_time: printCell({ text: "-" }),
      end_time: printCell({ text: "-" }),
      location: printCell({ text: "" }),
      action: printCell({ text: "" }),
    }
  ]);

  const [loading, setLoading] = useState(0);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure to delete this event? (ID: ' + id + ')')) {
      api.event_delete(id).then((res) => {
        if (res.status === 200) {
          alert('delete successfully');
          setLoading(loading + 1);
        } else {
          alert('delete failed');
        }
      });
    }
  }

  useEffect(() => {
    console.log('calling api');
    api.event_getAll().then((res) => {
      console.log(res);
      if (res.status === 200) {
        const data = res.instance;
        const userRows = data.map((user) => {
          return {
            id: user.eventID,
            title: linkCell({ text: user.eventName, to: `/event/${user.eventID}` }),
            start_time: printCell({ text: user.startTime.substring(0, 10) }),
            end_time: printCell({ text: user.endTime.substring(0, 10) }),
            location: printCell({ text: user.location }),
            action: (
              <MDButton
                color="error"
                variant="text"
                onClick={() => handleDelete(user.eventID)}
                iconOnly={true}
              >
                <Icon>delete_forever</Icon>
              </MDButton>
            ),
          }
        });
        setEventRows(userRows);
      } else {
        alert('Error: Failed to get events.');
      }
    });
  }, [loading])

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
                  Events
                  <MDButton
                    component={Link}
                    to="/event-form"
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
                  table={{ columns: eventColumns, rows: eventRows }}
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
