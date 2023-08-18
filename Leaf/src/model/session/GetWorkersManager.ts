import { DatabaseCollection } from "../../database/DatabaseCollection";
import DatabaseSession from "../../database/DatabaseSession";
import WorkerDataObject from "../../database/WorkerDataObject";
import { compactMap } from "../../language/functions/CompactMap";
import EmployeeID from "../employee/EmployeeID";
import Worker from "../employee/Worker";

class GetWorkersManager {
    public static readonly inst = new GetWorkersManager();

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
}

export default GetWorkersManager;
