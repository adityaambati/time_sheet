package com.ryben.timesheet.service;

import com.ryben.timesheet.model.EventWorker;
import com.ryben.timesheet.model.ResponseDTO;

public interface EventWorkerService {
	
	ResponseDTO saveEventWorker(EventWorker ew);
	ResponseDTO getEventWorkerByEventId(Integer eventId);
	ResponseDTO deleteEventWorkerByEventIdAndEmpId(Integer eventId, Integer empId);

}
