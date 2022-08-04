import { AbstractController } from "../util/rest/controller";
import { NextFunction, Response } from "express";
import RequestWithUser from "../util/rest/request";
import APP_CONSTANTS, { USER_ROLES } from "../constants";
import { DepartmentService } from "../service/DepartmentService";
import { Department } from "../entities/Department";
import validationMiddleware from "../middleware/ValidationMiddleware";
import { CreateDepartmentDto } from "../dto/CreateDepartmentDto";
import { UuidDto } from "../dto/UuidDto";
import { UpdateDepartmentDto } from "../dto/UpdateDepartmentDto";
import authorize from "../middleware/Authorize";

class DepartmentController extends AbstractController {
  constructor(private departmentService: DepartmentService) {
    super(`${APP_CONSTANTS.apiPrefix}/department`);
    this.initializeRoutes();
  }

  protected initializeRoutes() {
    this.router.get(
      `${this.path}`, 
      authorize([USER_ROLES.admin, USER_ROLES.developer, USER_ROLES.engineer, USER_ROLES.guest, USER_ROLES.manager]),
      this.getDepartments
    );
    this.router.get(
      `${this.path}/:id`,
      authorize([USER_ROLES.admin, USER_ROLES.manager, USER_ROLES.developer, USER_ROLES.engineer]),
      validationMiddleware(UuidDto, APP_CONSTANTS.params),
      this.getDepartmentById
    );
    this.router.put(
      `${this.path}/:id`,
      authorize([USER_ROLES.admin, USER_ROLES.manager]),
      validationMiddleware(UuidDto, APP_CONSTANTS.params),
      validationMiddleware(UpdateDepartmentDto, APP_CONSTANTS.body),
      this.updateDepartment
    );
    this.router.post(
      `${this.path}`,
      authorize([USER_ROLES.admin, USER_ROLES.manager]),
      validationMiddleware(CreateDepartmentDto, APP_CONSTANTS.body),
      this.createDepartment
    );
    this.router.delete(
      `${this.path}/:id`,
      authorize([USER_ROLES.admin]),
      validationMiddleware(UuidDto, APP_CONSTANTS.params),
      this.deleteDepartment
    )
  }

  private getDepartments = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const data: any = await this.departmentService.getAllDepartments();
      response.status(200);
      response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1));
    } catch (error) {
      return next(error);
    }
  }

  private getDepartmentById = async (
    request: RequestWithUser,
    response: Response, 
    next: NextFunction
  ) => {
    try {
      const data: Department = await this.departmentService.getDepartmentById(request.params);
      response.status(200);
      response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1))
    } catch (err) {
      return next(err)
    }
  }

  private createDepartment = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data = await this.departmentService.createDepartment(request.body);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
      );
    } catch (err) {
      next(err);
    }
  }

  private updateDepartment = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data = await this.departmentService.updateDepartment(request.params, request.body);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
      );
    } catch (err) {
      next(err);
    }
  }

  private deleteDepartment = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try{
      const data = await this.departmentService.deleteDepartment(request.params);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
      );
    } catch (err) {
      next(err);
    }
  }

}

export default DepartmentController;