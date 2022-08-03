import { plainToClass } from "class-transformer";
import { Employee } from "../entities/Employee";
import EntityNotFoundException from "../exception/EntityNotFoundException";
import HttpException from "../exception/HttpException";
import { EmployeeRespository } from "../repository/EmployeeRepository";
import { ErrorCodes } from "../util/errorCode";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import UserNotAuthorizedException from "../exception/UserNotAuthorizedException";
import IncorrectUsernameOrPasswordException from "../exception/IncorrectUsernameOrPasswordException";

export class EmployeeService{
    updateEmployeeById(id: string, body: any): any {
      throw new Error("Method not implemented.");
    }
    softDeleteEmployeeById(id: string): any {
      throw new Error("Method not implemented.");
    }
    constructor(private employeeRepo: EmployeeRespository){

    }
    async getAllEmployees(){

        return await this.employeeRepo.getAllEmployees();
    }

    async getEmployeeById(id:string){
        const employee = await this.employeeRepo.getEmployeeById(id);
        console.log(employee)
        if(!employee){
            throw new EntityNotFoundException(ErrorCodes.USER_WITH_ID_NOT_FOUND)
        }
    }
    public async createEmployee(employeeDetails: any) {
        try {
            const newEmployee = plainToClass(Employee, {
                name: employeeDetails.name,
                // username: employeeDetails.username,
                password: employeeDetails.password ? await bcrypt.hash(employeeDetails.password,10): '',
                experience: employeeDetails.experience,
                role:employeeDetails.role,
                departmentId: employeeDetails.departmentId,
                //isActive: true,
            });
            const save = await this.employeeRepo.saveEmployeeDetails(newEmployee);
            return save;
        } catch (err) {
            //throw new HttpException(400, "Failed to create employee");
            throw err;
        }
    }

    public async UpdateEmployee(id:string , employeeDetails:any) {
        try {
            const updatedEmployee = plainToClass(Employee, {
                name: employeeDetails.name,
                // username: employeeDetails.username,
                // age: employeeDetails.age,
                departmentId: employeeDetails.departmentId,
                // isActive: true,
            });
            const save = await this.employeeRepo.updateEmployeeDetails(id, updatedEmployee);
            return save;
        } catch (err) {
         // throw new HttpException(400, "Failed to create employee");
        }
    }

    public employeeLogin = async (
        name: string,
        password: string,
      ) => {
        const employeeDetails = await this.employeeRepo.getEmployeeByName(
          name
        );
        if (!employeeDetails) {
          throw new UserNotAuthorizedException();
        }
        
        const validPassword = await bcrypt.compare(password, employeeDetails.password);
        if (validPassword) {
          let payload = {
            "custom:id": employeeDetails.id,
            "custom:name": employeeDetails.name,
            "custom:role" : employeeDetails.role,
          };
          const token = this.generateAuthTokens(payload);

          return {
            idToken: token,
            employeeDetails,
          };
        } else {
          throw new IncorrectUsernameOrPasswordException();
        }
      };

     private generateAuthTokens = (payload: any) => {
        return jsonwebtoken.sign(payload, process.env.JWT_TOKEN_SECRET, {
          expiresIn: process.env.ID_TOKEN_VALIDITY,
        });
      };  
    
    }