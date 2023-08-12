import { DatabaseCollection } from "../../database/DatabaseCollection";
import DatabaseSession from "../../database/DatabaseSession";
import LeaderDataObject from "../../database/LeaderDataObject";
import Leader from "../employee/Leader";

class GetLeadersManager {
    public static readonly inst = new GetLeadersManager();

    private constructor() {}

    public async getLeaders(): Promise<Leader[]> {
        const leaderDataObjects = await DatabaseSession.inst.readCollection(DatabaseCollection.Leaders);
        return leaderDataObjects.map((data) => LeaderDataObject.restore(data));
    }
}

export default GetLeadersManager;
