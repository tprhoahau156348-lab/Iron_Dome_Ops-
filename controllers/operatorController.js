import operatorService from "../services/operatorService.js";

class OperatorController {
    async createOperator(req, res, next) {
        try {
            const { name, rank } = req.body;
            const operator = await operatorService.createOperator(name, rank);
            return res.status(201).json(operator);
        } catch (error) {
            next(error);
        }
    }
}

export default new OperatorController();