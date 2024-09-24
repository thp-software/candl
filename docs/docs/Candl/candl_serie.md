---
sidebar_position: 4
---

# Candl Serie

## Installation

```ts
npm i candl
```

## Explanation

In this example, we will see how to setup a basic Candl chart.

It will introduce you to some concepts of the library.

### CandlSerie

We will first create a Serie with a TimeFrame (1M in this case) and a Symbol.
The symbol is optional and is the abbrevation of a company/index stock.

A CandlSerie also contain an array of CandlData and an array of CandlView.

#### CandlData

A CandlData is a simple interface that define all the data needed for a one candle.

#### CandlView

A CandlView define the way to render the chart on the screen.
It contain (among others) a zoom factor and a type of render (Candle, Line, Area, ...).
You typically iterate through the array of CandlView with Mouse Wheel.

### Update

Update (or Redrawing) the chart is handle by the library based on inputs event.

But not when a serie data or views are set.

So in this case we need to forceUpdate.

`forceUpdate()` Redraw every elements of the chart.

## Code

This is a React Component using Candl.

```ts
import { useEffect, useRef } from "react";
import {
  Candl,
  CandlMock,
  CandlSerie,
  CandlTimeFrame,
  get1MBaseViews,
} from "candl";

const CandlWrapper: React.FC = () => {
  // Reference to the container of the chart
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Reference to the chart
  const candlRef = useRef<Candl | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      // Create the chart
      candlRef.current = new Candl(containerRef.current);

      // Create a serie for 1M TimeFrame
      const mySerie: CandlSerie = new CandlSerie(CandlTimeFrame.Time1Minute);

      // Add mocked data with 10 000 candles
      mySerie.setData(
        CandlMock.generateMockData(CandlTimeFrame.Time1Minute, 10000)
      );

      // Add default 1M base views to the serie
      mySerie.setViews(get1MBaseViews());

      // Add serie to Candl
      candlRef.current.addSerie(CandlTimeFrame.Time1Minute, mySerie);

      // Jump to the end of the chart
      candlRef.current.setOffset({
        x: candlRef.current.getLastCandleOffset(),
        y: candlRef.current.getOffset().y,
      });

      // Force update of the chart
      candlRef.current.forceUpdate();
    }

    return () => {
      // Don't forget to clean the chart
      if (candlRef.current != null) {
        candlRef.current.clean();
      }
    };
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
      }}
      ref={containerRef}
    />
  );
};
export default CandlWrapper;
```
