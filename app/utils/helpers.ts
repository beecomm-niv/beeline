import { CustomerReservation, LightReservation } from '../models/reservation';

export class HelperUtils {
  private static phoneExp = new RegExp('^05d{8}$');
  private static emailExp = new RegExp('^[w.-]+@[a-zA-Zd.-]+.[a-zA-Z]{2,}$');

  public static isPhoneValid = (phone: string) => this.phoneExp.test(phone);
  public static isEmailValid = (email: string) => this.emailExp.test(email);

  public static convertReservationsToWaitingList = (dinnersToLineId: Record<number, string>, waitingList: Record<string, LightReservation>, customer: CustomerReservation): LightReservation[] => {
    const reservation = waitingList[customer.id];
    if (!reservation) {
      return [];
    }

    const customerLineId = dinnersToLineId[reservation.dinners];
    if (!customerLineId) {
      return [];
    }

    return Object.values(waitingList)
      .map((l) => ({ ...l, lineId: dinnersToLineId[l.dinners] }))
      .filter((l) => l.lineId === customerLineId)
      .sort((a, b) => a.ts - b.ts);
  };
}
