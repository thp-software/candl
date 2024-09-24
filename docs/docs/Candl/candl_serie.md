---
sidebar_position: 4
---

# Candl Serie

A CandlSerie define the data for a specific [CandlTimeFrame](./candl_timeframe.md).

You can create a CandlSerie like this :

```ts
// It will create a serie for 1 minute long candles.
const mySerie: CandlSerie = new CandlSerie(CandlTimeFrame.Time1Minute);

// With optional symbol.
const mySerie: CandlSerie = new CandlSerie(CandlTimeFrame.Time1Minute, "DJI");
```

## Data

The data are stored in a [CandlData](./candl_data.md) array.

```ts
// Set the data of the serie
setData(data: CandlData[]): void
```

```ts
// Append data to existing ones
appendData(data: CandlData[]): void
```

```ts
// Clear data
clearData(): void
```

```ts
// Set the last data of the serie
// Typically, when you want to connect it
// to a market API or simulate one
setLastData(data: CandlData): void
```

```ts
// Return the last data of the serie
// Undefined if the serie is empty
getLastData(): CandlData | undefined
```

```ts
// Return data at specified index
getDataByIndex(index: number): CandlData
```

```ts
// Return data at specified timestamp
// Undefined if not found.
getDataByTimestamp(timestamp: number): CandlData | undefined
```

```ts
// Return the data count of the serie
getDataCount(): number
```

## Views

CandlSerie also define the views of the serie.

It contain an array of CandlView.

A CandlView define the way Candl will render your data. See [CandlView](./candl_view.md) for more informations.

```ts
// Set the views of the serie
setViews(views: CandlView[]): void
```

```ts
// Get View at specific index
getView(index: number): CandlView | undefined
```

```ts
// Get the count of views
getViewsCount(): number
```

```ts
// Set the index of the active view
setActiveView(index: number): void
```

```ts
// Get the active view. If there is no active view, return the default view.
getActiveView(): CandlView
```

```ts
// Get the active view index
getViewIndex(): number
```

## Others

It also provide methods to get the id and the symbol of the serie.

```ts
// Get id of the serie
getId(): CandlTimeFrame
```

```ts
// Get the market symbol
getSymbol(): string
```
