package com.ryben.timesheet.model;

import java.sql.Date;
import java.sql.Timestamp;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

// This is the model class for the Events table
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Events {
	private Integer eventID;
	private String eventName;
	private Integer supervisorID;
	private String location;
	private Timestamp startTime;
	private Timestamp endTime;
	private String Details;
	public Integer getEventID() {
		return eventID;
	}
	public void setEventID(Integer eventID) {
		this.eventID = eventID;
	}
	public String getEventName() {
		return eventName;
	}
	public void setEventName(String eventName) {
		this.eventName = eventName;
	}
	public Integer getSupervisorID() {
		return supervisorID;
	}
	public void setSupervisorID(Integer supervisorID) {
		this.supervisorID = supervisorID;
	}
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}
	public Timestamp getStartTime() {
		return startTime;
	}
	public void setStartTime(Timestamp startTime) {
		this.startTime = startTime;
	}
	public Timestamp getEndTime() {
		return endTime;
	}
	public void setEndTime(Timestamp endTime) {
		this.endTime = endTime;
	}
	public String getDetails() {
		return Details;
	}
	public void setDetails(String details) {
		Details = details;
	}
	
	
	
}
