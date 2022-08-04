import { getConnection } from "typeorm";
import { Employee } from "../entities/Employee";

export class EmployeeRepository {
    async getAllEmployees() {
        const employeeRepo = getConnection().getRepository(Employee);
        const data = await employeeRepo.find({
            relations: [
                'address'
            ]
        });
        return data;
    }

    public async getEmployeeById(employeeId: string) {
        const employeeRepo = getConnection().getRepository(Employee);
        const data = await employeeRepo.findOne({
            where: {
                id: employeeId
            },
            relations: [
                'address'
            ]
        })
        return data;
    }

    public async getEmployeeByName(username: string) {
        const employeeRepo = getConnection().getRepository(Employee);
        const employeeDetail = await employeeRepo.findOne({
            where: { name: username },
        });
        return employeeDetail;
    }

    public async saveEmployeeDetails(employeeDetails: Employee) {
        const employeeRepo = getConnection().getRepository(Employee);
        const data = employeeRepo.save(employeeDetails);
        return data;
    }

    public async softDeleteEmployee(employeeId: string) {
        const employeeRepo = getConnection().getRepository(Employee);
        const entity = await employeeRepo.findOne({
            where: {
                id: employeeId
            },
            relations: [
                'address'
            ]
        })
        const data = await employeeRepo.softRemove(entity);
        return data;
    }

    public async updateEmployee(employeeDetails: Employee) {
        const employeeRepo = getConnection().getRepository(Employee);
        const data = await employeeRepo.save(employeeDetails)
        const updatedData = await employeeRepo.findOne(employeeDetails.id)
        return data;
    }
}