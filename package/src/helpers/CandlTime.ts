import { Dayjs } from "dayjs";
import { CandlTimeFrame } from "../enums/CandlTimeFrame";
import { CandlXLabelType } from "../enums/CandlXLabelType";

export abstract class CandlTime {
  /**
   * Get milliseconds in CandlTimeFrame
   * @param {CandlTimeFrame} type - Type to check
   * @returns {number}
   */
  public static getTimeFrameMilliseconds(type: CandlTimeFrame): number {
    switch (type) {
      case CandlTimeFrame.Time1Minute:
        return 60000;
      case CandlTimeFrame.Time5Minutes:
        return 300000;
      // case CandlTimeFrame.Time15Minutes:
      //   return 900000;
      // case CandlTimeFrame.Time30Minutes:
      //   return 1800000;
      case CandlTimeFrame.Time1Hour:
        return 3600000;
      // case CandlTimeFrame.Time4Hours:
      //   return 14400000;
      // case CandlTimeFrame.Time8Hours:
      //   return 28800000;
      // case CandlTimeFrame.Time12Hours:
      //   return 43200000;
      // case CandlTimeFrame.Time1Day:
      //   return 86400000;
      // case CandlTimeFrame.Time1Week:
      //   return 604800000;
      // case CandlTimeFrame.Time1Month:
      //   return 2678400000;
      default:
        return 0;
    }
  }

  /**
   * Check if the timestamp is of CandlXLabelType type
   * @param {CandlXLabelType} type - Type to check
   * @param {Dayjs} date - Timestamp to check
   * @returns {boolean}
   */
  public static isDateOfType(type: CandlXLabelType, date: Dayjs): boolean {
    switch (type) {
      case CandlXLabelType.LabelMinute:
        return date.isSame(date.startOf("minute"));
      case CandlXLabelType.Label5Minutes:
        return date.isSame(
          date.startOf("minute").subtract(date.minute() % 5, "minute")
        );
      case CandlXLabelType.Label10Minutes:
        return date.isSame(
          date.startOf("minute").subtract(date.minute() % 10, "minute")
        );
      case CandlXLabelType.Label15Minutes:
        return date.isSame(
          date.startOf("minute").subtract(date.minute() % 15, "minute")
        );
      case CandlXLabelType.Label20Minutes:
        return date.isSame(
          date.startOf("minute").subtract(date.minute() % 20, "minute")
        );
      case CandlXLabelType.Label30Minutes:
        return date.isSame(
          date.startOf("minute").subtract(date.minute() % 30, "minute")
        );
      case CandlXLabelType.LabelHour:
        return date.isSame(date.startOf("hour"));
      case CandlXLabelType.Label2Hours:
        return date.isSame(
          date.startOf("hour").subtract(date.hour() % 2, "hour")
        );
      case CandlXLabelType.Label4Hours:
        return date.isSame(
          date.startOf("hour").subtract(date.hour() % 4, "hour")
        );
      case CandlXLabelType.Label8Hours:
        return date.isSame(
          date.startOf("hour").subtract(date.hour() % 8, "hour")
        );
      case CandlXLabelType.LabelDay:
        return date.isSame(date.startOf("day"));
      case CandlXLabelType.Label2Days:
        return date.isSame(date.startOf("day").subtract(date.day() % 2, "day"));
      case CandlXLabelType.Label4Days:
        return date.isSame(date.startOf("day").subtract(date.day() % 4, "day"));
      case CandlXLabelType.Label8Days:
        return date.isSame(date.startOf("day").subtract(date.day() % 8, "day"));
      case CandlXLabelType.LabelWeek:
        return date.isSame(date.startOf("week"));
      case CandlXLabelType.LabelMonth:
        return date.isSame(date.startOf("month"));
      case CandlXLabelType.LabelYear:
        return date.isSame(date.startOf("year"));
      default:
        return false;
    }
  }
}
