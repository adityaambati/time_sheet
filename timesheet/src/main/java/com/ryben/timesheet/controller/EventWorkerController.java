package com.ryben.timesheet.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ryben.timesheet.model.EventWorker;
import com.ryben.timesheet.model.ResponseDTO;
import com.ryben.timesheet.service.EventWorkerServiceImpl;

@CrossOrigin( origins = "*" )
@RestController
@RequestMapping("/eventworker")
public class EventWorkerController {
	
	@Autowired
	private EventWorkerServiceImpl eveWorker;

	// save event worker
	@PostMapping("/saveEventWorker")
	public ResponseDTO saveEventWorker(@RequestBody EventWorker ew) {
		return eveWorker.saveEventWorker(ew);
	}
	
	//get all event worker by event id
	@GetMapping("/getEventWorkerByEventId/{eventId}")
	public ResponseDTO getEventWorkerByEventId(@PathVariable  Integer eventId) {
		return eveWorker.getEventWorkerByEventId(eventId);
	}

	// delete event worker by event id and emp id
	// pass the event id and emp id in the @PathVariable
	@DeleteMapping("/deleteEventWorkerByEventIdAndEmpId/{eventId}/{empId}")
	public ResponseDTO deleteEventWorkerByEventIdAndEmpId(@PathVariable Integer eventId, @PathVariable Integer empId) {
		return eveWorker.deleteEventWorkerByEventIdAndEmpId(eventId, empId);
	}

}
