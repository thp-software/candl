import { CandlTimeFrame } from "../enums/CandlTimeFrame";
import { CandlOption } from "../interfaces/CandlOption";

export const getBaseOptions = (): CandlOption => {
  return {
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
      targetSteps: 10,
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
