package com.ryben.timesheet.controller;

import java.sql.SQLException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.ryben.timesheet.model.Events;
import com.ryben.timesheet.model.ResponseDTO;
import com.ryben.timesheet.service.EventsServiceImpl;

@CrossOrigin( origins = "*" )
@RestController
@RequestMapping("/events")
public class EventController {

    @Autowired
    private EventsServiceImpl eveSerImpl;

    // Save the event to the events table
    @PostMapping("/save")
    public ResponseDTO saveEvent(@RequestBody Events event) {

        return eveSerImpl.saveEvent(event);
    	
    }

    // Delete the event from the events table using id
    @DeleteMapping("/delete/{id}")
    public ResponseDTO deleteEvent(@PathVariable Integer id) {

        return eveSerImpl.deleteEvent(id);
    	
    }

    // get all the events from the events table
    @GetMapping("/getAllEvents") 
    public @ResponseBody ResponseDTO getAllEvents() throws SQLException {
        return eveSerImpl.getAllEvents();
    }

    // get an event using id
    @GetMapping("/getEventById/{id}")
    public @ResponseBody ResponseDTO getEventById(@PathVariable Integer id) throws SQLException {
        return eveSerImpl.getEventById(id);
    }

    // update an event using id
    @PostMapping("/updateEvent")
    public ResponseDTO updateEvent(@RequestBody Events event) {
        return eveSerImpl.updateEvent(event);
    }
    
    
}
