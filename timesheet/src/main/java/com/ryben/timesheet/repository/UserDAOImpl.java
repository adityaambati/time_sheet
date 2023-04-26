package com.ryben.timesheet.repository;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Connection;
import java.sql.Date;
import java.sql.Timestamp;
import java.util.LinkedList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.ryben.timesheet.model.ResponseDTO;
import com.ryben.timesheet.model.User;

@Repository
public class UserDAOImpl implements UserDAO {

	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@Autowired
	private ConnectionConfig connConf;

	@Override
	public ResponseDTO getAllUser() throws SQLException {
		ResponseDTO response = new ResponseDTO();
		LinkedList<User> emp = new LinkedList<User>();
		try {
		final String sql = "SELECT * FROM public.\"User\"";
		Connection con = connConf.getConnection();
		PreparedStatement ps = con.prepareStatement(sql);
		ResultSet rs = ps.executeQuery();
		while (rs.next()) {
			User e = new User();
			e.setId(rs.getInt("id"));
			e.setEmail(rs.getString("email"));
			e.setPassword(rs.getString("password"));
			e.setRole(rs.getString("role"));
			emp.add(e);
		}
		response.setStatus(200);
		response.setMessage("Data found");
		response.setInstance(emp);
		} catch (Exception e) {
			response.setStatus(500);
			response.setMessage("Exception"+e.getMessage());
		}
		return response;
	}

	@Override
	public ResponseDTO authUser(String email, String password) throws SQLException {
		ResponseDTO response = new ResponseDTO();
		final String sql = "SELECT role FROM public.\"User\" where email = ? and password= ?";
		PreparedStatement ps = connConf.getConnection().prepareStatement(sql);
		ps.setString(1, email);
		ps.setString(2, password);
		ResultSet rs = ps.executeQuery();
		try {
			if (rs.next()) {
				User u1 = new User();
				u1.setRole(rs.getString("role"));
				u1.setEmail(email);
				u1.setPassword(password);
				response.setStatus(200);
				response.setMessage("User Found");
				response.setInstance(u1);
				return response;
			} else {
				response.setStatus(400);
				response.setMessage("User Not Found");
				return response;
			}
		} catch (SQLException e) {
			response.setStatus(500);
			response.setMessage("Internal Server Error");
			return response;
		}
	}

	@Override
	public ResponseDTO saveUser(User user) {
		ResponseDTO response = new ResponseDTO();
		try {

			final String sql = "INSERT INTO public.\"User\" (email, password, role) VALUES (?, ?, ?)";
			PreparedStatement ps = connConf.getConnection().prepareStatement(sql);
			ps.setString(1, user.getEmail());
			ps.setString(2, user.getPassword());
			ps.setString(3, user.getRole());
			int rs = ps.executeUpdate();
			if (rs > 0) {
				response.setStatus(200);
				response.setMessage("User Saved");
				return response;
			} else {
				response.setStatus(400);
				response.setMessage("User Not Saved");
				return response;
			}
		} catch (Exception e) {
			response.setStatus(400);
			response.setMessage("User Not Saved exception occured" + e.getMessage());
			return response;
		}
	}

    public ResponseDTO deleteUser(String email) {
		ResponseDTO response = new ResponseDTO();
		try {
			final String sql = "DELETE FROM public.\"User\" WHERE email = ?";
			PreparedStatement ps = connConf.getConnection().prepareStatement(sql);
			ps.setString(1, email);
			int rs = ps.executeUpdate();
			if (rs > 0) {
				response.setStatus(200);
				response.setMessage("User Deleted");
				return response;
			} else {
				response.setStatus(400);
				response.setMessage("User Not Deleted");
				return response;
			}
		} catch (Exception e) {
			response.setStatus(400);
			response.setMessage("User Not Deleted exception occured" + e.getMessage());
			return response;
		}
	}
	
}
