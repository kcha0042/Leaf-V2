import AdminDataObject from "../../database/AdminDataObject";
import { DatabaseCollection } from "../../database/DatabaseCollection";
import DatabaseSession from "../../database/DatabaseSession";
import { compactMap } from "../../language/functions/CompactMap";
import Admin from "../employee/Admin";
import EmployeeID from "../employee/EmployeeID";

class AdminsManager {
    public static readonly inst = new AdminsManager();

    private constructor() {}

    public async getAdmins(): Promise<Admin[]> {
        const leaderDataObjects = await DatabaseSession.inst.readCollection(DatabaseCollection.Admins);
        return compactMap(leaderDataObjects, (data) => AdminDataObject.restore(data));
    }

    public async getAdmin(id: EmployeeID): Promise<Admin | null> {
        const dataObject = await DatabaseSession.inst.read(DatabaseCollection.Admins, id.toString());
        if (!dataObject) {
            return null;
        }
        return AdminDataObject.restore(dataObject);
    }

    public async updateAdmin(admin: Admin): Promise<boolean> {
        const dataObject = AdminDataObject.create(admin);
        return DatabaseSession.inst.update(DatabaseCollection.Admins, admin.id.toString(), dataObject.data);
    }
}

export default AdminsManager;
