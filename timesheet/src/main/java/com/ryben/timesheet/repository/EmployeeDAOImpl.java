package com.ryben.timesheet.repository;

import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.ryben.timesheet.model.Employee;
import com.ryben.timesheet.model.ResponseDTO;

@Repository
public class EmployeeDAOImpl implements EmployeeDAO {

	@Autowired
    private JdbcTemplate jdbcTemplate;
	
	@Autowired
	private ConnectionConfig connConf;
	
	@Override
	public ResponseDTO getAllEmployee() throws SQLException {
        ResponseDTO response = new ResponseDTO();
        LinkedList<Employee> emp = new LinkedList<Employee>();
        final String sql = "SELECT * FROM public.\"employee\"";
	 	PreparedStatement ps = connConf.getConnection().prepareStatement(sql);
		 ResultSet rs = ps.executeQuery();
		 //set the result set to the emp object
		 while(rs.next()) {
			 Employee e = new Employee();
			 e.setId(rs.getInt("id"));
			 e.setStatus(rs.getString("status"));
			 e.setDate_submitted(rs.getTimestamp("date_submitted"));
			 e.setName(rs.getString("name"));
			 e.setAddress(rs.getString("address"));
			 e.setPhone(rs.getString("phone"));
			 e.setEmail(rs.getString("email"));
			 e.setDob(rs.getDate("dob"));
			 e.setSsn(rs.getInt("ssn"));
			 e.setGender(rs.getString("gender"));
			 e.setPoi(rs.getString("poi"));
			 e.setAuthorised_to_work_usa(rs.getBoolean("authorised_to_work_usa"));
			 e.setConvicted_felony(rs.getBoolean("convicted_felony"));
			 e.setNext_of_kin(rs.getString("next_of_kin"));
			 e.setToday_date(rs.getDate("today_date"));
			 emp.add(e);
		 }
		 response.setStatus(200);
		 response.setMessage("Data found");
		 response.setInstance(emp);
		 return response;
	}

	@Override
	public ResponseDTO saveEmployee(Employee employee) throws SQLException {

		ResponseDTO response = new ResponseDTO();
		try {
		final String sql = "INSERT INTO public.\"employee\"(status, date_submitted, name, address, phone, email, dob, ssn, gender, poi, authorised_to_work_usa, convicted_felony, next_of_kin, today_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
		PreparedStatement ps = connConf.getConnection().prepareStatement(sql);
		ps.setString(1, employee.getStatus());
		ps.setTimestamp(2, new Timestamp(employee.getDate_submitted().getTime()));
		ps.setString(3, employee.getName());
		ps.setString(4, employee.getAddress());
		ps.setString(5, employee.getPhone());
		ps.setString(6, employee.getEmail());
		ps.setDate(7, new Date(employee.getDob().getTime()));
		ps.setInt(8, employee.getSsn());
		ps.setString(9, employee.getGender());
		ps.setString(10, employee.getPoi());
		ps.setBoolean(11, employee.getAuthorised_to_work_usa());
		ps.setBoolean(12, employee.getConvicted_felony());
		ps.setString(13, employee.getNext_of_kin());
		ps.setDate(14, new Date(employee.getToday_date().getTime()));
		int result = ps.executeUpdate();
		if(result > 0) {
			response.setStatus(200);
			response.setMessage("Data saved");
			return response;
		}else {
			response.setStatus(500);
			response.setMessage("Data not saved");
			return response;
		}
		} catch (Exception e) {
			response.setStatus(500);
			response.setMessage("Data not saved for exception "+e);	
			return response;

		}

	}

