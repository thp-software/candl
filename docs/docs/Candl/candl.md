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

### CandlOption

The behavior of Candl is define with `CandlOption`.

Candl come with an already loaded CandlOption coming from `getBaseOptions()`.

However you can set your own options.

See more about [CandlOption](./candl_options.md).

### TimeFrame

`CandlTimeFrame` is the unit of time of the chart, it define the time for each candle.

For example :

```
CandlTimeFrame.Time1Minute
CandlTimeFrame.Time5Minutes
CandlTimeFrame.Time1Hour
```

You can set the TimeFrame of the chart with `setActiveTimeFrame()`

### Candl Serie

Candl Serie is an object that hold the data and the views for one TimeFrame.

It contain an array of CandlData and an Array of CandlView.

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

This parameter is `canvasDensity`

<!-- Here you can see the default CandlOption :

```ts
{
    inputs: {
      handleInput: true,
      zoomAtCursor: true,
    },
    timeFrame: CandlTimeFrame.Time1Minute,
    show: {
      cross: true,
      lineCursor: true,
      priceLine: true,
      volume: true,
      gridY: true,
      gridX: true,
      yAxis: true,
      xLabels: true,
      hover: true,
      hoverInfos: true,
    },
    general: {
      backgroundColor: "#000A1D",
    },
    commonRender: {
      initialShadowWidth: 2,
      shadowWidthMin: 0.5,
      shadowWidthMax: 3,
      initialWidth: 10,
      initialSpacing: 5,
    },
    candleRender: {
      bearish: {
        color: "#EF5F62",
        shadowColor: "#933b3d",
      },
      bullish: { color: "#19AD9F", shadowColor: "#137c71" },
    },
    lineRender: {
      color: "#f0f",
      thickness: 2,
    },
    areaRender: {
      line: {
        color: "#f0f",
        thickness: 1,
      },
      area: {
        topColor: "#640064cc",
        bottomColor: "#00006433",
      },
    },
    volume: {
      bearish: { color: "#EF5F62a0" },
      bullish: { color: "#19AD9Fa0" },
      height: 100,
    },
    grid: {
      gridMajorX: {
        color: "#192231a0",
        thickness: 2,
      },
      gridMinorX: {
        color: "#192231a0",
        thickness: 1,
      },
      gridMajorY: {
        color: "#192231a0",
        thickness: 2,
      },
    },
    yAxis: {
      backgroundColor: "#00102dcc",
      labelFont: "Arial",
      labelFontSize: 14,
      labelColor: "#eee",
      width: 120,
    },
    xAxis: {
      height: 30,
    },
    priceLine: {
      color: "#ffffff50",
      labelBackgroundColor: "#2f599d",
      labelFont: "Arial",
      labelFontSize: 12,
      labelColor: "#fff",
    },
    cross: {
      color: "#fff",
      width: 0.5,
      dotted: {
        value: [7, 10],
      },
    },
    lineCursor: {
      ringColor: "white",
      fillColor: "#ffffff50",
      ringThickness: 1,
      radius: 10,
    },
    cursor: { style: "crosshair" },
}
``` -->
