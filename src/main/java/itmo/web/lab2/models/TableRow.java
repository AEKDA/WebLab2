package itmo.web.lab2.models;


public final class TableRow {
    private final float x;
    private final float y;
    private final float r;
    private final boolean hit;
    private final long Date;
    private final long executionTime;

    public TableRow(float x, float y, float r, boolean hit, long Date, long executionTime) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.hit = hit;
        this.Date = Date;
        this.executionTime = executionTime;
    }

    public float getX() {
        return x;
    }

    public float getY() {
        return y;
    }

    public float getR() {
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