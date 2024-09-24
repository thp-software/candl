---
sidebar_position: 5
---

# Candl View

`CandlView` define the way to render a `CandlSerie` at a certain Zoom.

```ts
export interface CandlView {
  // Zoom factor from 1. <1 = zoom out, >1 = zoom in.
  zoomFactor: number;
  // Set minor grid lines every n steps
  gridXMinorSteps: number;
  // Set major grid lines every n steps
  gridXMajorSteps: number;
  // Render Mode: CandleOnly, CandleAndShadow, Line...
  renderMode: CandlRenderMode;
  // Labels to show.
  // Priority is DESC in the array.
  xLabels: CandlXLabelType[];
}
```

### xLabels

`xLabels` is an array of [CandlXLabelType](./candl_xlabeltype.md).

The orders of the element in the array change the way the x Axis labels will be drawn.

For example, if you set this array :

```ts
xLabels = [
  CandlXLabelType.LabelYear,
  CandlXLabelType.LabelMonth,
  CandlXLabelType.LabelDay,
  CandlXLabelType.LabelHour,
  CandlXLabelType.Label5Minutes,
];
```

#### With this timestamp `2024-05-01 00:00:00`

```ts
CandlXLabelType.LabelYear       NO
CandlXLabelType.LabelMonth      YES
CandlXLabelType.LabelDay        YES but lower priority -> NO
CandlXLabelType.LabelHour       YES but lower priority -> NO
CandlXLabelType.Label5Minutes   YES but lower priority -> NO
```

#### With this timestamp `2024-05-01 04:00:00`

```ts
CandlXLabelType.LabelYear       NO
CandlXLabelType.LabelMonth      NO
CandlXLabelType.LabelDay        NO
CandlXLabelType.LabelHour       YES
CandlXLabelType.Label5Minutes   YES but lower priority -> NO
```

#### With this timestamp `2024-05-01 04:30:00`

```ts
CandlXLabelType.LabelYear       NO
CandlXLabelType.LabelMonth      NO
CandlXLabelType.LabelDay        NO
CandlXLabelType.LabelHour       NO
CandlXLabelType.Label5Minutes   YES
```

#### With this timestamp `2024-05-01 04:37:00`

Nothing will be draw here

```ts
CandlXLabelType.LabelYear       NO
CandlXLabelType.LabelMonth      NO
CandlXLabelType.LabelDay        NO
CandlXLabelType.LabelHour       NO
CandlXLabelType.Label5Minutes   NO
```

<!-- If the timestamp of the candle is `2024-05-01 00:00:00`, `CandlXLabelType.LabelMonth` will be choose, as the timestamp happen to be the first of the month AND not the first of the year.

The others types have lower priority due to their position in the array.

If the timestamp of the candle is `2024-05-01 04:00:00`, `CandlXLabelType.LabelHour` will be choose, as the timestamp happen to be the first of the hour AND not the first of the day/month/year.

If the timestamp of the candle is `2024-05-01 04:05:00`, `CandlXLabelType.Label5Minutes` will be choose, as the timestamp happen to be a multiple of 5 minutes AND not the first of the hour/day/month/year. -->
