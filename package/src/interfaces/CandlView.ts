import { CandlRenderMode } from "../enums/CandlRender";
import { CandlXLabelType } from "../enums/CandlXLabelType";

/**
 * View  of the chart.
 */
export interface CandlView {
  /**
   * Zoom factor from 1. <1 = zoom out, >1 = zoom in.
   */
  zoomFactor: number;
  /**
   * Set minor grid lines every n steps
   */
  gridXMinorSteps: number;
  /**
   * Set major grid lines every n steps
   */
  gridXMajorSteps: number;
  /**
   * Render Mode: CandleOnly, CandleAndShadow, Line...
   */
  renderMode: CandlRenderMode;
  /**
   * Labels to show.
   * Priority is DESC in the array.
   * That mean that the first will erase the second.
   */
  xLabels: CandlXLabelType[];
}
