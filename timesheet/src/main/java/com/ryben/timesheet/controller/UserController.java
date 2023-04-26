package com.ryben.timesheet.controller;

import java.sql.SQLException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.*;

import com.ryben.timesheet.model.ResponseDTO;
import com.ryben.timesheet.model.User;
import com.ryben.timesheet.service.UserServiceImpl;

@CrossOrigin( origins = "*" )
@RestController
@RequestMapping("/user")
public class UserController {
	
	@Autowired
	private UserServiceImpl userSerImpl;

	// Test the connection
	@GetMapping("/hello")
	public String Hello() {
		return "hello";
	}

	// Get all the users from the user table
	@GetMapping("/getAllUser")
	public ResponseDTO getAllUser() throws SQLException {
		return userSerImpl.getAllUser();
	}

	// Save the user to the user table
	@PostMapping("/saveUser")
	public ResponseDTO saveUser(@RequestBody User user) {
		return userSerImpl.saveUser(user);
	}

	// Authenticate the user using email and password
	@GetMapping("/getUser/{email}/{password}")
	public ResponseDTO getUser(@PathVariable String email, @PathVariable String password) throws SQLException {
		return userSerImpl.authUser(email, password);
	}

	// delete the user from the user table using email
	@DeleteMapping("/deleteUser/{email}")
	public ResponseDTO deleteUser(@PathVariable String email) throws SQLException {
		return userSerImpl.deleteUser(email);
	}
	
}
