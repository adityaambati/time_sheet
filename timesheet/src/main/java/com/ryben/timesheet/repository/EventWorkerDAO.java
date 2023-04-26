package com.ryben.timesheet.repository;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.ryben.timesheet.model.EventWorker;
import com.ryben.timesheet.model.ResponseDTO;

@Repository
public class EventWorkerDAO {

	
	@Autowired
    private JdbcTemplate jdbcTemplate;
	
	@Autowired
	private ConnectionConfig connConf;
	
	//check the event id and emp id if exist update the event worker table else insert the record
	// event_worker table fields are event_id, emp_id, sign_in, sign_out, remarks 
	public ResponseDTO saveEventWorker(EventWorker ew) {
		ResponseDTO response = new ResponseDTO();
		try {
			String sql = "select count(*) from public.\"event_workers\" where event_id = ? and emp_id = ?";
			int count = jdbcTemplate.queryForObject(sql, new Object[] {ew.getEventId(), ew.getEmp_Id()}, Integer.class);
			if(count > 0) {
				String updateSql = "update public.\"event_workers\" set sign_in = ?, sign_out = ?, remarks = ? where event_id = ? and emp_id = ?";
				PreparedStatement ps = connConf.getConnection().prepareStatement(updateSql);
				ps.setTimestamp(1, ew.getSign_in());
				ps.setTimestamp(2, ew.getSign_out());
				ps.setString(3, ew.getRemarks());
				ps.setInt(4, ew.getEventId());
				ps.setInt(5, ew.getEmp_Id());
				ps.executeUpdate();
				response.setStatus(200);
				response.setMessage("Event Worker updated successfully");
			}else {
				String insertSql = "insert into public.\"event_workers\" (event_id, emp_id, sign_in, sign_out, remarks) values(?,?,?,?,?)";
				PreparedStatement ps = connConf.getConnection().prepareStatement(insertSql);
				ps.setInt(1, ew.getEventId());
				ps.setInt(2, ew.getEmp_Id());
				ps.setTimestamp(3, ew.getSign_in());
				ps.setTimestamp(4, ew.getSign_out());
				ps.setString(5, ew.getRemarks());
				ps.executeUpdate();
				response.setStatus(200);
				response.setMessage("Event Worker saved successfully");
			}
		}catch(Exception e) {
			response.setStatus(500);
			response.setMessage("Error occured while saving event worker");
		}
		return response;
	}
	
	//get the event worker by event id
	public ResponseDTO getEventWorkerByEventId(Integer eventId) {
		ResponseDTO response = new ResponseDTO();
		try {
			// join employee table and event_worker table to get the employee name
			String sql = "select ew.event_id, ew.emp_id, ew.sign_in, ew.sign_out, ew.remarks, e.name from public.\"event_workers\" ew inner join public.\"employee\" e on ew.emp_id = e.id where ew.event_id = ?";
			PreparedStatement ps = connConf.getConnection().prepareStatement(sql);
			ps.setInt(1, eventId);
			ResultSet rs = ps.executeQuery();
			List<EventWorker> eventWorkerList = new ArrayList<EventWorker>();
			while(rs.next()) {
				EventWorker ew = new EventWorker();
				ew.setEventId(rs.getInt("event_id"));
				ew.setEmp_Id(rs.getInt("emp_id"));
				ew.setSign_in(rs.getTimestamp("sign_in"));
				ew.setSign_out(rs.getTimestamp("sign_out"));
				ew.setRemarks(rs.getString("remarks"));
				ew.setEmpName(rs.getString("name"));
				eventWorkerList.add(ew);
			}
			response.setStatus(200);
			response.setMessage("Event Worker fetched successfully");
			response.setInstance(eventWorkerList);
		}catch(Exception e) {
			response.setStatus(500);
			response.setMessage("Error occured while fetching event worker");
		}
		return response;
	}

	public ResponseDTO deleteEventWorker(Integer eventId, Integer empId) {
		ResponseDTO response = new ResponseDTO();
		try {
			String sql = "delete from public.\"event_workers\" where event_id = ? and emp_id = ?";
			PreparedStatement ps = connConf.getConnection().prepareStatement(sql);
			ps.setInt(1, eventId);
			ps.setInt(2, empId);
			ps.executeUpdate();
			response.setStatus(200);
			response.setMessage("Event Worker deleted successfully");
		}catch(Exception e) {
			response.setStatus(500);
			response.setMessage("Error occured while deleting event worker");
		}
		return response;
	}

}
