import { plainToClass } from "class-transformer";
import { Department } from "../entities/Department";
import HttpException from "../exception/HttpException";
import { DepartmentRespository } from "../repository/DepartmentRepository";
export class DepartmentService {
  constructor(private departmentRepo: DepartmentRespository) {}
  async getAllDepartments() {
    return await this.departmentRepo.getAllDepartments();
  }  
  async getDepartmentById(id: string) {
    return await this.departmentRepo.getDepartmentById(id);
  }  
  
  public async createDepartment(departmentDetails: any) {
    try {
      const newDepartment = plainToClass(Department, {
        name: departmentDetails.name,
      });
      const save = await this.departmentRepo.saveDepartmentDetails(
        newDepartment
      );
      return save;
    } catch (err) {
      //throw new HttpException(400, "Failed to create department", "code-400");
      throw err;
    }
  }  
  
  public async updateDepartmentById(id: string, departmentDetails: any) {
    try {
      const updatedDepartment = plainToClass(Department, {
        name: departmentDetails.name,
      });
      const save = await this.departmentRepo.updateDepartmentDetails(
        id,
        updatedDepartment
      );
      return save;
    } catch (err) {
      throw new HttpException(400, "Failed to create department", "code-400");
    }
  }  public async softDeleteDepartmentById(id: string) {
    return await this.departmentRepo.softDeleteDepartmentById(id);
  }
}