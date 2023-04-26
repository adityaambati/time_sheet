package com.ryben.timesheet.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ryben.timesheet.model.EventWorker;
import com.ryben.timesheet.model.ResponseDTO;
import com.ryben.timesheet.repository.EventWorkerDAO;

@Service
public class EventWorkerServiceImpl implements EventWorkerService {

	@Autowired
	private EventWorkerDAO eventWorkerDAO;
	@Override
	public ResponseDTO saveEventWorker(EventWorker ew) {
		return eventWorkerDAO.saveEventWorker(ew);
	}

	@Override
	public ResponseDTO getEventWorkerByEventId(Integer eventId) {
		return eventWorkerDAO.getEventWorkerByEventId(eventId);
	}

	@Override
	public ResponseDTO deleteEventWorkerByEventIdAndEmpId(Integer eventId, Integer empId) {
		return eventWorkerDAO.deleteEventWorker(eventId, empId);
	}
	

}
