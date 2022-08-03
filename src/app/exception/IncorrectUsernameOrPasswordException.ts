import HttpException from "./HttpException";
import { CustomError, ErrorCodes } from "../util/errorCode";

/**
 * This exception can use used in case an entity is not found.
 */
class IncorrectUsernameOrPasswordException extends HttpException {

  constructor() {
    super(403, ErrorCodes.USER_WITH_ID_NOT_FOUND.MESSAGE, ErrorCodes.USER_WITH_ID_NOT_FOUND.CODE);
  }
}

export default IncorrectUsernameOrPasswordException;