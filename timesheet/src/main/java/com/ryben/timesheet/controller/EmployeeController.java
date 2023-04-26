package com.ryben.timesheet.controller;

import java.sql.SQLException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;

import com.ryben.timesheet.model.Employee;
import com.ryben.timesheet.model.ResponseDTO;
import com.ryben.timesheet.service.EmployeeServiceImpl;

@CrossOrigin( origins = "*" )
@RestController
@RequestMapping("/employee")
public class EmployeeController {
	
	@Autowired
	private EmployeeServiceImpl empSerImpl;
	
	// Gets all the employees from the employees table
	@GetMapping("/getAllEmp")
	public ResponseDTO getAllEmployee() throws SQLException {
		return empSerImpl.getAllEmployees();
	}
	
	//save the employee to the employees table
	@PostMapping("/saveEmp")
	public ResponseDTO saveEmp(@RequestBody Employee emp) throws SQLException {
		return empSerImpl.saveEmployee(emp);
	}
	
	//update employee using email
	@PostMapping("/updateEmp")
	public ResponseDTO updateEmp(@RequestBody Employee emp) throws SQLException {
		return empSerImpl.updateEmployee(emp);
	}

	//get an employee using email or id
	@PostMapping("/getEmp")
	public ResponseDTO getEmp(@RequestBody Employee emp) throws SQLException {
		return empSerImpl.getEmployee(emp);
	}

	//delete an employee using email
	@DeleteMapping("/deleteEmp")
	public ResponseDTO deleteEmp(@RequestBody Employee emp) throws SQLException {
		return empSerImpl.deleteEmployee(emp.getEmail());
	}

}
