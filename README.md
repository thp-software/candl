<p align="center">
  <img  src="https://github.com/thp-software/candl/blob/master/assets/candl_logo.png#center">
  <h3 align="center"><i> Your Simple Candlestick Chart Lib </i></h3>
</p>
<h3 align="center">🚧 This is a prototype. Do not use it in production before v1.0.0. 🚧</h3>

<img src="https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square" alt="License">

## What is Candl ?

> Candl is a chart library that makes it easy to set up fully customizable candlestick charts.

- 💪 Plug N Play.
- 🛠️ Fully customizable.
- ⚡ Multi-Layers 2D Canvas for better performance.
- 🖱️ Mouse & Touch\* interaction built-in.
- 🎲 Mock data generators built-in.
- 🕒 Underlying [Day.js](https://www.npmjs.com/package/dayjs) for date handling.

(\*) not available yet

## Get Started

### Installation

`npm i candl --save`

## Documentation

### Full Example with Mock Data

Very basic example of a seeded chart in React with TypeScript.

```ts
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

## Code Quality

No coverage yet.

Before 1.0.0, unit tests will be a posteriori.

After it, unit tests will be a priori (TDD).

## Author

[THP-Software](https://github.com/thp-software)
