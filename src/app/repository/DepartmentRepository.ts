import { getConnection } from "typeorm";
import { Department } from "../entities/Department";

export class DepartmentRepository{
    async getAllDepartments(){
        const departmentRepo = getConnection().getRepository(Department);
        const data = await departmentRepo.find();
        return data;
    }

    async getDepartmentById(departmentId: string) {
        const departmentRepo = getConnection().getRepository(Department);
        const data = await departmentRepo.findOne({
            id: departmentId
        })
        return data;
    }

    public async saveDepartmentDetails(departmentDetails: Department) {
        const departmentRepo = getConnection().getRepository(Department);
        return departmentRepo.save(departmentDetails);
    }

    public async updateDepartment(departmentDetails: Department) {
        const departmentRepo = getConnection().getRepository(Department);
        const data = await departmentRepo.update(
            {
                id: departmentDetails.id,
                deletedAt: null
            },
            {
                name: departmentDetails.name
            }
        )
    }

    public async deleteDepartment(departmentId: string) {
        const departmentRepo = getConnection().getRepository(Department);
        const data = await departmentRepo.softDelete({
            id: departmentId
        });
        return data;
    }
}