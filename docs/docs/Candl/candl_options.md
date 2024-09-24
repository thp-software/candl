---
sidebar_position: 3
---

# Candl Options

The behavior of Candl is define with `CandlOption`.

Candl come with an already loaded CandlOption coming from `getBaseOptions()`.

However you can set your own options.

All the methods here has to be called on `Candl` instance.

## Full Set

```ts
// Set the all the options at once
setOptions(options: CandlOption): void;
```

All the properties are mandatory here.

Here a full example of CandlOption.

```ts
const candlOptions: CandlOption = {
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
};
```

## Partial Set

All the methods below use `DeepPartial<>`.

So you can specify only the property you want to change.

### Show

```ts
// Enable / Disable a feature of the chart
setOptionsShow(options: CandlOptionShow): void
```

```ts
export interface CandlOptionShow {
  // Show a cross centered on mouse pointer.
  cross: boolean;
  // Show a round cursor on the hovered Line / Area.
  lineCursor: boolean;
  // Show the vertical lines of the grid.
  gridX: boolean;
  // Show the horizontal lines of the grid.
  gridY: boolean;
  // Show vertical yAxis with prices on the right.
  yAxis: boolean;
  // Show horizontal price line with current price.
  priceLine: boolean;
  // Show volume bars.
  volume: boolean;
  // Show xAxis timestamp labels.
  xLabels: boolean;
  // Highlight the hovered candle.
  hover: boolean;
  // Show infos of the hovered candle.
  hoverInfos: boolean;
}
```

### General

```ts
// Set general options of the chart
setOptionsGeneral(options: CandlOptionGeneral): void
```

```ts
export interface CandlOptionGeneral {
  // Background color of the chart
  backgroundColor: string;
}
```

### Inputs

```ts
// Set inputs options of the chart
setOptionsInputs(options: CandlOptionInputs): void
```

```ts
export interface CandlOptionInputs {
  // Enable / Disable inputs handling
  handleInput: boolean;
  // Zoom at the position of the mouse cursor
  zoomAtCursor: boolean;
}
```

### Grid

```ts
// Set grid options
setOptionsGrid(options: CandlOptionGrid): void
```

```ts
export interface CandlOptionGrid {
  // Lines draw every n steps (see CandlView).
  gridMajorX: {
    // Color of the line.
    color: string;
    // Thickness of the line.
    thickness: number;
  };
  // Lines draw every n steps (see CandlView).
  gridMinorX: {
    color: string;
    thickness: number;
  };
  // Horizontal lines draw every n steps.
  gridMajorY: {
    color: string;
    thickness: number;
  };
}
```

### XAxis

```ts
// Set x axis options
setOptionsXAxisLabels(options: CandlOptionXAxisLabels): void
```

```ts
export interface CandlOptionXAxisLabels {
  // Height of the xAxis labels area in pixels
  height: number;
}
```

### YAxis

```ts
// Set y axis options
setOptionsYAxis(options: CandlOptionYAxis): void
```

```ts
export interface CandlOptionYAxis {
  // Background color of the area.
  backgroundColor: string;
  // Font size of the price label
  labelFontSize: number;
  // Font of the price label
  labelFont: string;
  // Font color of the price label
  labelColor: string;
  // Width of the area
  width: number;
}
```

### Price Line

```ts
// Set price line options
setOptionsPriceLine(options: CandlOptionPriceLine): void
```

```ts
export interface CandlOptionPriceLine {
  // Color of the price line.
  color: string;
  // Background color of the label area.
  labelBackgroundColor: string;
  // Font of the label.
  labelFont: string;
  // Font size of the label.
  labelFontSize: number;
  // Font color of the label.
  labelColor: string;
}
```

### Cross

```ts
// Set cross options
setOptionsCross(options: CandlOptionCross): void
```

```ts
export interface CandlOptionCross {
  // Color of the lines
  color: string;
  // Thickness of the lines
  width: number;
  // Dotted value of the lines
  dotted: { value: number[] };
}
```

### Cursor

```ts
// Set cursor options
setOptionsCursor(options: CandlOptionCursor): void
```

```ts
export interface CandlOptionCursor {
  // Style of the mouse cursor
  style: CssCursorProperty;
}
```

### Line Cursor

```ts
// Set line cursor options
setOptionsLineCursor(options: CandlOptionLineCursor): void
```

```ts
export interface CandlOptionLineCursor {
  // Color of the external ring
  ringColor: string;
  // Color of the internal part
  fillColor: string;
  // Radius of the cursor
  radius: number;
  // Thickness of the external ring
  ringThickness: number;
}
```

### Common Render

```ts
// Set common render options
setOptionsRender(options: CandlOptionRenderCommon): void
```

```ts
export interface CandlOptionRenderCommon {
  // Initial width of the candle
  initialWidth: number;
  // Initial spacing between candles
  initialSpacing: number;
  // Initial candle shadow width
  initialShadowWidth: number;
  // Minimal width of the candle shadow
  shadowWidthMin: number;
  // Maximal width of the candle shadow
  shadowWidthMax: number;
}
```

### Candle Render

```ts
// Set candle render options
setOptionsCandle(options: CandlOptionRenderCandle): void
```

```ts
export interface CandlOptionRenderCandle {
  // Candle going down
  bearish: {
    // Color of the candle
    color: string;
    // Color of the shadow of the candle
    shadowColor: string;
  };
  // Candle going up
  bullish: {
    color: string;
    shadowColor: string;
  };
}
```

### Line Render

```ts
// Set line render options
setOptionsLine(options: CandlOptionRenderLine): void
```

```ts
export interface CandlOptionRenderLine {
  // Color of the line
  color: string;
  // Thickness of the line
  thickness: number;
}
```

### Area Render

```ts
// Set area render options
setOptionsArea(options: CandlOptionRenderArea): void
```

```ts
export interface CandlOptionRenderArea {
  // Line of the Area
  line: {
    // Color of the line
    color: string;
    // Thickness of the line
    thickness: number;
  };
  // Color of the area (gradient)
  area: {
    // Color at the top of the area
    topColor: string;
    // Color at the bottom of the area
    bottomColor: string;
  };
}
```

### Volume

```ts
// Set volume options
setOptionsVolume(options: CandlOptionVolume): void
```

```ts
export interface CandlOptionVolume {
  // The current candle is going down
  bearish: {
    // Color of the bar
    color: string;
  };
  // The current candle is going up
  bullish: {
    color: string;
  };
  // Height of the area reserved to Volume
  height: number;
}
```
