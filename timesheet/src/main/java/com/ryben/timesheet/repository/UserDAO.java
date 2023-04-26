package com.ryben.timesheet.repository;

import java.sql.SQLException;

import com.ryben.timesheet.model.ResponseDTO;
import com.ryben.timesheet.model.User;

public interface UserDAO {

	ResponseDTO getAllUser() throws SQLException;
	ResponseDTO authUser(String email, String password) throws SQLException ;
	ResponseDTO saveUser(User user);
	ResponseDTO deleteUser(String email);
	
}
