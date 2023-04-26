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

import { useEffect, useState } from "react";
// @mui material components
// import Card from "@mui/material/Card";
// import Icon from "@mui/material/Icon";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";

// Material Dashboard 2 React components
// import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";

// Material Dashboard 2 React examples
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listGridPlugin from '@fullcalendar/list';

// Data
// import data from "layouts/events/components/Projects/data";

import { useNavigate } from "react-router-dom";

import Styled from "@emotion/styled";
import {
  useMaterialUIController
} from './../../../../context';
import api from "./../../../../fetch-api";
import MDTypography from "components/MDTypography";

const MyCalendar = Styled(Calendar)`
.fc .fc-toolbar-title {
  font-size: 1.5rem;
  font-weight: 500;
  line-height: 1.334;
  color: #3c4858;
  margin: 0;
  padding: 0;
  display: inline-block;
  min-height: 1em;
  white-space: nowrap;
}`

function Calendar() {
  let navigate = useNavigate();
  const [controller, dispatch] = useMaterialUIController();

  const eventClick = (info) => {
    let path = `/event/${info.event._def.extendedProps.eventId}`;
    navigate(path);
  }

  const [eventRows, setEventRows] = useState([]);

  useEffect(() => {
    api.event_getAll().then((res) => {
      if (res.status === 200) {
        const data = res.instance;
        setEventRows(data.map((event) => {
          return {
            title: event.eventName,
            date: event.startTime.substring(0, 10),
            eventId: event.eventID,
            location: event.location,
          }
        }));
      }
    });
  }, []);

  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView={controller.dashboardCalendar}
      events={eventRows}
      height="700px"
      eventClick={eventClick}
      headerToolbar={{
        left: 'title',
        center: '',
        right: 'dayGridMonth,dayGridWeek,dayGridDay prev,next today'
      }}
    />
  );
}

export default Calendar;
