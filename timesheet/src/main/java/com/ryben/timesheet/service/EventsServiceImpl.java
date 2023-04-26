package com.ryben.timesheet.service;

import java.sql.SQLException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ryben.timesheet.model.Events;
import com.ryben.timesheet.model.ResponseDTO;
import com.ryben.timesheet.repository.EventsDAO;

@Service
public class EventsServiceImpl implements EventsService {

	@Autowired
	private EventsDAO eventsDAO;
	
	@Override
	public ResponseDTO saveEvent(Events eve) {
		return eventsDAO.saveEvent(eve);
	}

	@Override
	public ResponseDTO getAllEvents() throws SQLException {
		return eventsDAO.getAllEvents();
	}

	@Override
	public ResponseDTO updateEvent(Events eve) {
		return eventsDAO.updateEvent(eve);
	}

	@Override
	public ResponseDTO getEvent(Integer eventID) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ResponseDTO deleteEvent(Integer id) {
		return eventsDAO.deleteEvent(id);
	}

	@Override
	public ResponseDTO getEventById(Integer id) throws SQLException {
		return eventsDAO.getEventById(id);
	}
}
