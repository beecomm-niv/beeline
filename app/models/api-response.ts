export class ApiResponse<T> {
  private hasError: boolean;
  private value: T;
  private statusCode: number;
  private errorMessage: string;

  private constructor(hasError: boolean, value: T, statusCode: number, errorMessage: string) {
    this.hasError = hasError;
    this.value = value;
    this.statusCode = statusCode;
    this.errorMessage = errorMessage;
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
}
