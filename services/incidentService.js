import incidentRepository from "../repositories/incidentRepository.js";
import operatorRepository from "../repositories/operatorRepository.js";
import logRepository from "../repositories/logRepository.js";

const VALID_THREAT_LEVELS = ["LOW", "MEDIUM", "HIGH", "CRITICAL"];
const VALID_STATUSES = ["OPEN", "TRACKING", "INTERCEPTED", "CLOSED"];

class IncidentService {
    async createIncident(codeName, threatLevel, operatorId) {
        if (!codeName || typeof codeName !== "string" || codeName.trim() === "") {
            throw new Error("Invalid incident codeName. codeName is required.");
        }
        if (!threatLevel || !VALID_THREAT_LEVELS.includes(threatLevel.toUpperCase())) {
            throw new Error(`Invalid threatLevel. Allowed values: ${VALID_THREAT_LEVELS.join(", ")}`);
        }
        if (!operatorId || isNaN(operatorId)) {
            throw new Error("Invalid operatorId. It must be a valid number.");
        }

        const operator = await operatorRepository.getOperatorById(operatorId);
        if (!operator) {
            throw new Error("Operator not found.");
        }

        const incident = await incidentRepository.createIncident(
            codeName.trim(),
            threatLevel.toUpperCase(),
            operatorId
        );

        await logRepository.createLog(
            "INCIDENT_CREATED",
            incident.id,
            operatorId,
            "New incident created"
        );

        return incident;
    }

    async updateIncidentStatus(id, status) {
        if (!id || isNaN(id)) {
            throw new Error("Invalid incident ID.");
        }
        if (!status || !VALID_STATUSES.includes(status.toUpperCase())) {
            throw new Error(`Invalid status. Allowed values: ${VALID_STATUSES.join(", ")}`);
        }

        const normalizedStatus = status.toUpperCase();

        const incident = await incidentRepository.getIncidentById(id);
        if (!incident) {
            throw new Error("Incident not found.");
        }

        const updatedIncident = await incidentRepository.updateIncidentStatus(id, normalizedStatus);

        await logRepository.createLog(
            "STATUS_UPDATED",
            id,
            incident.operator_id,
            `Status changed to ${normalizedStatus}`
        );

        return updatedIncident;
    }

    async getOpenIncidents() {
        return await incidentRepository.getOpenIncidents();
    }
}

export default new IncidentService();