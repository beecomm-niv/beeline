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
    return new ApiResponse<U>(true, undefined!, statusCode, errorMessage);
  }

  public static Unauthorized(): ApiResponse<null> {
    return ApiResponse.failure('Unauthorized !', 403);
  }

  public static NotFound(): ApiResponse<null> {
    return ApiResponse.failure('Not Found', 404);
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

  public static TokenIsMissing(): ApiResponse<null> {
    return this.failure('Token is missing', 1004);
  }

  public static CustomerHaveActiveReservation(): ApiResponse<null> {
    return this.failure('The customer alrady have active reservation', 1005);
  }

  public static TooManyTries(): ApiResponse<null> {
    return this.failure('Too many tries', 1006);
  }

  public static UnmatchedCode(): ApiResponse<null> {
    return this.failure('The code is unmatched', 1007);
  }

  public static InvalidSmsSettings(): ApiResponse<null> {
    return this.failure('The sms settings is invalid', 1008);
  }

  public static SmsMessageError(message: string): ApiResponse<null> {
    return this.failure(message, 1009);
  }

  public static FailedToUploadImage(): ApiResponse<null> {
    return this.failure('Failed to upload image', 1010);
  }
}
