package com.ryben.timesheet.service;

import java.sql.SQLException;

import com.ryben.timesheet.model.Events;
import com.ryben.timesheet.model.ResponseDTO;

public interface EventsService {
	
	public ResponseDTO saveEvent(Events eve);
	
	public ResponseDTO getAllEvents() throws SQLException;
	
	public ResponseDTO updateEvent(Events eve);
	
	public ResponseDTO getEvent(Integer eventID);

	public ResponseDTO deleteEvent(Integer eve);

	public ResponseDTO getEventById(Integer id) throws SQLException;

}
