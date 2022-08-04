import { plainToClass } from "class-transformer";
import { Department } from "../entities/Department";
import HttpException from "../exception/HttpException";
import { DepartmentRepository } from "../repository/DepartmentRepository";

export class DepartmentService{
    constructor(private departmentRepository: DepartmentRepository) {

    }

    async getAllDepartments(){
        const data = await this.departmentRepository.getAllDepartments();
        return data;
    }

    public async getDepartmentById(departmentDetails: any) {
        try{
            const departmentId = departmentDetails.id;
            const data = await this.departmentRepository.getDepartmentById(departmentId);
            return data;
        } catch (err) {
            throw new HttpException(400, "Failed to get department")
        }
    }
    
    public async createDepartment(departmentDetails: any) {
        try {
            const newDepartment = plainToClass(Department, {
                name: departmentDetails.name,
            });
            const save = await this.departmentRepository.saveDepartmentDetails(newDepartment);
            return save;
        } catch (err) {
            throw new HttpException(400, "Failed to create department");
        }
    }

    public async updateDepartment(departmentIdDetails: any, departmentDetails: any) {
        try {
            const updatedDepartment = plainToClass(Department, {
                id: departmentIdDetails.id,
                name: departmentDetails.name
            })
            const data = this.departmentRepository.updateDepartment(updatedDepartment);
            return data;
        } catch (err) {
            throw new HttpException(400, "Failed to update department");
        }
    }

    public async deleteDepartment(departmentIdDetails: any) {
        try {
            const departmentId = departmentIdDetails.id;
            const data = this.departmentRepository.deleteDepartment(departmentId);
            return data;
        } catch (err) {
            throw new HttpException(400, "Failed to delete department");
        }
    }
    
}