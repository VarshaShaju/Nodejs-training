import { getConnection, Repository } from "typeorm";
import { Employee } from "../entities/Employee";

export class EmployeeRespository {
    // updateEmployeeDetails(newEmployee: Employee) {
    //     throw new Error("Method not implemented.");
    // }
    // UpdateEmployeeDetails(newEmployee: Employee) {
    //     throw new Error("Method not implemented.");
    // }
    public async getAllEmployees(){
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.findAndCount();
    }

    public async getEmployeeById(id:string) {
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.findOne(id);
    }

    public async saveEmployeeDetails(employeeDetails: Employee) {
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.save(employeeDetails);
    }
    

    public async updateEmployeeDetails(employeeId: string, employeeDetails: any) {
        const employeeRepo = getConnection().getRepository(Employee);
        const updateEmployeeDetails = await employeeRepo.update({ 
            id: employeeId, deletedAt: null }, 
        {
            name: employeeDetails.name ? employeeDetails.name : undefined,
            departmentId: employeeDetails.departmentId ? employeeDetails.departmentId : undefined,
        });
        return updateEmployeeDetails;
    }


    public async softDeleteEmployeeById(id: string) {
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.softDelete({
            id
        });
    }


    public async hardDeleteEmployeeById(id: string) {
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.delete({
            id
        });
    }

    public async getEmployeeByName(userName: string) {
        const employeeRepo = getConnection().getRepository(Employee);
        const employeeDetail = await employeeRepo.findOne({
            where: { name: userName },
        });
        return employeeDetail;
    }
}