	@Override
	public ResponseDTO updateEmployee(Employee emp) throws SQLException {
		
		ResponseDTO response = new ResponseDTO();
		try {
		final String sql = "UPDATE public.\"employee\" SET status=?, date_submitted=?, name=?, address=?, phone=?, email=?, dob=?,  ssn=?, gender=?, poi=?, authorised_to_work_usa=?, convicted_felony=?, next_of_kin=?, today_date=? where email=?";
		PreparedStatement ps = connConf.getConnection().prepareStatement(sql);
		ps.setString(1, emp.getStatus());
		ps.setTimestamp(2, new Timestamp(emp.getDate_submitted().getTime()));
		ps.setString(3, emp.getName());
		ps.setString(4, emp.getAddress());
		ps.setString(5, emp.getPhone());
		ps.setString(6, emp.getEmail());
		ps.setDate(7, new Date(emp.getDob().getTime()));
		ps.setInt(8, emp.getSsn());
		ps.setString(9, emp.getGender());
		ps.setString(10, emp.getPoi());
		ps.setBoolean(11, emp.getAuthorised_to_work_usa());
		ps.setBoolean(12, emp.getConvicted_felony());
		ps.setString(13, emp.getNext_of_kin());
		ps.setDate(14, new Date(emp.getToday_date().getTime()));
		ps.setString(15, emp.getEmail());
		int result = ps.executeUpdate();
		if(result > 0) {
			response.setStatus(200);
			response.setMessage("Data updated");
			return response;
		}else {
			response.setStatus(500);
			response.setMessage("Data not updated");
			return response;
		}
		} catch (Exception e) {
			response.setStatus(500);
			response.setMessage("Data not updated for exception "+e);	
			return response;

		}
	}

	@Override
	public ResponseDTO deleteEmployee(String email) throws SQLException {
		ResponseDTO response = new ResponseDTO();
		try {
		final String sql = "DELETE FROM public.\"employee\" where email=?";
		PreparedStatement ps = connConf.getConnection().prepareStatement(sql);
		ps.setString(1, email);
		int result = ps.executeUpdate();
		if(result > 0) {
			response.setStatus(200);
			response.setMessage("Data deleted");
			return response;
		}else {
			response.setStatus(500);
			response.setMessage("Data not deleted");
			return response;
		}
		} catch (Exception e) {
			response.setStatus(500);
			response.setMessage("Data not deleted for exception "+e);	
			return response;

		}
	}

	//finish getEmployee method with try catch block
	//code
	@Override
	public ResponseDTO getEmployee(String email) throws SQLException {
		ResponseDTO response = new ResponseDTO();
		try {
		final String sql = "SELECT * FROM public.\"employee\" where email=?";
		PreparedStatement ps = connConf.getConnection().prepareStatement(sql);
		ps.setString(1, email);
		ResultSet rs = ps.executeQuery();
		List<Employee> emp = new ArrayList<Employee>();
		while(rs.next()) {
			Employee e = new Employee();
			e.setId(rs.getInt("id"));
			e.setStatus(rs.getString("status"));
			e.setDate_submitted(rs.getTimestamp("date_submitted"));
			e.setName(rs.getString("name"));
			e.setAddress(rs.getString("address"));
			e.setPhone(rs.getString("phone"));
			e.setEmail(rs.getString("email"));
			e.setDob(rs.getDate("dob"));
			e.setSsn(rs.getInt("ssn"));
			e.setGender(rs.getString("gender"));
			e.setPoi(rs.getString("poi"));
			e.setAuthorised_to_work_usa(rs.getBoolean("authorised_to_work_usa"));
			e.setConvicted_felony(rs.getBoolean("convicted_felony"));
			e.setNext_of_kin(rs.getString("next_of_kin"));
			e.setToday_date(rs.getDate("today_date"));
			emp.add(e);
		}
		if(emp.size() > 0) {
			response.setStatus(200);
			response.setMessage("Data found");
			response.setInstance(emp);
			return response;
		}else {
			response.setStatus(500);
			response.setMessage("Data not found");
			return response;
		}
		} catch (Exception e) {
			response.setStatus(500);
			response.setMessage("Data not found for exception "+e);	
			return response;

		}

	}


}
