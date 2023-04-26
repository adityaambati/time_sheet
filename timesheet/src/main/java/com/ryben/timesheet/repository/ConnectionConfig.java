package com.ryben.timesheet.repository;


import java.sql.SQLException;
import java.sql.Connection;
import java.sql.DriverManager;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;


@Repository
public class ConnectionConfig {
	@Value("${spring.datasource.url}")
	private String postgresURL;
	@Value("${spring.datasource.username}")
    private String username;
    @Value("${spring.datasource.password}")
	private String password;
	
	private static Connection conn = null;

	public Connection getConnection() throws SQLException {
       
		if(conn == null) {
			conn = DriverManager.getConnection(postgresURL+"?socketTimeout=4",username,password);
		}

		return conn;
	}

}
