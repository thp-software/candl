import { CandlVector2 } from "../interfaces/CandlVector2";

export abstract class CandlHelper {
  /**
   * @public @static
   * Get a pixel perfect number to draw on the canvas.
   * It reduce blur, even for very small object.
   * The idea is to draw on a full physical pixel on the screen.
   * However, it can make some object too "crisp".
   * @param {number} value - The raw value.
   * @returns {number} The clean pixel perfect value.
   */
  public static getPixelPerfectNumber(value: number): number {
    // return value;
    return value > 0.0 && value < 1.0 ? 1.0 : Math.round(value);
  }

  /**
   * Return a value in range
   * @param value - Value to scale
   * @param min - Minimal value in range
   * @param max - Maximal value in range
   * @param candleViewSize - View to range the value
   * @param startOffset - Start of the offset of the view (padding)
   * @param endOffset - End of the offset of the view (padding)
   * @returns Value in range
   */
  public static scale(
    value: number,
    min: number,
    max: number,
    candleViewSize: CandlVector2,
    startOffset: CandlVector2,
    endOffset: CandlVector2
  ) {
    return (
      candleViewSize.y -
      endOffset.y - // Point supérieur du graphique
      ((value - min) / (max - min)) *
        (candleViewSize.y - startOffset.y - endOffset.y)
    );
  }

  public static getFont(fontSize: number, font: string, canvasDensity: number) {
    return `${fontSize * canvasDensity}px ${font}`;
  }

  public static getValueWithDensity(value: number, canvasDensity: number) {
    return Math.round(value * canvasDensity);
  }
}
