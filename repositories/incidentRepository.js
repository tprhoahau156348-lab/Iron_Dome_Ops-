import pool from "../db/database.js";

class IncidentRepository {
    async createIncident(codeName, threatLevel, operatorId) {
        const [result] = await pool.query(
            "INSERT INTO incidents (code_name, threat_level, status, operator_id) VALUES (?, ?, 'OPEN', ?)",
            [codeName, threatLevel, operatorId]
        );
        return {
            id: result.insertId,
            codeName,
            threatLevel,
            status: "OPEN",
            operatorId
        };
    }

    async updateIncidentStatus(id, status) {
        await pool.query(
            "UPDATE incidents SET status = ? WHERE id = ?",
            [status, id]
        );
        return this.getIncidentById(id);
    }

    async getOpenIncidents() {
        const [rows] = await pool.query(
            "SELECT * FROM incidents WHERE status != 'CLOSED'"
        );
        return rows;
    }

    async getIncidentById(id) {
        const [rows] = await pool.query(
            "SELECT * FROM incidents WHERE id = ?",
            [id]
        );
        return rows[0] || null;
    }
}

export default new IncidentRepository();