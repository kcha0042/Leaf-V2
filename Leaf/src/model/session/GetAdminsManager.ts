import AdminDataObject from "../../database/AdminDataObject";
import { DatabaseCollection } from "../../database/DatabaseCollection";
import DatabaseSession from "../../database/DatabaseSession";
import Admin from "../employee/Admin";

class GetAdminsManager {
    public static readonly inst = new GetAdminsManager();

    private constructor() {}

    public async getAdmins(): Promise<Admin[]> {
        const leaderDataObjects = await DatabaseSession.inst.readCollection(DatabaseCollection.Admins);
        return leaderDataObjects.map((data) => AdminDataObject.restore(data));
    }
}

export default GetAdminsManager;
