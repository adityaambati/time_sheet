package com.ryben.timesheet.repository;

import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.LinkedList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.ryben.timesheet.model.Events;
import com.ryben.timesheet.model.ResponseDTO;

@Repository
public class EventsDAO {
	
	@Autowired
    private JdbcTemplate jdbcTemplate;
	
	@Autowired
	private ConnectionConfig connConf;
	
    public ResponseDTO saveEvent(Events event) {
        ResponseDTO response = new ResponseDTO();
        try {
        final String sql = "INSERT INTO public.\"events\" (event_name,supervisor_id,location,start_time,end_time,details) VALUES (?,?,?,?,?,?)";
        PreparedStatement ps = connConf.getConnection().prepareStatement(sql);
        ps.setString(1, event.getEventName());
        //check null for supervisor id ,location, details and set to null if null
        if(event.getSupervisorID() == null) {
        	ps.setNull(2, java.sql.Types.INTEGER);
        }else {
            	ps.setInt(2, event.getSupervisorID());
            }
        if(event.getLocation() == null) {
            	ps.setNull(3, java.sql.Types.VARCHAR);
            }else {
                	ps.setString(3, event.getLocation());
                }
        ps.setTimestamp(4, new Timestamp(event.getStartTime().getTime()));  
        ps.setTimestamp(5, new Timestamp(event.getEndTime().getTime()));
        if(event.getDetails() == null) {
            	ps.setNull(6, java.sql.Types.VARCHAR);
            }else {
                	ps.setString(6, event.getDetails());
                }
        int result = ps.executeUpdate();
        if(result == 1) {
            response.setStatus(200);
            response.setMessage("Event saved successfully");
            return response;
        } else {
            response.setStatus(500);
            response.setMessage("Event not saved");
            return response;
        }
        } catch (SQLException e) {
            response.setStatus(500);
            response.setMessage("Event not saved with exception"+e.getMessage());
        	return response;
        } 
    }

	public ResponseDTO getAllEvents() throws SQLException {

        ResponseDTO response = new ResponseDTO();
        try {
        LinkedList<Events> events = new LinkedList<Events>();
        final String sql = "SELECT * FROM public.\"events\"";
        PreparedStatement ps = connConf.getConnection().prepareStatement(sql);
        ResultSet rs = ps.executeQuery();
        while(rs.next()) {
        	Events event = new Events();
        	event.setEventID(rs.getInt("event_id"));
        	event.setEventName(rs.getString("event_name"));
        	event.setSupervisorID(rs.getInt("supervisor_id"));
        	event.setLocation(rs.getString("location"));
        	event.setStartTime(rs.getTimestamp("start_time"));
        	event.setEndTime(rs.getTimestamp("end_time"));
        	event.setDetails(rs.getString("details"));
        	events.add(event);
        }
        response.setStatus(200);
        response.setMessage("Events fetched successfully");
        response.setInstance(events);
        } catch (SQLException e) {
        	response.setStatus(500);
            response.setMessage("Events not fetched");
            response.setInstance(null);
        }
        return response;
    }

    public ResponseDTO deleteEvent(Integer eventId) {
        ResponseDTO response = new ResponseDTO();
        try {
        final String sql = "DELETE FROM public.\"events\" WHERE event_id = ?";
        PreparedStatement ps = connConf.getConnection().prepareStatement(sql);
        ps.setInt(1, eventId);
        int result = ps.executeUpdate();
        if(result == 1) {
            response.setStatus(200);
            response.setMessage("Event deleted successfully");
            return response;
        } else {
            response.setStatus(500);
            response.setMessage("Event not deleted");
            return response;
        }
        } catch (SQLException e) {
            response.setStatus(500);
            response.setMessage("Event not deleted with exception"+e.getMessage());
        	return response;
        } 
    }
	
    public ResponseDTO getEventById(Integer id) throws SQLException {
        ResponseDTO response = new ResponseDTO();
        try {
        final String sql = "SELECT * FROM public.\"events\" WHERE event_id = ?";
        PreparedStatement ps = connConf.getConnection().prepareStatement(sql);
        ps.setInt(1, id);
        ResultSet rs = ps.executeQuery();
        Events event = new Events();
        while(rs.next()) {
        	event.setEventID(rs.getInt("event_id"));
        	event.setEventName(rs.getString("event_name"));
        	event.setSupervisorID(rs.getInt("supervisor_id"));
        	event.setLocation(rs.getString("location"));
        	event.setStartTime(rs.getTimestamp("start_time"));
        	event.setEndTime(rs.getTimestamp("end_time"));
        	event.setDetails(rs.getString("details"));
        }
        response.setStatus(200);
        response.setMessage("Event fetched successfully");
        response.setInstance(event);
        } catch (SQLException e) {
        	response.setStatus(500);
            response.setMessage("Event not fetched");
            response.setInstance(null);
        }
        return response;
    }

    public ResponseDTO updateEvent(Events event) {
        ResponseDTO response = new ResponseDTO();
        try {
        final String sql = "UPDATE public.\"events\" SET event_name = ?, supervisor_id = ?, location = ?, start_time = ?, end_time = ?, details = ? WHERE event_id = ?";
        PreparedStatement ps = connConf.getConnection().prepareStatement(sql);
        ps.setString(1, event.getEventName());
        //check null for supervisor id ,location, details and set to null if null
        if(event.getSupervisorID() == null) {
        	ps.setNull(2, java.sql.Types.INTEGER);
        }else {
            	ps.setInt(2, event.getSupervisorID());
            }
        if(event.getLocation() == null) {
            	ps.setNull(3, java.sql.Types.VARCHAR);
            }else {
                	ps.setString(3, event.getLocation());
                }
        ps.setTimestamp(4, new Timestamp(event.getStartTime().getTime()));  
        ps.setTimestamp(5, new Timestamp(event.getEndTime().getTime()));
        if(event.getDetails() == null) {
            	ps.setNull(6, java.sql.Types.VARCHAR);
            }else {
                	ps.setString(6, event.getDetails());
                }
        ps.setInt(7, event.getEventID());
        int result = ps.executeUpdate();
        if(result == 1) {
            response.setStatus(200);
            response.setMessage("Event updated successfully");
            return response;
        } else {
            response.setStatus(500);
            response.setMessage("Event not updated");
            return response;
        }
        } catch (SQLException e) {
            response.setStatus(500);
            response.setMessage("Event not updated with exception"+e.getMessage());
        	return response;
        } 
    }

}
