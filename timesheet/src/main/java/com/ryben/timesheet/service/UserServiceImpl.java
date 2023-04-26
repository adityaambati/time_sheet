package com.ryben.timesheet.service;

import java.sql.SQLException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ryben.timesheet.model.ResponseDTO;
import com.ryben.timesheet.model.User;
import com.ryben.timesheet.repository.UserDAOImpl;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserDAOImpl userdaoimpl;

	@Override
	public ResponseDTO getAllUser() throws SQLException {
		return userdaoimpl.getAllUser();
	}

	@Override
	public ResponseDTO authUser(String email, String password) throws SQLException {
		return userdaoimpl.authUser(email, password);
	}

	@Override
	public ResponseDTO saveUser(User user) {
		return userdaoimpl.saveUser(user);
	}

    public ResponseDTO deleteUser(String email) {
		return userdaoimpl.deleteUser(email);
    }

}
