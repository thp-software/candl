/**
 * Interface for candle data.
 * It represent a candlestick on the chart.
 * (Non-optimized Data Structure, approx. 80 bytes per candle and 8 extra bytes for each array pointer)
 */
export interface CandlData {
  /**
   * Timestamp - UNIX timestamp in milliseconds
   */
  t: number;
  /**
   * Price at open
   */
  o: number;
  /**
   * Price at close
   */
  c: number;
  /**
   * Highest Price
   */
  h: number;
  /**
   * Lowest Price
   */
  l: number;
  /**
   * Volume - Total number of shares exchanged
   */
  v: number;
}
