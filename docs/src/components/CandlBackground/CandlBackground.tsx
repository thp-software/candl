import { useEffect, useRef } from "react";
import {
  Candl,
  CandlData,
  CandlMock,
  CandlOption,
  CandlRenderMode,
  CandlSerie,
  CandlTimeFrame,
  CandlXLabelType,
  get1MBaseViews,
} from "candl";
import { useColorMode } from "@docusaurus/theme-common";

const CandlWrapper: React.FC = () => {
  const { colorMode, setColorMode } = useColorMode();

  // Reference to the container of the chart
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Reference to the chart
  const candlRef = useRef<Candl | null>(null);

  const getLightTheme = (): CandlOption => {
    return {
      inputs: {
        handleInput: false,
        zoomAtCursor: true,
      },
      timeFrame: CandlTimeFrame.Time1Minute,
      show: {
        cross: false,
        lineCursor: false,
        priceLine: false,
        volume: true,
        gridY: true,
        gridX: true,
        yAxis: false,
        xLabels: true,
        hover: false,
        hoverInfos: false,
      },
      general: {
        backgroundColor: "#f9f9f9",
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
          color: "#e9e9e9",
          thickness: 1,
        },
        gridMinorX: {
          color: "#f0f0f0",
          thickness: 1,
        },
        gridMajorY: {
          color: "#e9e9e9",
          thickness: 1,
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
  };

  const getDarkTheme = (): CandlOption => {
    return {
      inputs: {
        handleInput: true,
        zoomAtCursor: true,
      },
      timeFrame: CandlTimeFrame.Time1Minute,
      show: {
        cross: false,
        lineCursor: false,
        priceLine: false,
        volume: true,
        gridY: true,
        gridX: true,
        yAxis: false,
        xLabels: true,
        hover: false,
        hoverInfos: false,
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
  };

  let needToFeed: boolean = true;

  useEffect(() => {
    if (containerRef.current) {
      // Create the chart
      candlRef.current = new Candl(containerRef.current);
      candlRef.current.setOptions(getDarkTheme());

      // Create a serie for 1M TimeFrame
      const mySerie: CandlSerie = new CandlSerie(CandlTimeFrame.Time1Minute);

      mySerie.setViews([
        {
          zoomFactor: 1,
          renderMode: CandlRenderMode.CandleAndShadow,
          gridXMinorSteps: 5,
          gridXMajorSteps: 20,
          xLabels: [
            CandlXLabelType.LabelYear,
            CandlXLabelType.LabelMonth,
            CandlXLabelType.LabelDay,
            CandlXLabelType.LabelHour,
            CandlXLabelType.Label5Minutes,
          ],
        },
      ]);

      // Add mocked data with 10 000 candles
      mySerie.setData(
        CandlMock.generateMockData(CandlTimeFrame.Time1Minute, 10000)
      );

      // Add serie to Candl
      candlRef.current.addSerie(CandlTimeFrame.Time1Minute, mySerie);

      // Jump to the end of the chart
      candlRef.current.setOffset({
        x: candlRef.current.getLastCandleOffset(),
        y: candlRef.current.getOffset().y,
      });

      let data: CandlData[] = CandlMock.generateMockData(
        CandlTimeFrame.Time1Minute,
        100000
      );

      candlRef.current.getSerie(CandlTimeFrame.Time1Minute)?.appendData(data);

      candlRef.current.setOffset({
        x: candlRef.current.getLastCandleOffset(),
        y: candlRef.current.getOffset().y,
      });

      (async () => {
        if (candlRef.current) {
          let lastCandle: CandlData = CandlMock.generateMockDataOneByOne(
            CandlTimeFrame.Time1Minute,
            true,
            data[data.length - 1]
          );
          candlRef.current
            .getSerie(CandlTimeFrame.Time1Minute)
            .appendData([lastCandle]);

          let i = 0;
          let j = 0;
          while (needToFeed) {
            i += 16;
            j += 16;
            if (i >= 1000) {
              i = 0;
              lastCandle = CandlMock.generateMockDataOneByOne(
                CandlTimeFrame.Time1Minute,
                true,
                lastCandle
              );
              candlRef.current
                .getSerie(CandlTimeFrame.Time1Minute)
                ?.appendData([lastCandle]);
              candlRef.current.setOffset({
                x: candlRef.current.getLastCandleOffset(),
                y: candlRef.current.getOffset().y,
              });
            } else if (j >= 16) {
              j = 0;
              lastCandle = CandlMock.generateMockCandleTick(lastCandle);
              // candlRef.current.setLastCandleData(lastCandle);
              candlRef.current
                .getSerie(CandlTimeFrame.Time1Minute)
                ?.setLastData(lastCandle);
            }
            candlRef.current.forceUpdate();
            await new Promise((resolve) => setTimeout(resolve, 16));
          }
        }
      })();
    }

    return () => {
      // Don't forget to clean the chart
      if (candlRef.current != null) {
        candlRef.current.clean();
      }
    };
  }, []);

  useEffect(() => {
    if (candlRef.current) {
      if (colorMode === "light") {
        candlRef.current.setOptions(getLightTheme());
      } else if (colorMode === "dark") {
        candlRef.current.setOptions(getDarkTheme());
      }
      candlRef.current.forceUpdate();
    }
  }, [colorMode]);

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
