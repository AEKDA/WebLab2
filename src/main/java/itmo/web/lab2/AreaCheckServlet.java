package itmo.web.lab2;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@WebServlet(name = "area-check-servlet", value = "/area-check-servlet")
public class AreaCheckServlet extends HttpServlet {

    @Override
    public void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {

        PrintWriter writer = resp.getWriter();

        try {
        float x = Float.parseFloat(req.getParameter("x-value"));
        float y = Float.parseFloat(req.getParameter("y-value"));
        float r = Float.parseFloat(req.getParameter("r-value"));
        } catch(NullPointerException e) {
            
        }

    }

}
