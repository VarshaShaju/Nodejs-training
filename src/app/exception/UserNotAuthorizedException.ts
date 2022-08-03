import HttpException from "./HttpException";
import { CustomError, ErrorCodes } from "../util/errorCode";

/**
 * This exception can use used in case an entity is not found.
 */
class UserNotAuthorizedException extends HttpException {

  constructor() {
    super(403, ErrorCodes.UNAUTHORIZED.MESSAGE, ErrorCodes.UNAUTHORIZED.CODE);
  }
}

export default UserNotAuthorizedException;