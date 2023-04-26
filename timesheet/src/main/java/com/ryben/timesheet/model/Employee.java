package com.ryben.timesheet.model;

import java.sql.Date;
import java.sql.Timestamp;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

// This is the model class for the employee table
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Employee {
	
	private Integer Id;
	private String status;
	private Timestamp date_submitted;
	private String name;
	private String address;
	private String phone;
	private String email;
	private Date dob;
	private Integer ssn;
	private String gender;
	private String poi;
	private Boolean authorised_to_work_usa;
	private Boolean convicted_felony;
	private String next_of_kin;
	private Date today_date;
	
	
	public Integer getId() {
		return Id;
	}
	public void setId(Integer id) {
		Id = id;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public Timestamp getDate_submitted() {
		return date_submitted;
	}
	public void setDate_submitted(Timestamp date_submitted) {
		this.date_submitted = date_submitted;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public Date getDob() {
		return dob;
	}
	public void setDob(Date dob) {
		this.dob = dob;
	}
	public Integer getSsn() {
		return ssn;
	}
	public void setSsn(Integer ssn) {
		this.ssn = ssn;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public String getPoi() {
		return poi;
	}
	public void setPoi(String poi) {
		this.poi = poi;
	}
	public Boolean getAuthorised_to_work_usa() {
		return authorised_to_work_usa;
	}
	public void setAuthorised_to_work_usa(Boolean authorised_to_work_usa) {
		this.authorised_to_work_usa = authorised_to_work_usa;
	}
	public Boolean getConvicted_felony() {
		return convicted_felony;
	}
	public void setConvicted_felony(Boolean convicted_felony) {
		this.convicted_felony = convicted_felony;
	}
	public String getNext_of_kin() {
		return next_of_kin;
	}
	public void setNext_of_kin(String next_of_kin) {
		this.next_of_kin = next_of_kin;
	}
	public Date getToday_date() {
		return today_date;
	}
	public void setToday_date(Date today_date) {
		this.today_date = today_date;
	}

}
