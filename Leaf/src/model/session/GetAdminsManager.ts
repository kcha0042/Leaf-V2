import AdminDataObject from "../../database/AdminDataObject";
import { DatabaseCollection } from "../../database/DatabaseCollection";
import DatabaseSession from "../../database/DatabaseSession";
import { compactMap } from "../../language/functions/CompactMap";
import Admin from "../employee/Admin";

class GetAdminsManager {
    public static readonly inst = new GetAdminsManager();

    private constructor() {}

    public async getAdmins(): Promise<Admin[]> {
        const leaderDataObjects = await DatabaseSession.inst.readCollection(DatabaseCollection.Admins);
        return compactMap(leaderDataObjects, (data) => AdminDataObject.restore(data));
    }
}

export default GetAdminsManager;
