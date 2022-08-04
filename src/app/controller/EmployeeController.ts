import { AbstractController } from "../util/rest/controller";
import { NextFunction, Response } from "express";
import RequestWithUser from "../util/rest/request";
import APP_CONSTANTS, { USER_ROLES } from "../constants";
import { EmployeeService } from "../service/EmployeeService";
import { CreateEmployeeDto } from "../dto/CreateEmployeeDto";
import validationMiddleware from "../middleware/ValidationMiddleware";
import { UuidDto } from "../dto/UuidDto";
import { UpdateEmployeeDto } from "../dto/UpdateEmployeeDto";
import authorize from "../middleware/Authorize";

class EmployeeController extends AbstractController {
  constructor(private employeeService: EmployeeService) {
    super(`${APP_CONSTANTS.apiPrefix}/employee`);
    this.initializeRoutes();
  }

  protected initializeRoutes() {
    this.router.post(
      `${this.path}/login`,
      this.login
    );
    this.router.get(
      `${this.path}`,
      authorize([USER_ROLES.admin, USER_ROLES.manager, USER_ROLES.developer, USER_ROLES.engineer]),
      this.getEmployee
    );
    this.router.get(
      `${this.path}/:id`, 
      authorize([USER_ROLES.admin, USER_ROLES.manager]),
      validationMiddleware(UuidDto, APP_CONSTANTS.params),
      this.getEmployeeById
    )
    this.router.post(
      `${this.path}`,
      authorize([USER_ROLES.admin]),
      validationMiddleware(CreateEmployeeDto, APP_CONSTANTS.body),
      this.createEmployee
    );
    this.router.delete(
      `${this.path}/:id`,
      authorize([USER_ROLES.admin]),
      validationMiddleware(UuidDto, APP_CONSTANTS.params),
      this.deleteEmployee
    );
    this.router.put(
      `${this.path}/:id`,
      authorize([USER_ROLES.admin]),
      validationMiddleware(UuidDto, APP_CONSTANTS.params),
      validationMiddleware(UpdateEmployeeDto, APP_CONSTANTS.body),
      this.updateEmployee
    )
  }

  private login = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const loginData = request.body;
      const loginDetail = await this.employeeService.employeeLogin(
        loginData.name,
        loginData.password
      );
      response.send(
        this.fmt.formatResponse(loginDetail, Date.now() - request.startTime, "OK")
      );
    } catch (err) {
      next(err)
    }
  };

  private getEmployee = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const data: any = await this.employeeService.getAllEmployees();
      response.status(200);
      response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1));
    } catch (error) {
      return next(error);
    }
  }

  private getEmployeeById = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data: any = await this.employeeService.getEmployeeById(request.params.id);
      response.status(200);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
      )
    } catch (err) {
      next(err)
    }
  }

  private createEmployee = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data = await this.employeeService.createEmployee(request.body);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
      );
    } catch (err) {
      next(err);
    }
  }

  private deleteEmployee = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data = await this.employeeService.deleteEmployee(request.params.id);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
      );
    } catch(err) {
      next(err);
    }
  }

  private updateEmployee = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data = await this.employeeService.updateEmployee(request.params.id, request.body);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
      );
    } catch (err) {
      next(err)
    }
  }
}

export default EmployeeController;