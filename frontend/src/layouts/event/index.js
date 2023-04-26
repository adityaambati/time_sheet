import { useState, useEffect } from 'react';

// Material Dashboard 2 React components
import { Routes, Route, useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from "@mui/material/Card";

import Box from '@mui/material/Box';
import MDInput from "components/MDInput";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import MDButton from "components/MDButton";
import { Link } from "react-router-dom";
import api from "./../../fetch-api";
import Icon from "@mui/material/Icon";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function Event() {
  let { eventId } = useParams();

  const eventObj = {
    eventID: "",
    eventName: "",
    supervisorID: "",
    location: "",
    startTime: "",
    endTime: "",
    details: "",
  };

  const [event, setEvent] = useState(eventObj);
  const [workers, setWorkers] = useState([]);
  const [eventRows, setEventRows] = useState([]);
  const [workerRows, setWorkerRows] = useState([]);
  const [formData, setFormData] = useState({});

  const getWorkersData = function () {
    api.eventWorker_getByEventId(eventId).then((data) => {
      if (data.status === 200) {
        setWorkerRows(data.instance);
        const rows = data.instance.map((instance) => {
          return {
            id: instance.eventId,
            emp_id: instance.emp_Id,
            name: printCell({ text: instance.empName }),
            sign_in: printCell({ text: (new Date(instance.sign_in)).toUTCString().substring(17, 22) }),
            sign_out: printCell({ text: (new Date(instance.sign_out)).toUTCString().substring(17, 22) }),
            addedBy: printCell({ text: instance.remarks }),
            action: (
              <MDButton
                color="error"
                variant="text"
                onClick={handleDelete(instance.eventId, instance.emp_Id)}
                iconOnly={true}
              >
                <Icon>delete_forever</Icon>
              </MDButton>
            )
          }
        });
        setEventRows(rows);
      }
    });
  }

  useEffect(() => {
    // get event data from backend
    api.event_get(eventId).then((data) => {
      if (data.status === 200) {
        try {
          let startTime = new Date(data.instance.startTime);
          let endTime = new Date(data.instance.endTime);
          data.instance.startTime = startTime.toUTCString();
          data.instance.endTime = endTime.toUTCString();
        } catch (err) {
          console.log(err);
          data.instance.startTime = "";
          data.instance.endTime = "";
        }
        setEvent(data.instance);
      }
    });

    getWorkersData();
  }, []);

  const handleDelete = (eventId, empId) => () => {
    if (window.confirm("Are you sure you want to delete this worker?")) {
      api.eventWorker_delete(eventId, empId).then((data) => {
        if (data.status === 200) {
          getWorkersData();
        }
      });
    }
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value == 'true' ? true : event.target.value == 'false' ? false : event.target.value
    });
  };

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
    { Header: "Name", accessor: "name", align: "left" },
    { Header: "Sign In", accessor: "sign_in", align: "center" },
    { Header: "Sign Out", accessor: "sign_out", align: "center" },
    { Header: "Remarks", accessor: "addedBy", align: "center" },
    { Header: "Action", accessor: "action", align: "center" }
  ]);


  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Grid container spacing={3}>
        <Grid item xs={12} md={8} lg={8}>
          <Card>
            <MDBox sx={{ p: 3 }}>
              <MDTypography variant="h4" gutterBottom>
                (#{event.eventID}) {event.eventName}
              </MDTypography>
              <MDTypography variant="body1" gutterBottom>
                Location: {event.location}
              </MDTypography>
              <MDTypography variant="body1" gutterBottom>
                Start Time: {event.startTime} <br />
                End Time: {event.endTime}
              </MDTypography>
              <MDTypography variant="body1" gutterBottom>
                Description: {event.details}
              </MDTypography>
            </MDBox>
          </Card>
        </Grid>

        <Grid item xs={12} md={4} lg={4}>
          <Card>
            <MDBox sx={{ p: 3 }}>
              <MDTypography variant="h4" gutterBottom>
                Actions
              </MDTypography>
              <MDButton
                // component={Link}
                // to={`/app/events/${eventId}/edit`}
                variant="gradient"
                color="warning"
                size="small"
                sx={{ ml: 1 }}
              >
                Edit Event
              </MDButton>

              <br />

              <MDButton
                component={Link}
                to={`/event-worker-form/${eventId}`}
                variant="gradient"
                color="info"
                size="small"
                sx={{ ml: 1 }}
              >
                Add Employee to Event
              </MDButton>
            </MDBox>
          </Card>
        </Grid>
      </Grid>

      <br />

      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={12}>
          <Card>
            <MDBox sx={{ p: 3 }}>
              <MDTypography variant="h4" gutterBottom>
                Event Employees
              </MDTypography>
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

    </DashboardLayout>
  );
}

export default Event;
