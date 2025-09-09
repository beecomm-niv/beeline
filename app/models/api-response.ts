export class ApiResponse<T> {
  public hasError: boolean;
  public statusCode: number;
  public errorMessage: string;
  public value: T;

  private constructor(hasError: boolean, value: T, statusCode: number, errorMessage: string) {
    this.hasError = hasError;
    this.statusCode = statusCode;
    this.errorMessage = errorMessage;
    this.value = value;
  }

  public static success<U>(value: U, statusCode = 200): ApiResponse<U> {
    return new ApiResponse<U>(false, value, statusCode, '');
  }

  private static failure<U>(errorMessage: string, statusCode = 500): ApiResponse<U> {
    return new ApiResponse<U>(true, null!, statusCode, errorMessage);
  }

  public static UnknownError(): ApiResponse<null> {
    return ApiResponse.failure('Unknown error', 500);
  }

  public static BadUserOrPassword(): ApiResponse<null> {
    return this.failure('Bad user or password', 1000);
  }

  public static FailedToFetchUser(): ApiResponse<null> {
    return this.failure('Faild to fetch user data', 1001);
  }

  public static InvalidBody(): ApiResponse<null> {
    return this.failure('Invalid body', 1002);
  }

  public static UserAlradyExist(): ApiResponse<null> {
    return this.failure('The requested email is alrady exist', 1003);
  }
}
