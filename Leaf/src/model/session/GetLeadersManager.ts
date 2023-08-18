import { DatabaseCollection } from "../../database/DatabaseCollection";
import DatabaseSession from "../../database/DatabaseSession";
import LeaderDataObject from "../../database/LeaderDataObject";
import { compactMap } from "../../language/functions/CompactMap";
import Leader from "../employee/Leader";

class GetLeadersManager {
    public static readonly inst = new GetLeadersManager();

    private constructor() {}

    public async getLeaders(): Promise<Leader[]> {
        const leaderDataObjects = await DatabaseSession.inst.readCollection(DatabaseCollection.Leaders);
        return compactMap(leaderDataObjects, (data) => LeaderDataObject.restore(data));
    }
}

export default GetLeadersManager;
