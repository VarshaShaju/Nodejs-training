import HttpException from "./HttpException";
import { CustomError, ErrorCodes } from "../util/errorCode";

/**
 * This exception can use used in case an entity is not found.
 */
class UserNotAuthorizedException extends HttpException {

  constructor() {
    const error: CustomError = ErrorCodes.UNAUTHORIZED;
    super(403, error.MESSAGE, error.CODE);
  }
}

export default UserNotAuthorizedException;