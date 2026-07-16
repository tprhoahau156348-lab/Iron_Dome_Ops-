import operatorRepository from "../repositories/operatorRepository.js";

class OperatorService {
    async createOperator(name, rank) {
        if (!name || typeof name !== "string" || name.trim() === "") {
            throw new Error("Invalid operator name. Name is required.");
        }
        if (!rank || typeof rank !== "string" || rank.trim() === "") {
            throw new Error("Invalid operator rank. Rank is required.");
        }
        return await operatorRepository.createOperator(name.trim(), rank.trim());
    }

    async getOperatorById(id) {
        if (!id || isNaN(id)) {
            throw new Error("Invalid operator ID.");
        }
        const operator = await operatorRepository.getOperatorById(id);
        if (!operator) {
            throw new Error("Operator not found.");
        }
        return operator;
    }
}

export default new OperatorService();