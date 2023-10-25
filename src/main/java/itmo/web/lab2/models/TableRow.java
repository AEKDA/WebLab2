package itmo.web.lab2.models;


public final class TableRow {
    private final double x;
    private final double y;
    private final double r;
    private final boolean hit;
    private final long Date;
    private final long executionTime;

    public TableRow(double x, double y, double r, boolean hit, long Date, long executionTime) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.hit = hit;
        this.Date = Date;
        this.executionTime = executionTime;
    }

    public double getX() {
        return x;
    }

    public double getY() {
        return y;
    }

    public double getR() {
        return r;
    }

    public boolean isHit() {
        return hit;
    }

    public long getDate() {
        return Date;
    }

    public long getExecutionTime() {
        return executionTime;
    }
}