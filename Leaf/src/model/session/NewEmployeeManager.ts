import AdminDataObject from "../../database/AdminDataObject";
import { DatabaseCollection } from "../../database/DatabaseCollection";
import DatabaseSession from "../../database/DatabaseSession";
import LeaderDataObject from "../../database/LeaderDataObject";
import WorkerDataObject from "../../database/WorkerDataObject";
import Admin from "../employee/Admin";
import Leader from "../employee/Leader";
import Worker from "../employee/Worker";

class NewEmployeeManager {
    public static readonly inst = new NewEmployeeManager();

    private constructor() {}

    public async newWorkerCreated(worker: Worker): Promise<boolean> {
        const dataObject = WorkerDataObject.create(worker);
        return DatabaseSession.inst.insertOne(DatabaseCollection.Workers, dataObject.data, worker.id.toString());
    }

    public async newAdminCreated(admin: Admin): Promise<boolean> {
        const dataObject = AdminDataObject.create(admin);
        return DatabaseSession.inst.insertOne(DatabaseCollection.Admins, dataObject.data, admin.id.toString());
    }

    public async newLeaderCreated(leader: Leader): Promise<boolean> {
        const dataObject = LeaderDataObject.create(leader);
        return DatabaseSession.inst.insertOne(DatabaseCollection.Leaders, dataObject.data, leader.id.toString());
    }
}

export default NewEmployeeManager;
