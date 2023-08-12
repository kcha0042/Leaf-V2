import { DatabaseCollection } from "../../database/DatabaseCollection";
import DatabaseSession from "../../database/DatabaseSession";
import WorkerDataObject from "../../database/WorkerDataObject";
import Worker from "../employee/Worker";

class GetWorkersManager {
    public static readonly inst = new GetWorkersManager();

    private constructor() {}

    public async getWorkers(): Promise<Worker[]> {
        const workerDataObjects = await DatabaseSession.inst.readCollection(DatabaseCollection.Workers);
        return workerDataObjects.map((data) => WorkerDataObject.restore(data));
    }
}

export default GetWorkersManager;
