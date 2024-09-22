import dayjs from "dayjs";
import { CandlTimeFrame } from "../enums/CandlTimeFrame";
import { CandlData } from "../interfaces/CandlData";
import { CandlTime } from "./CandlTime";

export abstract class CandlMock {
  public static generateMockData(
    type: CandlTimeFrame,
    count: number
  ): CandlData[] {
    const timeToAdd: number = CandlTime.getTimeFrameMilliseconds(type);

    const dataLocal: CandlData[] = [];
    let currentTimestamp = dayjs("2024-01-01 00:00:00").valueOf();

    const maxPriceVariation = 1;
    const minVolume = 2000;
    const maxVolume = 10000;

    for (let i = 0; i < count; i++) {
      let openPrice;
      if (dataLocal.length > 0) {
        openPrice = dataLocal[dataLocal.length - 1].c;
      } else {
        openPrice = 1000;
        //Math.random() * maxPriceVariation * 2 - maxPriceVariation;
      }

      const highPrice = openPrice + Math.random() * (maxPriceVariation * 4);
      const lowPrice = openPrice - Math.random() * (maxPriceVariation * 4);
      const closePrice =
        openPrice +
        (Math.random() * (highPrice - lowPrice) - (highPrice - openPrice));

      const validHigh =
        Math.max(openPrice, closePrice) + Math.random() * maxPriceVariation;
      const validLow =
        Math.min(openPrice, closePrice) - Math.random() * maxPriceVariation;

      const volume =
        (Math.random() * (maxVolume - minVolume + 1) + minVolume) *
        (Math.abs(validHigh - validLow) * 2);

      dataLocal.push({
        t: currentTimestamp,
        o: parseFloat(openPrice.toFixed(4)),
        h: parseFloat(validHigh.toFixed(4)),
        l: parseFloat(validLow.toFixed(4)),
        c: parseFloat(closePrice.toFixed(4)),
        v: parseFloat(volume.toFixed(2)),
      });

      currentTimestamp += timeToAdd;
    }

    return dataLocal;
  }

  public static generateSameMockForEveryTimeFrame(
    count: number
  ): CandlData[][] {
    const dataLocal: CandlData[] = this.generateMockData(
      CandlTimeFrame.Time1Minute,
      count
    );

    const aggregateCandles = (timeframe: number): CandlData[] => {
      const aggregatedData: CandlData[] = [];
      for (let i = 0; i < dataLocal.length; i += timeframe) {
        const chunk = dataLocal.slice(i, i + timeframe);

        if (chunk.length > 0) {
          const open = chunk[0].o;
          const close = chunk[chunk.length - 1].c;
          const high = Math.max(...chunk.map((c) => c.h));
          const low = Math.min(...chunk.map((c) => c.l));
          const volume = chunk.reduce((acc, c) => acc + c.v, 0);

          aggregatedData.push({
            t: chunk[0].t,
            o: open,
            h: high,
            l: low,
            c: close,
            v: parseFloat(volume.toFixed(2)),
          });
        }
      }
      return aggregatedData;
    };

    const collections: CandlData[][] = [];

    for (let i = 0; i < Object.keys(CandlTimeFrame).length / 2; i++) {
      collections[i] = aggregateCandles(
        CandlTime.getTimeFrameMilliseconds(i as CandlTimeFrame) / 60000
      );
    }

    return collections;
  }

  public static generateMockDataOneByOne(
    type: CandlTimeFrame,
    closeAtOpen: boolean,
    lastValue?: CandlData
  ): CandlData {
    const timeToAdd: number = CandlTime.getTimeFrameMilliseconds(type);

    let currentTimestamp: number;

    if (lastValue) {
      currentTimestamp = dayjs(lastValue.t)
        .add(timeToAdd, "milliseconds")
        .valueOf();
    } else {
      currentTimestamp = dayjs("2024-01-01 00:00:00").valueOf();
    }

    const maxPriceVariation = 1;
    const minVolume = 1000;
    const maxVolume = 10000;

    let openPrice;

    if (lastValue) {
      openPrice = lastValue.c;
    } else {
      openPrice =
        1000 + Math.random() * maxPriceVariation * 2 - maxPriceVariation;
    }

    let highPrice;
    let lowPrice;
    let closePrice = openPrice;
    let validHigh = closePrice;
    let validLow = closePrice;
    let volume = 0;

    if (closeAtOpen) {
      closePrice = openPrice;
    } else {
      highPrice = openPrice + Math.random() * (maxPriceVariation * 4);
      lowPrice = openPrice - Math.random() * (maxPriceVariation * 4);
      closePrice =
        openPrice +
        (Math.random() * (highPrice - lowPrice) - (highPrice - openPrice));

      validHigh =
        Math.max(openPrice, closePrice) + Math.random() * maxPriceVariation;
      validLow =
        Math.min(openPrice, closePrice) - Math.random() * maxPriceVariation;

      volume =
        (Math.random() * (maxVolume - minVolume + 1) + minVolume) *
        (Math.abs(validHigh - validLow) * 2);
    }

    return {
      t: currentTimestamp,
      o: parseFloat(openPrice.toFixed(4)),
      h: parseFloat(validHigh.toFixed(4)),
      l: parseFloat(validLow.toFixed(4)),
      c: parseFloat(closePrice.toFixed(4)),
      v: parseFloat(volume.toFixed(2)),
    };
  }

  public static generateMockCandleTick(lastValue: CandlData): CandlData {
    let diff = (Math.random() - 0.5) * 0.5;

    let closePrice = lastValue.c + diff;

    let validHigh = closePrice > lastValue.h ? closePrice : lastValue.h;

    let validLow = closePrice < lastValue.l ? closePrice : lastValue.l;

    const volume =
      lastValue.v + (Math.abs(diff) + Math.random()) * Math.random() * 1000;

    return {
      t: lastValue.t,
      o: parseFloat(lastValue.o.toFixed(4)),
      h: parseFloat(validHigh.toFixed(4)),
      l: parseFloat(validLow.toFixed(4)),
      c: parseFloat(closePrice.toFixed(4)),
      v: parseFloat(volume.toFixed(2)),
    };
  }
}
