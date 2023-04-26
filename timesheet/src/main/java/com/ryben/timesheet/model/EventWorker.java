package com.ryben.timesheet.model;

import java.sql.Timestamp;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
// This is the model class for the event_workers table
@Data
public class EventWorker {

	private Integer eventId;
	private Integer emp_Id;
	private Timestamp sign_in;
	private Timestamp sign_out;
	private String remarks;
	private String empName;
	
	
	
	public EventWorker() {
		super();
		// TODO Auto-generated constructor stub
	}
	public EventWorker(Integer eventId, Integer emp_Id, Timestamp sign_in, Timestamp sign_out, String remarks) {
		super();
		this.eventId = eventId;
		this.emp_Id = emp_Id;
		this.sign_in = sign_in;
		this.sign_out = sign_out;
		this.remarks = remarks;
	}
	
	public String getEmpName() {
		return empName;
	}
	public void setEmpName(String empName) {
		this.empName = empName;
	}
	public Integer getEventId() {
		return eventId;
	}
	public void setEventId(Integer eventId) {
		this.eventId = eventId;
	}
	public Integer getEmp_Id() {
		return emp_Id;
	}
	public void setEmp_Id(Integer emp_Id) {
		this.emp_Id = emp_Id;
	}
	public Timestamp getSign_in() {
		return sign_in;
	}
	public void setSign_in(Timestamp sign_in) {
		this.sign_in = sign_in;
	}
	public Timestamp getSign_out() {
		return sign_out;
	}
	public void setSign_out(Timestamp sign_out) {
		this.sign_out = sign_out;
	}
	public String getRemarks() {
		return remarks;
	}
	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}
	
}
