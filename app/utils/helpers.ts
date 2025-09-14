export class HelperUtils {
  private static phoneExp = new RegExp('^05d{8}$');
  private static emailExp = new RegExp('^[w.-]+@[a-zA-Zd.-]+.[a-zA-Z]{2,}$');

  public static isPhoneValid = (phone: string) => this.phoneExp.test(phone);
  public static isEmailValid = (email: string) => this.emailExp.test(email);
}
