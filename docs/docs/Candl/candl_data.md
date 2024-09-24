---
sidebar_position: 5
---

# Candl Data

`CandlData` is the interface that contain all the informations about a candle.

<!-- [CandlMock](./candl_mock.md) can generate fake data.

[CandlMapper](./candl_mapper) can map raw data to `CandlData` -->

```ts
export interface CandlData {
  // Timestamp - UNIX timestamp in milliseconds
  t: number;
  // Price at open
  o: number;
  // Price at close
  c: number;
  // Highest Price
  h: number;
  // Lowest Price
  l: number;
  // Volume - Total number of shares exchanged
  v: number;
}
```
