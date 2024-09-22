import { CandlXLabelType } from "../enums/CandlXLabelType";
import { CandlVector2 } from "./CandlVector2";

export interface CandlXLabelOptions {
  type: CandlXLabelType;
  /**
   * Font of the label
   */
  font: string;
  /**
   * Font size (in px)
   */
  fontSize: number;
  /**
   * Color of the label
   */
  fontColor: string;
  /**
   * Format of the text (see Day.js format)
   */
  format: string;
  /**
   * Offset of the label in pixels
   */
  offset: CandlVector2;
}
