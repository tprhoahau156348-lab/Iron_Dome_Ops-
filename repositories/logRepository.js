import pool from "../db/database.js";

class LogRepository {
    async createLog(action, incidentId, operatorId, description) {
        const [result] = await pool.query(
            "INSERT INTO logs (action, incident_id, operator_id, description) VALUES (?, ?, ?, ?)",
            [action, incidentId, operatorId, description]
        );
        return {
            id: result.insertId,
            action,
            incidentId,
            operatorId,
            description
        };
    }
}

export default new LogRepository();