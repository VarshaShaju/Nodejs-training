import HttpException from "./HttpException";
import { CustomError, ErrorCodes } from "../util/errorCode";

/**
 * This exception can use used in case an entity is not found.
 */
class IncorrectUsernameOrPasswordException extends HttpException {

  constructor() {
    const error: CustomError = ErrorCodes.INCORRECT_USERNAME_OR_PASSWORD;
    super(401, error.MESSAGE, error.CODE);
  }
}

export default IncorrectUsernameOrPasswordException;