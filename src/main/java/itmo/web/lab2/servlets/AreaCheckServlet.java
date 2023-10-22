package itmo.web.lab2.servlets;

import java.io.BufferedReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.json.JSONException;
import org.json.JSONObject;

import itmo.web.lab2.models.TableRow;

public class AreaCheckServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {

        BufferedReader bufferedReader = request.getReader();
        StringBuilder stringBuilder = new StringBuilder();
        String line;
        while ((line = bufferedReader.readLine()) != null) {
            stringBuilder.append(line);
        }
        bufferedReader.close();
        String jsonString = stringBuilder.toString();

        JSONObject jsonObject = new JSONObject(jsonString);
        Float x;
        Float y;
        Float r;

        try {
            x = jsonObject.getFloat("x");
            y = jsonObject.getFloat("y");
            r = jsonObject.getFloat("r");
        } catch (JSONException e) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().println("Bad request");
            return;
        }

        // try {
        //     Thread.sleep(1000);
        // } catch (Exception e) {

        // }

        long currentDateTime = System.currentTimeMillis() / 1000L;

        if (x != null && y != null && r != null) {

            TableRow newRow = formNewTableRow(x, y, r, currentDateTime);

            List<TableRow> tableRows = contextObjectToArrayList(getServletContext().getAttribute("table"));
            tableRows.add(newRow);
            getServletContext().setAttribute("table", tableRows);

            response.setStatus(HttpServletResponse.SC_OK);
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.getWriter().println(new JSONObject(newRow));
        } else {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().println("Bad request");
        }
    }

    @SuppressWarnings("unchecked")
    private List<TableRow> contextObjectToArrayList(Object table) {
        if (table instanceof Collection) {
            return (List<TableRow>) table;
        } else {
            return new ArrayList<>();
        }
    }

    public TableRow formNewTableRow(float x, float y, float r, long clientDate) {
        long currentTime = System.nanoTime();
        if (x > 3 && x < 3 && y > -5 && y < 5 && r > 2 && r < 5) {
        }
        boolean isHit = isHitCircle(x, y, r) || isHitRectangle(x, y, r) || isHitTriangle(x, y, r);
        long scriptWorkingTime = System.nanoTime() - currentTime;

        return new TableRow(x, y, r, isHit, clientDate, scriptWorkingTime);
    }

    private boolean isHitCircle(float x, float y, float r) {
        return x >= 0 && y >= 0 && (Math.pow(x, 2) + Math.pow(y, 2) <= Math.pow(r / 2, 2));
    }

    private boolean isHitRectangle(float x, float y, float r) {
        return x >= 0 && x <= r && y <= 0 && y >= -r;
    }

    private boolean isHitTriangle(float x, float y, float r) {
        return x <= 0 && y <= 0 && -(r / 2) - y - x <= 0;
    }

}