package itmo.web.lab2.servlets;

import java.io.IOException;

import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class ClearServlet extends HttpServlet {

    @Override
    public void doDelete(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        req.getServletContext().removeAttribute("table");
        resp.setStatus(HttpServletResponse.SC_OK);
    }

}
