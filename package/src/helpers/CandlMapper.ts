import { CandlData } from "../interfaces/CandlData";
import { CandlDataMap } from "../interfaces/CandlDataMap";

export abstract class CandlMapper {
  /**
   * Map raw data to CandlData
   * @param {any[]} data - Array of raw data
   * @param {CandlDataMap} map - Map of the raw data to CandlData
   * @returns {CandlData[]} Array of CandlData. Empty if a row is faulty and hasRowTolerance is false
   */
  public static map(data: any[], map: CandlDataMap): CandlData[] {
    const newArray: CandlData[] = [];

    for (let i = 0; i < data.length; i++) {
      if (
        (!map.t.isOptional && data[i][map.t.key] == null) ||
        (!map.o.isOptional && data[i][map.o.key] == null) ||
        (!map.c.isOptional && data[i][map.c.key] == null) ||
        (!map.h.isOptional && data[i][map.h.key] == null) ||
        (!map.l.isOptional && data[i][map.l.key] == null) ||
        (!map.v.isOptional && data[i][map.v.key] == null)
      ) {
        return [];
      }

      newArray.push({
        t: data[i][map.t.key],
        o: data[i][map.o.key],
        c: data[i][map.c.key],
        h: data[i][map.h.key],
        l: data[i][map.l.key],
        v: data[i][map.v.key],
      });
    }

    return newArray;
  }
}
