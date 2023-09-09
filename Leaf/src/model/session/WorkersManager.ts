import { DatabaseCollection } from "../../database/DatabaseCollection";
import DatabaseSession from "../../database/DatabaseSession";
import WorkerDataObject from "../../database/WorkerDataObject";
import { compactMap } from "../../language/functions/CompactMap";
import EmployeeID from "../employee/EmployeeID";
import Worker from "../employee/Worker";

class WorkersManager {
    public static readonly inst = new WorkersManager();

    private constructor() {}

    public async getWorkers(): Promise<Worker[]> {
        const dataObjects = await DatabaseSession.inst.readCollection(DatabaseCollection.Workers);
        return compactMap(dataObjects, (data) => WorkerDataObject.restore(data));
    }

    public async getWorker(id: EmployeeID): Promise<Worker | null> {
        const dataObject = await DatabaseSession.inst.read(DatabaseCollection.Workers, id.toString());
        if (!dataObject) {
            return null;
        }
        return WorkerDataObject.restore(dataObject);
    }

    public async updateWorker(worker: Worker): Promise<boolean> {
        const dataObject = WorkerDataObject.create(worker);
        return DatabaseSession.inst.update(DatabaseCollection.Workers, worker.id.toString(), dataObject.data);
    }

    public async deleteWorker(worker: Worker): Promise<boolean> {
        return DatabaseSession.inst.delete(DatabaseCollection.Workers, worker.id.toString());
    }
}

export default WorkersManager;
