import { UnreachableCaseError } from "../../language/errors/UnreachableCaseError";
import StateManager from "../../state/publishers/StateManager";
import { LoginStatus } from "../../state/publishers/types/LoginStatus";
import Admin from "../employee/Admin";
import Employee from "../employee/Employee";
import Leader from "../employee/Leader";
import Worker from "../employee/Worker";
import AdminsManager from "./AdminsManager";
import LeadersManager from "./LeadersManager";
import WorkersManager from "./WorkersManager";

class EmployeeManager {
    public static readonly inst = new EmployeeManager();

    private constructor() {}

    public async updateEmployee(employee: Employee): Promise<boolean> {
        switch (StateManager.loginStatus.read()){
            case LoginStatus.Admin:
                return AdminsManager.inst.updateAdmin(employee as Admin);
            case LoginStatus.Leader:
                return LeadersManager.inst.updateLeader(employee as Leader);
            case LoginStatus.Worker:
                return WorkersManager.inst.updateWorker(employee as Worker);
            default:
                throw new UnreachableCaseError("Invalid login status");
        }
    }
}

export default EmployeeManager;
