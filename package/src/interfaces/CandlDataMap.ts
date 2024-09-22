export interface CandlDataMap {
  t: CandlDataMapElement;
  o: CandlDataMapElement;
  c: CandlDataMapElement;
  h: CandlDataMapElement;
  l: CandlDataMapElement;
  v: CandlDataMapElement;
}

export interface CandlDataMapElement {
  /**
   * Key of the raw data
   */
  key: string;
  /**
   * If not optional, the raw data will be rejected
   */
  isOptional: boolean;
}
