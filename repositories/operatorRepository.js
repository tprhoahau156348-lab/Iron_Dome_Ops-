import pool from "../db/database.js";

class OperatorRepository {
    async createOperator(name, rank) {
        const [result] = await pool.query(
            "INSERT INTO operators (name, rank) VALUES (?, ?)",
            [name, rank]
        );
        return { id: result.insertId, name, rank };
    }

    async getOperatorById(id) {
        const [rows] = await pool.query(
            "SELECT * FROM operators WHERE id = ?",
            [id]
        );
        return rows[0] || null;
    }
}

export default new OperatorRepository();