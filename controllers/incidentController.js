import incidentService from "../services/incidentService.js";

class IncidentController {
    async createIncident(req, res, next) {
        try {
            const { codeName, threatLevel, operatorId } = req.body;
            const incident = await incidentService.createIncident(codeName, threatLevel, operatorId);
            return res.status(201).json(incident);
        } catch (error) {
            next(error);
        }
    }

    async updateIncidentStatus(req, res, next) {
        try {
            const { id } = req.params;
            const { status } = req.body;
            const updatedIncident = await incidentService.updateIncidentStatus(parseInt(id, 10), status);
            return res.status(200).json(updatedIncident);
        } catch (error) {
            next(error);
        }
    }

    async getOpenIncidents(req, res, next) {
        try {
            const openIncidents = await incidentService.getOpenIncidents();
            return res.status(200).json(openIncidents);
        } catch (error) {
            next(error);
        }
    }
}

export default new IncidentController();