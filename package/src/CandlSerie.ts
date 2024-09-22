import { getDefaultView } from "./data/BaseViews";
import { CandlTimeFrame } from "./enums/CandlTimeFrame";
import { CandlData } from "./interfaces/CandlData";
import { CandlView } from "./interfaces/CandlView";

/**
 * Manage a Serie.
 * Contain the data of a specific timeframe and his views
 */
export class CandlSerie {
  private data: CandlData[] = [];
  private views: CandlView[] = [];

  private viewIndex: number = 0;
  private id: CandlTimeFrame;
  private symbol: string;

  /**
   *
   * @param {CandlTimeFrame} id - The timeframe of the serie.
   * @param {string} symbol - The symbol of the serie. ex: DJI, FCHI, MSFT, AAPL, ...
   */
  constructor(id: CandlTimeFrame, symbol?: string) {
    this.id = id;
    if (symbol) {
      this.symbol = symbol;
    } else {
      this.symbol = "unknown";
    }
  }

  /**
   * Set the data of the serie
   * @param {CandlData[]} data - The data
   */
  public setData(data: CandlData[]): void {
    this.data = data;
  }

  /**
   * Append data to existing ones
   * @param {CandlData[]} data - The data
   */
  public appendData(data: CandlData[]): void {
    this.data = this.data.concat(data);
  }

  /**
   * Clear data
   */
  public clearData(): void {
    this.data = [];
  }

  /**
   * Set the last data of the serie
   * @param {CandlData} data - The data
   */
  public setLastData(data: CandlData): void {
    if (this.data.length > 0) {
      this.data[this.data.length - 1] = data;
    } else {
      this.data.push(data);
    }
  }

  /**
   * Return the last data of the serie. Undefined if the serie is empty.
   * @returns {CandlData | undefined}
   */
  public getLastData(): CandlData | undefined {
    if (this.data.length > 0) {
      return this.data[this.data.length - 1];
    }
    return undefined;
  }

  /**
   * Return data at specified index
   * @returns {CandlData}
   */
  public getDataByIndex(index: number): CandlData {
    if (index < 0 || index >= this.data.length) {
      return { t: 0, o: 0, c: 0, h: 0, l: 0, v: 0 };
    }
    return this.data[index];
  }

  /**
   * Return data at specified timestamp. Undefined if not found.
   * @returns {CandlData | undefined}
   */
  public getDataByTimestamp(timestamp: number): CandlData | undefined {
    return this.data.find((el) => el.t === timestamp);
  }

  /**
   * Return the count of data in the serie
   * @returns {number}
   */
  public getDataCount(): number {
    return this.data.length;
  }

  /**
   * Set the views of the serie
   * @param {CandlView[]} views - The views of the serie
   * @returns {void}
   */
  public setViews(views: CandlView[]): void {
    this.views = views;
  }

  /**
   * Get View at specific index
   * @param {number} index - Index of the view
   * @returns {CandlView | undefined}
   */
  public getView(index: number): CandlView | undefined {
    if (index >= 0 && index < this.views.length) {
      return this.views[index];
    }
    return undefined;
  }

  /**
   * Get the count of views
   * @returns {number}
   */
  public getViewsCount(): number {
    return this.views.length;
  }

  /**
   * Set the index of active view
   * @returns {number} - The index
   */
  public setActiveView(index: number): void {
    if (index < 0) {
      this.viewIndex = 0;
    } else if (index >= this.views.length) {
      this.viewIndex = this.views.length - 1;
    }
  }

  /**
   * Get the active view. If there is no active view, return the default view.
   * @returns {CandlView}
   */
  public getActiveView(): CandlView {
    if (this.views.length === 0) {
      return getDefaultView();
    }
    if (this.viewIndex >= this.views.length) {
      this.viewIndex = this.views.length - 1;
      return this.views[this.viewIndex];
    }
    return this.views[this.viewIndex];
  }

  /**
   * Get the view index
   * @returns {number}
   */
  public getViewIndex(): number {
    return this.viewIndex;
  }

  /**
   * Set the view index
   * @param {number} index
   */
  public setViewIndex(index: number): void {
    this.viewIndex = index;
  }

  /**
   * Get the id of the serie
   * @returns {CandlTimeFrame}
   */
  public getId(): CandlTimeFrame {
    return this.id;
  }

  /**
   * Get the symbol of the serie
   * @returns {string}
   */
  public getSymbol(): string {
    return this.symbol;
  }
}
