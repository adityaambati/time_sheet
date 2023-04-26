package com.ryben.timesheet.service;

import java.sql.SQLException;

import com.ryben.timesheet.model.ResponseDTO;
import com.ryben.timesheet.model.User;

public interface UserService {
	
	ResponseDTO getAllUser() throws SQLException;
	ResponseDTO authUser(String email,String password) throws SQLException;
	ResponseDTO saveUser(User user);
	ResponseDTO deleteUser(String email);
}
