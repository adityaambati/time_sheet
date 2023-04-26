package com.ryben.timesheet.service;

import java.sql.SQLException;

import com.ryben.timesheet.model.Employee;
import com.ryben.timesheet.model.ResponseDTO;

public interface EmployeeService {

	public ResponseDTO getAllEmployees() throws SQLException;
	public ResponseDTO saveEmployee(Employee emp) throws SQLException;
	ResponseDTO updateEmployee(Employee emp) throws SQLException;
	ResponseDTO getEmployee(Employee emp) throws SQLException;
	ResponseDTO deleteEmployee(String email) throws SQLException;

}
