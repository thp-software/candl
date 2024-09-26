import { CandlTimeFrame } from "../enums/CandlTimeFrame";

export interface CandlOption {
  timeFrame: CandlTimeFrame;
  show: CandlOptionShow;
  general: CandlOptionGeneral;
  inputs: CandlOptionInputs;
  grid: CandlOptionGrid;
  xAxis: CandlOptionXAxisLabels;
  yAxis: CandlOptionYAxis;
  priceLine: CandlOptionPriceLine;
  cross: CandlOptionCross;
  cursor: CandlOptionCursor;
  lineCursor: CandlOptionLineCursor;
  commonRender: CandlOptionRenderCommon;
  candleRender: CandlOptionRenderCandle;
  lineRender: CandlOptionRenderLine;
  areaRender: CandlOptionRenderArea;
  volume: CandlOptionVolume;
}

export interface CandlOptionInputs {
  // Enable / Disable inputs handling
  handleInput: boolean;
  // Zoom at the position of the mouse cursor
  zoomAtCursor: boolean;
}

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
  // Target steps for y axis
  targetSteps: number;
}

export interface CandlOptionXAxisLabels {
  // Height of the xAxis labels area in pixels
  height: number;
}

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

export interface CandlOptionCross {
  // Color of the lines
  color: string;
  // Thickness of the lines
  width: number;
  // Dotted value of the lines
  dotted: { value: number[] };
}

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

export interface CandlOptionRenderLine {
  // Color of the line
  color: string;
  // Thickness of the line
  thickness: number;
}

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

export interface CandlOptionCursor {
  // Style of the mouse cursor
  style: CssCursorProperty;
}

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

export interface CandlOptionGeneral {
  // Background color of the chart
  backgroundColor: string;
}

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

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type CssCursorProperty =
  | "auto"
  | "default"
  | "none"
  | "context-menu"
  | "help"
  | "pointer"
  | "progress"
  | "wait"
  | "cell"
  | "crosshair"
  | "text"
  | "vertical-text"
  | "alias"
  | "copy"
  | "move"
  | "no-drop"
  | "not-allowed"
  | "grab"
  | "grabbing"
  | "all-scroll"
  | "col-resize"
  | "row-resize"
  | "n-resize"
  | "e-resize"
  | "s-resize"
  | "w-resize"
  | "ne-resize"
  | "nw-resize"
  | "se-resize"
  | "sw-resize"
  | "ew-resize"
  | "ns-resize"
  | "nesw-resize"
  | "nwse-resize"
  | "zoom-in"
  | "zoom-out"
  | `url(${string}), auto`;
