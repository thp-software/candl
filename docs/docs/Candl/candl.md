---
sidebar_position: 2
---

# Candl

Candl is the main class that manage inputs and chart updates.

```ts
const candl: Candl = new Candl(container);
```

`container` is an `HTMLDivElement` in your HTML code.

Candl handle the creation, update and delete of the canvases. You just need to provide a parent div.

### Candl Option

The behavior of Candl is define with `CandlOption`.

Candl come with an already loaded CandlOption coming from `getBaseOptions()`.

However you can set your own options.

See more about [CandlOption](./candl_options.md).

### TimeFrame

[CandlTimeFrame](./candl_timeframe.md) is the unit of time of the chart, it define the duration of each candle.

For example :

```
CandlTimeFrame.Time1Minute
CandlTimeFrame.Time5Minutes
CandlTimeFrame.Time1Hour
```

```ts
// Return the active time frame of the chart
getActiveTimeFrame(): CandlTimeFrame
```

```ts
// Set the active time frame of the chart
setActiveTimeFrame(type: CandlTimeFrame): void
```

### Candl Serie

Candl Serie is an object that hold the data and the views for a specific TimeFrame.

```ts
// To get the serie which is currently rendered on the chart
getActiveSerie(): CandlSerie | undefined
```

```ts
// To get a serie by his TimeFrame.
getSerie(CandlTimeFrame): CandlSerie | undefined
```

```ts
// To add a serie.
addSerie(type: CandlTimeFrame, serie: CandlSerie): void
```

```ts
// To remove a serie.
removeSerie(type: CandlTimeFrame): void
```

See more about [CandlSerie](./candl_serie.md).

### Offset

`offset` is a [CandlVector2](./candl_vector2.md) of the current position of the chart.

```ts
// Get the offset of the canvas (from the bottom left of the chart)
getOffset(): CandlVector2
```

```ts
// Get the offset of the last candle in order to have it on the right of the chart
getLastCandleOffset(): number
```

```ts
// Set the offset of the canvas (from the bottom left of the chart)
setOffset(offset: CandlVector2): void
```

### Infos

Informations about the chart

```ts
// Get the number of candle currently drawn
getDrawnCandleCount(): number
```

```ts
// Get the number of candle stored in a specific serie
getCandleCount(type: CandlTimeFrame): number
```

```ts
// Get the index of the hovered candle
getIndexOfHoveredCandle(type: CandlTimeFrame): number
```

```ts
// Get the data of the hovered candle
getDataOfHoveredCandle(type: CandlTimeFrame): CandlData | null
```

<!-- ### Offset

Offset is the position of the chart.

More precisly, the offset is the bottom left position of the chart.

It is a `CandlVector2`, it has `x` and `y` properties.

`getOffset()` return the current offset of the chart

`setOffset()` Allow you to set the offset of the chart

### HoveredIndex

The hovered index is the position of the candle you hover with the mouse in the array of data.

### Render Quality

> The render quality cannot be set for the moment.

In order to improve visual, the canvases resolution are set to an higher definition than their real size.

It allow to get a render with better definition.

This parameter is `canvasDensity` -->
