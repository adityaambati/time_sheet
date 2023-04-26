// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { useEffect, useState } from "react";
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import TextField from '@mui/material/TextField';

import api from "./../fetch-api";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";

import Checkbox from '@mui/material/Checkbox';

import { useNavigate } from 'react-router-dom';

function EventForm() {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [supervisers, setSupervisers] = useState([]);

  const handleChange = (event) => {
    // console.log(event.target.id, event.target.name, event.target.value);
    setFormData({
      ...formData,
      [event.target.id ? event.target.id : event.target.name]: event.target.value
    });
  };

  useEffect(() => {
    api.employee_getAll().then((res) => {
      console.log(res);
      if (res.status === 200) {
        const data = res.instance.map((user) => {
          return {
            id: user.id,
            name: user.name
          }
        }).sort((a, b) => a.name.localeCompare(b.name));
        setSupervisers(data);
      } else {
        alert('Error: Failed to get superviser list.');
      }
    });
  }, []);


  const handleSubmit = async (event) => {
    event.preventDefault();


    console.log(formData);
    let resp = await api.event_save(formData);
    // console.log(resp, 'resp');
    if (resp.status == 202) {
      alert(resp.message);
    } else if (resp.status == 200) {
      alert("Event added successfully.");
      navigate('/events');
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
                  Event Information
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>

                <MDBox px={2} pb={2}>
                  <MDInput
                    id="eventName"
                    label="Event Name"
                    placeholder="Title"
                    onChange={handleChange}
                    fullWidth
                  />
                </MDBox>

                <MDBox px={2} pb={2}>
                  <MDInput
                    id="location"
                    label="Event Location"
                    placeholder="Location"
                    onChange={handleChange}
                    fullWidth
                  />
                </MDBox>


                <MDBox px={2} pb={2}>
                  <TextField
                    id="startTime"
                    label="Start Time"
                    type="datetime-local"
                    onChange={handleChange}

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

                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </MDBox>

                <MDBox px={2} pb={2}>
                  <FormControl fullWidth={true}>
                    <InputLabel id="supervisorID">Supervisor</InputLabel>
                    <Select
                      sx={{ height: "2.5rem" }}
                      id="supervisorID"
                      name="supervisorID"
                      value={formData.supervisorID}
                      label="Supervisor"
                      onChange={handleChange}
                    >
                      {
                        supervisers.map((user) => (
                          <MenuItem key={user.id} value={user.id}>{user.name}</MenuItem>
                        ))
                      }
                    </Select>
                  </FormControl>
                </MDBox>

                <MDBox px={2} pb={2}>
                  <MDInput
                    id="details"
                    label="Details"
                    placeholder="Details"
                    onChange={handleChange}
                    fullWidth
                    multiline
                    rows={4}
                  />
                </MDBox>

                <MDButton
                  onClick={handleSubmit}
                  variant="contained"
                  color="info"
                  size="small"
                  rounded="true"
                  sx={{
                    fontWeight: "medium",
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

export default EventForm;
