package com.ryben.timesheet.repository;

import java.sql.SQLException;

import com.ryben.timesheet.model.Employee;
import com.ryben.timesheet.model.ResponseDTO;

// This is the DAO interface for the Employee controller class and implements the methods in the EmployeeDaoImpl class
public interface EmployeeDAO {

	ResponseDTO getAllEmployee() throws SQLException;
	ResponseDTO saveEmployee(Employee employee) throws SQLException;
	ResponseDTO updateEmployee(Employee emp) throws SQLException;
	ResponseDTO getEmployee(String emp) throws SQLException;
	ResponseDTO deleteEmployee(String email) throws SQLException;

}
