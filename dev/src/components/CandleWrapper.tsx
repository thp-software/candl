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

      // Add default 1M base views to this serie
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
