import { DatabaseCollection } from "../../database/DatabaseCollection";
import DatabaseSession from "../../database/DatabaseSession";
import LeaderDataObject from "../../database/LeaderDataObject";
import { compactMap } from "../../language/functions/CompactMap";
import EmployeeID from "../employee/EmployeeID";
import Leader from "../employee/Leader";

class LeadersManager {
    public static readonly inst = new LeadersManager();

    private constructor() {}

    public async getLeaders(): Promise<Leader[]> {
        const leaderDataObjects = await DatabaseSession.inst.readCollection(DatabaseCollection.Leaders);
        return compactMap(leaderDataObjects, (data) => LeaderDataObject.restore(data));
    }

    public async getLeader(id: EmployeeID): Promise<Leader | null> {
        const dataObject = await DatabaseSession.inst.read(DatabaseCollection.Leaders, id.toString());
        if (!dataObject) {
            return null;
        }
        return LeaderDataObject.restore(dataObject);
    }

    public async updateLeader(leader: Leader): Promise<boolean> {
        const dataObject = LeaderDataObject.create(leader);
        return DatabaseSession.inst.update(DatabaseCollection.Leaders, leader.id.toString(), dataObject.data);
    }

    public async deleteLeader(leader: Leader): Promise<boolean> {
        return DatabaseSession.inst.delete(DatabaseCollection.Leaders, leader.id.toString());
    }
}

export default LeadersManager;
