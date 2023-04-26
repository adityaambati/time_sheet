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
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';

import { useNavigate } from 'react-router-dom';

function UserForm() {
  let { eventId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    startTime: false,
    endTime: false,
    eventId: eventId,
  });
  const [employees, setEmployees] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    api.event_getAll().then((res) => {
      // console.log(res);
      let eventObj;
      if (res.status === 200) {
        const data = res.instance.map((item) => {
          if (eventId == item.eventID) eventObj = item;
          return {
            id: item.eventID,
            name: item.eventName
          }
        });
        setEvents(data);
        setTimeout(() => {
          let startTime = new Date(eventObj.startTime);
          let endTime = new Date(eventObj.endTime);
          startTime = startTime.toISOString().slice(0, 16);
          endTime = endTime.toISOString().slice(0, 16);

          setFormData({
            ...formData,
            startTime: startTime,
            endTime: endTime,
          });
        }, 500);
      } else {
        alert('Error: Failed to get events.');
      }
    });

    api.employee_getAll().then((res) => {
      // console.log(res);
      if (res.status === 200) {
        const data = res.instance
        .sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
        .map((employee) => {
          return {
            id: employee.id,
            name: employee.name
          }
        });
        setEmployees(data);
      } else {
        alert('Error: Failed to get employees list.');
      }
    });
  }, []);


  const handleChange = (event) => {
    // console.log(event.target.name, event.target.value);
    setFormData({
      ...formData,
      [event.target.name]: event.target.value == 'true' ? true : event.target.value == 'false' ? false : event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log(formData);
    let resp = await api.eventWorker_save({
      ...formData,
      sign_in: formData.startTime + ":00.000+00:00",
      sign_out: formData.endTime + ":00.000+00:00"
    });
    // console.log(resp, 'resp');
    if (resp.status == 202) {
      alert(resp.message);
    } else if (resp.status == 200) {
      alert("Employee added to event successfully.");
      navigate('/event/' + eventId);
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
                  Event Employee Form
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>

                <MDBox px={2} pb={2}>
                  <FormControl fullWidth={true}>
                    <InputLabel id="eventId">Event</InputLabel>
                    <Select
                      sx={{ height: "2.5rem" }}
                      labelId="eventId"
                      id="eventId"
                      name="eventId"
                      value={formData.eventId}
                      label="Event ID"
                      onChange={handleChange}
                    >
                      {
                        events.map((event) => (
                          <MenuItem value={event.id}>{event.name}</MenuItem>
                        ))
                      }
                    </Select>
                  </FormControl>
                </MDBox>


                <MDBox px={2} pb={2}>
                  <FormControl fullWidth={true}>
                    <InputLabel id="emp_Id">Employee</InputLabel>
                    <Select
                      sx={{ height: "2.5rem" }}
                      labelId="emp_Id"
                      id="emp_Id"
                      name="emp_Id"
                      value={formData.empId}
                      label="Employee ID"
                      onChange={handleChange}
                    >
                      {
                        employees.map((employee) => (
                          <MenuItem value={employee.id}>{employee.name}</MenuItem>
                        ))
                      }
                    </Select>
                  </FormControl>
                </MDBox>

                <MDBox px={2} pb={2}>
                  <TextField
                    id="startTime"
                    label="Start Time"
                    type="datetime-local"
                    onChange={handleChange}
                    name="startTime"
                    value={formData.startTime}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </MDBox>

                <MDBox px={2} pb={2}>
                  <TextField
                    id="endTime"
                    onChange={handleChange}
                    label="End Time"
                    type="datetime-local"
                    name="endTime"
                    value={formData.endTime}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </MDBox>


                <MDBox px={2} pb={2}>
                  <MDInput
                    id="remarks"
                    name="remarks"
                    label="Remarks"
                    placeholder="Remarks"
                    onChange={handleChange}
                    value={formData.remarks}
                    fullWidth
                    multiline
                    rows={4}
                  />
                </MDBox>

                <MDButton
                  // component={Link}
                  // to="/employee-form"
                  onClick={handleSubmit}
                  variant="contained"
                  color="info"
                  size="small"
                  rounded="true"
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
