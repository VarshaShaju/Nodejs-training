import { getConnection } from "typeorm";
import { Department } from "../entities/Department"; 

export class DepartmentRespository {
  async getAllDepartments(): Promise<Department[]> {
    const departmentRepo = getConnection().getRepository(Department);
    return departmentRepo.find();
  } async getDepartmentById(id: string): Promise<Department> {
    const departmentRepo = getConnection().getRepository(Department);
    return departmentRepo.findOne(id);
  } public async updateDepartmentDetails(
    departmentId: string,
    departmentDetails: any
  ) {
    const departmentRepo = getConnection().getRepository(Department);
    const updateDepartmentDetails = await departmentRepo.update(
      { id: departmentId, deletedAt: null },
      {
        name: departmentDetails.name ? departmentDetails.name : undefined,
      }
    );
    return updateDepartmentDetails;
  } public async softDeleteDepartmentById(id: string) {
    const departmentRepo = getConnection().getRepository(Department);
    return departmentRepo.softDelete({
      id,
    });
  }
  public async saveDepartmentDetails(departmentDetails: Department) {
    const departmentRepo = getConnection().getRepository(Department);
    return departmentRepo.save(departmentDetails);
  }
}