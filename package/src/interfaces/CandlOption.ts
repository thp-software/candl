import { CandlTimeFrame } from "../enums/CandlTimeFrame";

export interface CandlOption {
  timeFrame: CandlTimeFrame;
  inputs: CandlOptionInputs;
  showCross: boolean;
  showLineCursor: boolean;
  showGridX: boolean;
  showGridY: boolean;
  showYAxis: boolean;
  showPriceLine: boolean;
  showVolume: boolean;
  showXLabels: boolean;
  showHover: boolean;
  showHoverInfos: boolean;
  backgroundColor: string;
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
  handleInput: boolean;
  zoomAtCursor: boolean;
}

export interface CandlOptionGrid {
  gridMajorX: {
    color: string;
    thickness: number;
  };
  gridMinorX: {
    color: string;
    thickness: number;
  };
  gridMajorY: {
    color: string;
    thickness: number;
  };
}

export interface CandlOptionYAxis {
  backgroundColor: string;
  labelFontSize: number;
  labelFont: string;
  labelColor: string;
  width: number;
}

export interface CandlOptionXAxisLabels {
  height: number;
}

export interface CandlOptionPriceLine {
  color: string;
  labelBackgroundColor: string;
  labelFont: string;
  labelFontSize: number;
  labelColor: string;
}

export interface CandlOptionCross {
  color: string;
  width: number;
  dotted: { value: number[] };
}

export interface CandlOptionRenderCommon {
  initialWidth: number;
  initialSpacing: number;
  initialShadowWidth: number;
  shadowWidthMin: number;
  shadowWidthMax: number;
}

export interface CandlOptionRenderCandle {
  bearish: {
    color: string;
    shadowColor: string;
  };
  bullish: {
    color: string;
    shadowColor: string;
  };
}

export interface CandlOptionRenderLine {
  color: string;
  thickness: number;
}

export interface CandlOptionRenderArea {
  line: {
    color: string;
    thickness: number;
  };
  area: {
    topColor: string;
    bottomColor: string;
  };
}

export interface CandlOptionVolume {
  bearish: {
    color: string;
  };
  bullish: {
    color: string;
  };
  height: number;
}

export interface CandlOptionCursor {
  style: CssCursorProperty;
}

export interface CandlOptionLineCursor {
  ringColor: string;
  fillColor: string;
  radius: number;
  ringThickness: number;
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
