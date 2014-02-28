package com.noveo.trainings.jsonserver;

import org.json.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Random;

public class MainServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doGet(request, response);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
			response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); 
			response.setHeader("Pragma", "no-cache");  
			response.setDateHeader("Expires", 0);
			
            JSONObject json = new JSONObject();
            json.put("text", "Hello world! " + System.currentTimeMillis());
			response.getOutputStream().write(json.toString(2).getBytes());
        } catch (Exception e) {
            throw new ServletException(e);
        }
    }
}
