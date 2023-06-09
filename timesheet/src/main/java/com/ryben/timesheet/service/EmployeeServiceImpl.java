package com.ryben.timesheet.service;

import java.sql.SQLException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ryben.timesheet.model.Employee;
import com.ryben.timesheet.model.ResponseDTO;
import com.ryben.timesheet.repository.EmployeeDAOImpl;

@Service
public class EmployeeServiceImpl implements EmployeeService {

	@Autowired
	private EmployeeDAOImpl employeeDAOImpl;
	
	@Override
	public ResponseDTO getAllEmployees() throws SQLException {
		
		return employeeDAOImpl.getAllEmployee();
	}

	@Override
	public ResponseDTO saveEmployee(Employee emp) throws SQLException {
		return employeeDAOImpl.saveEmployee(emp);
	}

	@Override
	public ResponseDTO updateEmployee(Employee emp) throws SQLException {
		return employeeDAOImpl.updateEmployee(emp);
	}

	@Override
	public ResponseDTO getEmployee(Employee emp) throws SQLException {
		return employeeDAOImpl.getEmployee(emp.getEmail());
	}

	@Override
	public ResponseDTO deleteEmployee(String email) throws SQLException {
		return employeeDAOImpl.deleteEmployee(email);
	}

}
