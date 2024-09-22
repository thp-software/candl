import dayjs, { Dayjs } from "dayjs";

import { CandlVector2 } from "./interfaces/CandlVector2";
import { CandlData } from "./interfaces/CandlData";
import { CandlXLabelOptions } from "./interfaces/CandlXLabelOptions";
import {
  CandlOption,
  CandlOptionCross,
  CandlOptionCursor,
  CandlOptionGrid,
  CandlOptionInputs,
  CandlOptionPriceLine,
  CandlOptionRenderArea,
  CandlOptionRenderCandle,
  CandlOptionRenderCommon,
  CandlOptionRenderLine,
  CandlOptionXAxisLabels,
  CandlOptionYAxis,
  DeepPartial,
} from "./interfaces/CandlOption";
import { CandlTimeFrame } from "./enums/CandlTimeFrame";
import { getBaseXLabels } from "./data/BaseXLabels";
import { CandlRenderMode } from "./enums/CandlRender";
import { CandlTime } from "./helpers/CandlTime";
import { CandlHelper } from "./helpers/CandlHelper";
import { CandlDraw } from "./CandlDraw";
import { getBaseOptions } from "./data/BaseOptions";
import { CandlSerie } from "./CandlSerie";

/**
 * Main class of Candl. Handle Inputs and Updates
 */
export class Candl {
  private options: CandlOption;

  private canvasDensity: number = 1.5;

  private currentTimeFrame: CandlTimeFrame = CandlTimeFrame.Time1Minute;

  private series: Map<CandlTimeFrame, CandlSerie>;

  private xLabelOptions: CandlXLabelOptions[] = [];

  private offset: CandlVector2 = { x: 0, y: 0 };

  private container: HTMLDivElement;

  /**
   * For Grid and background
   */
  private gridCanvas: HTMLCanvasElement | null = null;
  private gridCanvasContext: CanvasRenderingContext2D | null = null;

  /**
   * For chart objects
   */
  private chartCanvas: HTMLCanvasElement | null = null;
  private chartCanvasContext: CanvasRenderingContext2D | null = null;

  /**
   * For user interface
   */
  private uiCanvas: HTMLCanvasElement | null = null;
  private uiCanvasContext: CanvasRenderingContext2D | null = null;

  /**
   * For user input, mouse / touch
   */
  private inputCanvas: HTMLCanvasElement | null = null;
  private inputCanvasContext: CanvasRenderingContext2D | null = null;

  private candleWidth: number = 0;
  private candleSpacing: number = 0;
  private candleShadowWidth: number = 0;

  private firstCandleIndex: number = 0;
  private lastCandleIndex: number = 0;

  private mouseLocal: CandlVector2 = { x: 0, y: 0 };

  private startDrag: CandlVector2 = { x: 0, y: 0 };
  private isDragging: boolean = false;

  private minValue: number = 0;
  private maxValue: number = 0;

  private yValues: number[] = [];

  // private startUpdateTime: number = 0;
  // private updateTime: number = 0;

  private hoveredIndex: number = -1;
  private isMouseIn: boolean = false;

  private candleViewsStartOffset: CandlVector2;
  private candleViewsEndOffset: CandlVector2;

  constructor(container: HTMLDivElement) {
    this.container = container;
    this.series = new Map<CandlTimeFrame, CandlSerie>();

    this.setupCanvases(this.container);

    this.options = getBaseOptions();
    this.xLabelOptions = getBaseXLabels();

    this.candleViewsStartOffset = { x: 0, y: 10 };
    this.candleViewsEndOffset = { x: 0, y: 10 };

    this.bindEvents();

    // Force a first onResize
    this.onResize();

    this.updateInputCanvas();
  }

  private bindEvents(): void {
    if (this.inputCanvas) {
      // Mouse
      this.inputCanvas.addEventListener(
        "mousemove",
        this.onMouseMove.bind(this)
      );
      this.inputCanvas.addEventListener(
        "mousedown",
        this.onMouseDown.bind(this)
      );
      this.inputCanvas.addEventListener("mouseup", this.onMouseUp.bind(this));
      this.inputCanvas.addEventListener("wheel", this.onMouseWheel.bind(this), {
        passive: true,
      });
      this.inputCanvas.addEventListener(
        "mouseleave",
        this.onMouseLeave.bind(this)
      );

      // Touch
      this.inputCanvas.addEventListener(
        "touchmove",
        this.onTouchMove.bind(this)
      );
      this.inputCanvas.addEventListener(
        "touchstart",
        this.onTouchDown.bind(this)
      );
      this.inputCanvas.addEventListener("touchend", this.onTouchUp.bind(this));
      this.inputCanvas.addEventListener(
        "touchcancel",
        this.onTouchLeave.bind(this)
      );

      // Other
      // window.addEventListener("resize", this.onResize.bind(this));

      this.resizeObserver.observe(this.container);

      this.inputCanvas.addEventListener("contextmenu", (e) => {
        e.preventDefault();
      });
    }
  }

  private resizeObserver = new ResizeObserver((entries) => {
    for (let entry of entries) {
      console.log(entry.contentRect.width);
      this.onResize();
    }
  });

  public clean(): void {
    if (this.uiCanvas) {
      // Mouse
      this.uiCanvas.removeEventListener("mousemove", this.onMouseMove);
      this.uiCanvas.removeEventListener("mousedown", this.onMouseDown);
      this.uiCanvas.removeEventListener("mouseup", this.onMouseUp);
      this.uiCanvas.removeEventListener("wheel", this.onMouseWheel);
      this.uiCanvas.removeEventListener("mouseleave", this.onMouseLeave);

      // Touch
      this.uiCanvas.removeEventListener(
        "touchmove",
        this.onTouchMove.bind(this)
      );
      this.uiCanvas.removeEventListener(
        "touchstart",
        this.onTouchDown.bind(this)
      );
      this.uiCanvas.removeEventListener("touchend", this.onTouchUp.bind(this));
      this.uiCanvas.removeEventListener(
        "touchcancel",
        this.onTouchLeave.bind(this)
      );

      // Other
      this.uiCanvas.removeEventListener("contextmenu", () => {});
      window.removeEventListener("resize", this.onResize);

      this.resizeObserver.unobserve(this.container);
    }

    this.gridCanvas?.remove();
    this.chartCanvas?.remove();
    this.uiCanvas?.remove();
    this.inputCanvas?.remove();

    // Clear data
    this.series.forEach((serie) => serie.clearData());
  }

  /**
   * Setup canvases for Candl chart
   * @param {HTMLDivElement} container - Parent div of the chart
   */
  private setupCanvases(container: HTMLDivElement): void {
    this.gridCanvas = document.createElement("canvas");
    this.gridCanvas.style.width = "100%";
    this.gridCanvas.style.height = "100%";
    this.gridCanvas.width = this.gridCanvas.offsetWidth;
    this.gridCanvas.height = this.gridCanvas.offsetHeight;
    this.gridCanvas.style.zIndex = `${1}`;
    this.gridCanvas.style.position = "absolute";
    container.appendChild(this.gridCanvas);

    this.gridCanvasContext = this.gridCanvas.getContext("2d");

    this.chartCanvas = document.createElement("canvas");
    this.chartCanvas.style.width = "100%";
    this.chartCanvas.style.height = "100%";
    this.chartCanvas.width = this.chartCanvas.offsetWidth;
    this.chartCanvas.height = this.chartCanvas.offsetHeight;
    this.chartCanvas.style.zIndex = `${2}`;
    this.chartCanvas.style.position = "absolute";
    container.appendChild(this.chartCanvas);

    this.chartCanvasContext = this.chartCanvas.getContext("2d");

    this.uiCanvas = document.createElement("canvas");
    this.uiCanvas.style.width = "100%";
    this.uiCanvas.style.height = "100%";
    this.uiCanvas.width = this.uiCanvas.offsetWidth;
    this.uiCanvas.height = this.uiCanvas.offsetHeight;
    this.uiCanvas.style.zIndex = `${3}`;
    this.uiCanvas.style.position = "absolute";
    container.appendChild(this.uiCanvas);

    this.uiCanvasContext = this.uiCanvas.getContext("2d");

    this.inputCanvas = document.createElement("canvas");
    this.inputCanvas.style.width = "100%";
    this.inputCanvas.style.height = "100%";
    this.inputCanvas.width = this.inputCanvas.offsetWidth;
    this.inputCanvas.height = this.inputCanvas.offsetHeight;
    this.inputCanvas.style.zIndex = `${4}`;
    this.inputCanvas.style.position = "absolute";
    container.appendChild(this.inputCanvas);

    this.inputCanvasContext = this.inputCanvas.getContext("2d");
  }

  public getActiveSerie(): CandlSerie | undefined {
    return this.series.get(this.currentTimeFrame);
  }

  public getSerie(type: CandlTimeFrame): CandlSerie | undefined {
    return this.series.get(type);
  }

  public addSerie(type: CandlTimeFrame, serie: CandlSerie): void {
    this.series.set(type, serie);
  }

  public removeSerie(type: CandlTimeFrame) {
    this.series.delete(type);
  }

  /**
   * Set the active time frame of the chart. It also reset the zoom
   * @param {CandlTimeFrame} type - The new time frame of the chart
   * @returns {void}
   */
  public setActiveTimeFrame(type: CandlTimeFrame): void {
    this.currentTimeFrame = type;

    // Jump to same timestamp
  }

  /**
   * Return the active time frame of the chart
   * @returns {CandlTimeFrame}
   */
  public getActiveTimeFrame(): CandlTimeFrame {
    return this.currentTimeFrame;
  }

  /**
   * Get the offset of the canvas (from the bottom left of the chart)
   * @param {CandlVector2} offset - in pixels
   * @returns {void}
   */
  public getOffset(): CandlVector2 {
    return this.offset;
  }

  /**
   * Set the offset of the canvas (from the bottom left of the chart)
   * @param {CandlVector2} offset - in pixels
   * @returns {void}
   */
  public setOffset(offset: CandlVector2): void {
    this.offset = {
      x: CandlHelper.getPixelPerfectNumber(offset.x),
      y: CandlHelper.getPixelPerfectNumber(offset.y),
    };
  }

  private update() {
    this.commonUpdate();
    this.updateGridCanvas();
    this.updateChartCanvas();
    this.updateUiCanvas();
  }

  /**
   * Update Canvas, Grid layer.
   * Update Background, Grid X and Grid Y.
   */
  private updateGridCanvas() {
    if (this.gridCanvas && this.gridCanvasContext) {
      CandlDraw.clearCanvas(this.gridCanvas, this.gridCanvasContext);

      CandlDraw.fillRect(
        this.gridCanvasContext,
        { x: 0, y: 0 },
        { x: this.gridCanvas.width, y: this.gridCanvas.height },
        this.options.backgroundColor,
        this.canvasDensity
      );

      if (this.options.showGridX) {
        this.updateGridX();
      }
      if (this.options.showGridY) {
        this.updateGridY();
      }
    }
  }

  /**
   * Update Canvas, Chart layer.
   * Update Chart, X Labels and Volume.
   */
  private updateChartCanvas() {
    if (this.chartCanvas && this.chartCanvasContext) {
      CandlDraw.clearCanvas(this.chartCanvas, this.chartCanvasContext);

      this.updateChart();
      this.updateXLabels();
      this.updateVolumes();
    }
  }

  /**
   * Update Canvas, UI layer.
   * Update LineCursor, Y axis, PriceLine, Cross and Hover Infos.
   */
  private updateUiCanvas() {
    const activeSerie: CandlSerie | undefined = this.series.get(
      this.currentTimeFrame
    );

    if (this.uiCanvas && this.uiCanvasContext && activeSerie) {
      CandlDraw.clearCanvas(this.uiCanvas, this.uiCanvasContext);
      if (
        activeSerie.getActiveView().renderMode === CandlRenderMode.Line ||
        activeSerie.getActiveView().renderMode === CandlRenderMode.Area
      ) {
        this.updateLineCursor();
      }

      if (this.options.showYAxis) {
        this.updateYAxis();
      }

      if (this.options.showPriceLine) {
        this.updatePriceLine();
      }

      if (this.options.showCross) {
        this.updateCross();
      }

      // if (this.options.showHover) {
      //   this.drawHover();
      // }

      if (
        this.options.showHoverInfos &&
        this.hoveredIndex >= 0 &&
        this.hoveredIndex < activeSerie.getDataCount()
      ) {
        CandlDraw.drawHoverInfos(
          this.uiCanvas,
          this.uiCanvasContext,
          activeSerie.getDataByIndex(this.hoveredIndex),
          this.mouseLocal,
          this.options.yAxis.width,
          this.options.xAxis.height,
          this.canvasDensity
        );
      }
    }

    if (this.uiCanvas && this.uiCanvasContext && activeSerie) {
      this.uiCanvasContext.fillStyle = "red";
      // this.uiCanvasContext.fillRect(
      //   this.hoveredIndex *
      //     (this.candleWidth + this.candleSpacing) *
      //     this.canvasDensity -
      //     this.offset.x * this.canvasDensity +
      //     7.8 * activeSerie.getActiveView().zoomFactor,
      //   0,
      //   1,
      //   this.uiCanvas.height
      // );
    }
  }

  /**
   * Update Canvas, Input layer.
   * Only update the type of cursor.
   */
  private updateInputCanvas() {
    if (this.inputCanvas) {
      this.inputCanvas.style.cursor = this.options.cursor.style;
    }
  }

  /**
   * Force update of the chart
   */
  public forceUpdate(): void {
    this.update();
  }

  /**
   * General Update.
   * Update the size of objects according to active view.
   * It also calcul the first and last CandlData to draw, and other stuff.
   */
  private commonUpdate(): void {
    if (this.gridCanvas) {
      const activeSerie: CandlSerie | undefined = this.series.get(
        this.currentTimeFrame
      );

      if (activeSerie) {
        this.candleWidth =
          this.options.commonRender.initialWidth *
          activeSerie.getActiveView().zoomFactor;
        this.candleSpacing =
          this.options.commonRender.initialSpacing *
          activeSerie.getActiveView().zoomFactor;
        this.candleShadowWidth =
          this.options.commonRender.initialShadowWidth *
          activeSerie.getActiveView().zoomFactor;
        this.candleShadowWidth = Math.max(
          this.candleShadowWidth,
          this.options.commonRender.shadowWidthMin
        );
        this.candleShadowWidth = Math.min(
          this.candleShadowWidth,
          this.options.commonRender.shadowWidthMax
        );

        this.firstCandleIndex = Math.floor(
          this.offset.x / (this.candleWidth + this.candleSpacing)
        );
        this.lastCandleIndex = Math.floor(
          this.offset.x / (this.candleWidth + this.candleSpacing) +
            this.gridCanvas.width /
              this.canvasDensity /
              (this.candleWidth + this.candleSpacing) +
            200
        );

        if (this.firstCandleIndex < 0) {
          this.firstCandleIndex = 0;
        }

        if (this.lastCandleIndex >= activeSerie.getDataCount()) {
          this.lastCandleIndex = activeSerie.getDataCount() - 1;
        }

        this.minValue = Infinity;
        this.maxValue = -Infinity;

        let x = -this.offset;

        for (let i = this.firstCandleIndex; i <= this.lastCandleIndex; i++) {
          if (i < 0) {
            continue;
          }
          if (i >= activeSerie.getDataCount()) {
            break;
          }

          x = -this.offset.x + i * (this.candleWidth + this.candleSpacing);
          if (
            x + this.candleWidth < 0 ||
            x >
              this.gridCanvas.width -
                (this.options.showYAxis
                  ? this.options.yAxis.width * this.canvasDensity
                  : 0)
          )
            continue;

          this.minValue = Math.min(
            this.minValue,
            activeSerie.getDataByIndex(i).l
          );
          this.maxValue = Math.max(
            this.maxValue,
            activeSerie.getDataByIndex(i).h
          );
        }
      }
    }
  }

  /**
   * Logic to update Grid X
   */
  private updateGridX() {
    const activeSerie: CandlSerie | undefined = this.series.get(
      this.currentTimeFrame
    );

    if (this.gridCanvas && this.gridCanvasContext && activeSerie) {
      const viewFirstIndex = Math.round(
        this.offset.x / (this.candleWidth + this.candleSpacing)
      );

      const viewLastIndex = Math.round(
        this.offset.x / (this.candleWidth + this.candleSpacing) +
          this.gridCanvas.width / (this.candleWidth + this.candleSpacing)
      );

      for (let i = viewFirstIndex; i < viewLastIndex; i++) {
        const x =
          -this.offset.x +
          i * (this.candleWidth + this.candleSpacing) +
          this.candleWidth / 2;

        if (i % activeSerie.getActiveView().gridXMajorSteps === 0) {
          this.gridCanvasContext.strokeStyle =
            this.options.grid.gridMajorX.color;

          CandlDraw.drawXGridLine(
            this.gridCanvasContext,
            { x, y: 0 },
            this.gridCanvas.height,
            this.options.grid.gridMajorX.thickness,
            this.options.grid.gridMajorX.color,
            this.canvasDensity
          );
        } else if (i % activeSerie.getActiveView().gridXMinorSteps === 0) {
          this.gridCanvasContext.strokeStyle =
            this.options.grid.gridMinorX.color;

          CandlDraw.drawXGridLine(
            this.gridCanvasContext,
            { x, y: 0 },
            this.gridCanvas.height,
            this.options.grid.gridMinorX.thickness,
            this.options.grid.gridMinorX.color,
            this.canvasDensity
          );
        }
      }
    }
  }

  /**
   * Logic to update Grid Y
   */
  private updateGridY() {
    if (this.gridCanvasContext && this.gridCanvas) {
      const range = this.maxValue - this.minValue;
      const roughStep =
        range / Math.floor(this.gridCanvas.height / this.canvasDensity / 100);
      const stepMagnitude = Math.pow(10, Math.floor(Math.log10(roughStep)));
      const refinedStep = Math.ceil(roughStep / stepMagnitude) * stepMagnitude;

      const startValue = Math.floor(this.minValue / refinedStep) * refinedStep;
      const endValue = Math.ceil(this.maxValue / refinedStep) * refinedStep;

      this.yValues = [];

      for (let yValue = startValue; yValue <= endValue; yValue += refinedStep) {
        const yPos = this.scaleY(yValue);

        this.yValues.push(yValue);

        CandlDraw.drawYGridLine(
          this.gridCanvasContext,
          { x: 0, y: yPos },
          this.gridCanvas.width - this.options.yAxis.width,
          this.options.grid.gridMajorY.thickness,
          this.options.grid.gridMajorY.color,
          this.canvasDensity
        );
      }
    }
  }

  /**
   * Logic to update Y Axis
   */
  private updateYAxis() {
    if (this.uiCanvasContext && this.uiCanvas) {
      const yAxisX = this.uiCanvas.width;

      this.uiCanvasContext.fillStyle = this.options.yAxis.backgroundColor;

      this.uiCanvasContext.fillRect(
        CandlHelper.getPixelPerfectNumber(yAxisX - this.options.yAxis.width),
        0,
        CandlHelper.getPixelPerfectNumber(this.options.yAxis.width),
        this.uiCanvas.height
      );

      this.uiCanvasContext.strokeStyle = "#fff";
      this.uiCanvasContext.lineWidth = 1;

      this.uiCanvasContext.beginPath();
      this.uiCanvasContext.moveTo(
        CandlHelper.getPixelPerfectNumber(
          this.uiCanvas.width - this.options.yAxis.width
        ),
        0
      );
      this.uiCanvasContext.lineTo(
        CandlHelper.getPixelPerfectNumber(
          this.uiCanvas.width - this.options.yAxis.width
        ),
        this.uiCanvas.height
      );
      this.uiCanvasContext.stroke();

      this.uiCanvasContext.textAlign = "left";
      this.uiCanvasContext.textBaseline = "middle";
      this.uiCanvasContext.fillStyle = this.options.yAxis
        ? this.options.yAxis.labelColor
        : "#fff";
      this.uiCanvasContext.font = CandlHelper.getFont(
        this.options.yAxis.labelFontSize,
        this.options.yAxis.labelFont,
        this.canvasDensity
      );

      for (let i = 0; i < this.yValues.length; i++) {
        const yPos = this.scaleY(this.yValues[i]);
        this.uiCanvasContext.beginPath();
        this.uiCanvasContext.moveTo(
          this.uiCanvas.width - this.options.yAxis.width - 5,
          CandlHelper.getPixelPerfectNumber(yPos)
        );
        this.uiCanvasContext.lineTo(
          this.uiCanvas.width - this.options.yAxis.width + 5,
          CandlHelper.getPixelPerfectNumber(yPos)
        );
        this.uiCanvasContext.stroke();
        this.uiCanvasContext.fillText(
          this.yValues[i].toFixed(4),
          CandlHelper.getPixelPerfectNumber(
            this.uiCanvas.width - this.options.yAxis.width + 10
          ),
          CandlHelper.getPixelPerfectNumber(yPos)
        );
      }
    }
  }

  /**
   * Logic to update Chart
   */
  private updateChart() {
    if (this.chartCanvasContext) {
      const activeSerie: CandlSerie | undefined = this.series.get(
        this.currentTimeFrame
      );

      if (activeSerie) {
        for (let i = this.firstCandleIndex; i <= this.lastCandleIndex; i++) {
          const x =
            -this.offset.x + i * (this.candleWidth + this.candleSpacing);
          const openY = this.scaleY(activeSerie.getDataByIndex(i).o);
          const closeY = this.scaleY(activeSerie.getDataByIndex(i).c);
          const highY = this.scaleY(activeSerie.getDataByIndex(i).h);
          const lowY = this.scaleY(activeSerie.getDataByIndex(i).l);

          if (i === this.firstCandleIndex) {
            if (
              activeSerie.getActiveView().renderMode === CandlRenderMode.Line
            ) {
              CandlDraw.drawLineOpen(
                this.chartCanvasContext,
                { x: x + this.candleWidth / 2, y: closeY },
                this.options.lineRender,
                this.canvasDensity
              );
              continue;
            }
            if (
              activeSerie.getActiveView().renderMode === CandlRenderMode.Area
            ) {
              CandlDraw.drawAreaOpen(
                this.chartCanvasContext,
                { x: x + this.candleWidth / 2, y: closeY },
                this.options.areaRender,
                this.canvasDensity
              );
              continue;
            }
          }

          if (i === this.lastCandleIndex) {
            if (
              activeSerie.getActiveView().renderMode === CandlRenderMode.Line
            ) {
              CandlDraw.drawLineClose(
                this.chartCanvasContext,
                { x: x + this.candleWidth / 2, y: closeY },
                {
                  x:
                    -this.offset.x +
                    this.firstCandleIndex *
                      (this.candleWidth + this.candleSpacing) +
                    this.candleWidth / 2,
                  y: closeY,
                },
                this.canvasDensity
              );
              continue;

              // this.chartCanvasContext.stroke();
            }
            if (
              activeSerie.getActiveView().renderMode === CandlRenderMode.Area
            ) {
              if (this.chartCanvas) {
                CandlDraw.drawAreaClose(
                  this.chartCanvasContext,
                  { x: x + this.candleWidth / 2, y: closeY },
                  this.options.areaRender,
                  -this.offset.x +
                    this.firstCandleIndex *
                      (this.candleWidth + this.candleSpacing),
                  -this.offset.x +
                    this.lastCandleIndex *
                      (this.candleWidth + this.candleSpacing) +
                    this.candleWidth,
                  this.chartCanvas.height,
                  this.canvasDensity
                );
              }

              continue;
            }
          }

          switch (activeSerie.getActiveView().renderMode) {
            case CandlRenderMode.CandleAndShadow:
              CandlDraw.drawCandleWithShadow(
                this.chartCanvasContext,
                { x, y: openY },
                { x: this.candleWidth, y: closeY - openY },
                {
                  x: x + this.candleWidth / 2 - this.candleShadowWidth / 2,
                  y: lowY,
                },
                { x: this.candleShadowWidth, y: highY - lowY },
                activeSerie.getDataByIndex(i),
                this.options.candleRender,
                this.canvasDensity
              );
              break;
            case CandlRenderMode.CandleOnly:
              CandlDraw.drawCandle(
                this.chartCanvasContext,
                { x, y: openY },
                { x: this.candleWidth, y: closeY - openY },
                activeSerie.getDataByIndex(i),
                this.options.candleRender,
                this.canvasDensity
              );
              break;
            case CandlRenderMode.MinifiedCandle:
              CandlDraw.drawMinifiedCandle(
                this.chartCanvasContext,
                { x, y: lowY },
                { x: this.candleWidth / 4, y: highY - lowY },
                activeSerie.getDataByIndex(i),
                this.options.candleRender,
                this.canvasDensity
              );
              break;
            case CandlRenderMode.Line:
              CandlDraw.drawLineContinue(
                this.chartCanvasContext,
                {
                  x: x + this.candleWidth / 2,
                  y: closeY,
                },
                this.canvasDensity
              );
              break;
            case CandlRenderMode.Area:
              CandlDraw.drawAreaContinue(
                this.chartCanvasContext,
                {
                  x: x + this.candleWidth / 2,
                  y: closeY,
                },
                this.canvasDensity
              );
              break;
          }
        }
      }
    }
  }

  /**
   * Logic to update X Labels
   */
  private updateXLabels() {
    if (this.chartCanvasContext) {
      const activeSerie: CandlSerie | undefined = this.series.get(
        this.currentTimeFrame
      );

      if (activeSerie) {
        for (let i = this.firstCandleIndex; i < this.lastCandleIndex; i++) {
          if (i < 0) {
            continue;
          }
          if (i >= activeSerie.getDataCount()) {
            break;
          }

          const x =
            -this.offset.x + i * (this.candleWidth + this.candleSpacing);

          this.getXLabelText(
            x,
            dayjs(activeSerie.getDataByIndex(i).t),
            activeSerie.getDataByIndex(i).t
          );
        }
      }
    }
  }

  private getXLabelText(x: number, date: Dayjs, timestamp: number) {
    const activeSerie: CandlSerie | undefined = this.series.get(
      this.currentTimeFrame
    );

    if (activeSerie) {
      for (let i = 0; i < activeSerie.getActiveView().xLabels.length; i++) {
        const label = activeSerie.getActiveView().xLabels[i];

        const step = CandlTime.isDateOfType(label, date);

        if (step && this.chartCanvas && this.chartCanvasContext) {
          CandlDraw.drawXLabel(
            this.chartCanvasContext,
            {
              x: x + this.candleWidth / 2,
              y: this.chartCanvas.height - this.options.xAxis.height,
            },
            timestamp,
            this.xLabelOptions[label],
            this.canvasDensity
          );
          return;
        }
      }
    }
  }

  /**
   * Logic to update Volumes
   */
  private updateVolumes() {
    if (this.chartCanvasContext && this.chartCanvas) {
      const activeSerie: CandlSerie | undefined = this.series.get(
        this.currentTimeFrame
      );

      if (activeSerie) {
        const volumeHeight = this.options.volume.height;

        let maxVolumeVisible = 0;
        for (let i = this.firstCandleIndex; i <= this.lastCandleIndex; i++) {
          if (i < 0) continue;
          if (i >= activeSerie.getDataCount()) break;

          const currentVolume = activeSerie.getDataByIndex(i).v;
          if (currentVolume > maxVolumeVisible) {
            maxVolumeVisible = currentVolume;
          }
        }

        if (maxVolumeVisible === 0) {
          maxVolumeVisible = 1;
        }

        const scaleVolumeY = (value: number | undefined) =>
          ((value ? value : 1000) / maxVolumeVisible) * volumeHeight;

        let x = -this.offset.x;
        for (let i = this.firstCandleIndex; i <= this.lastCandleIndex; i++) {
          if (i < 0) continue;
          if (i >= activeSerie.getDataCount()) break;

          x = -this.offset.x + i * (this.candleWidth + this.candleSpacing);
          const volumeY = scaleVolumeY(activeSerie.getDataByIndex(i).v);

          const isBullish: boolean =
            activeSerie.getDataByIndex(i).c > activeSerie.getDataByIndex(i).o;

          CandlDraw.drawVolumeBar(
            this.chartCanvasContext,
            {
              x,
              y:
                this.chartCanvas.height -
                volumeY -
                this.options.xAxis.height -
                5,
            },
            { x: this.candleWidth, y: volumeY },
            isBullish,
            this.options.volume,
            this.canvasDensity
          );
        }
      }
    }
  }

  /**
   * Logic to update PriceLine
   */
  private updatePriceLine() {
    const activeSerie: CandlSerie | undefined = this.series.get(
      this.currentTimeFrame
    );

    if (
      this.uiCanvasContext &&
      this.uiCanvas &&
      activeSerie &&
      activeSerie.getDataCount() > 0
    ) {
      const lastCandle = activeSerie.getDataByIndex(
        activeSerie.getDataCount() - 1
      );
      const lastCandleCloseY = this.scaleY(lastCandle.c);

      CandlDraw.drawPriceLine(
        this.uiCanvasContext,
        {
          x: 0,
          y: CandlHelper.getPixelPerfectNumber(lastCandleCloseY),
        },
        {
          x: this.uiCanvas.width - this.options.yAxis.width,
          y: CandlHelper.getPixelPerfectNumber(lastCandleCloseY),
        },
        {
          x: this.uiCanvas.width - this.options.yAxis.width + 1,
          y:
            this.scaleY(
              activeSerie.getDataByIndex(activeSerie.getDataCount() - 1).c
            ) - 12,
        },
        {
          x: CandlHelper.getPixelPerfectNumber(this.options.yAxis.width),
          y: CandlHelper.getPixelPerfectNumber(24),
        },
        activeSerie.getDataByIndex(activeSerie.getDataCount() - 1).c,
        this.options.priceLine
      );
    }
  }

  /**
   * Logic to update Cross
   */
  private updateCross() {
    const activeSerie: CandlSerie | undefined = this.series.get(
      this.currentTimeFrame
    );
    if (
      this.uiCanvasContext &&
      this.uiCanvas &&
      this.isMouseIn &&
      activeSerie
    ) {
      CandlDraw.drawCross(
        this.uiCanvasContext,
        this.options.cross,
        // this.mouseLocal,
        {
          x:
            this.hoveredIndex *
              (this.candleWidth + this.candleSpacing) *
              this.canvasDensity -
            this.offset.x * this.canvasDensity +
            (this.candleWidth + this.candleSpacing) / 2,
          y: this.mouseLocal.y,
        },
        {
          x: this.uiCanvas.width - this.options.yAxis.width,
          y: this.uiCanvas.height - this.options.xAxis.height,
        }
      );
    }
  }

  /**
   * Logic to update LineCursor
   */
  private updateLineCursor() {
    const activeSerie: CandlSerie | undefined = this.series.get(
      this.currentTimeFrame
    );
    if (
      activeSerie &&
      this.uiCanvasContext &&
      this.inputCanvas &&
      this.hoveredIndex >= 0 &&
      this.hoveredIndex < activeSerie.getDataCount()
    ) {
      CandlDraw.drawLineCursor(
        this.uiCanvasContext,
        {
          x:
            this.hoveredIndex *
              (this.candleWidth + this.candleSpacing) *
              this.canvasDensity -
            this.offset.x * this.canvasDensity +
            (this.candleWidth + this.candleSpacing) / 2,
          y: this.scaleY(activeSerie.getDataByIndex(this.hoveredIndex).c),
        },
        this.options.lineCursor,
        this.canvasDensity
      );
    }
  }

  private scaleY(value: number) {
    return (
      CandlHelper.scale(
        value,
        this.minValue,
        this.maxValue,
        this.getCandleViewSize(),
        this.candleViewsStartOffset,
        this.candleViewsEndOffset
      ) * this.canvasDensity
    );
  }

  /**
   * For every mouse move
   */
  private onMouseMove(event: MouseEvent) {
    if (this.inputCanvas) {
      this.isMouseIn = true;

      const rect = this.inputCanvas.getBoundingClientRect();

      this.mouseLocal = {
        x: event.clientX * this.canvasDensity - rect.left * this.canvasDensity,
        y: event.clientY * this.canvasDensity - rect.top * this.canvasDensity,
      };

      const activeSerie: CandlSerie | undefined = this.series.get(
        this.currentTimeFrame
      );

      if (activeSerie) {
        this.hoveredIndex = Math.floor(
          (this.offset.x + this.mouseLocal.x / this.canvasDensity) /
            (this.candleWidth + this.candleSpacing)
        );
      }

      if (this.isDragging) {
        const newOffset: CandlVector2 = {
          x: this.startDrag.x - (event.clientX - rect.left),
          y: this.startDrag.y - (event.clientY - rect.top),
        };

        newOffset.x = Math.min(newOffset.x, this.getOffsetXLimitRight());
        newOffset.x = Math.max(newOffset.x, this.getOffsetXLimitLeft());

        this.offset = {
          x: CandlHelper.getPixelPerfectNumber(newOffset.x),
          y: CandlHelper.getPixelPerfectNumber(newOffset.y),
        };
        this.update();
      } else {
        this.updateInputCanvas();
        this.updateUiCanvas();
      }
    }
  }

  /**
   * For every mouse click (press)
   */
  private onMouseDown(event: MouseEvent) {
    if (this.inputCanvas) {
      const rect = this.inputCanvas.getBoundingClientRect();
      this.startDrag = {
        x: event.clientX - rect.left + this.offset.x,
        y: event.clientY - rect.top + this.offset.y,
      };
      this.isDragging = true;
    }
  }

  /**
   * For every mouse click (release)
   */
  private onMouseUp() {
    this.isDragging = false;
  }

  /**
   * For every mouse leaving canvas event
   */
  private onMouseLeave() {
    this.isDragging = false;
    this.hoveredIndex = -1;
    this.isMouseIn = false;
    this.update();
  }

  /**
   * For every mouse wheel event
   */
  private onMouseWheel(event: WheelEvent) {
    const activeSerie: CandlSerie | undefined = this.series.get(
      this.currentTimeFrame
    );

    if (activeSerie) {
      const mouseStart = this.mouseLocal;

      const previousZoom = activeSerie.getActiveView().zoomFactor;

      activeSerie.setViewIndex(
        activeSerie.getViewIndex() + (event.deltaY < 0 ? 1 : -1)
      );
      activeSerie.setViewIndex(
        Math.min(activeSerie.getViewIndex(), activeSerie.getViewsCount() - 1)
      );
      activeSerie.setViewIndex(Math.max(activeSerie.getViewIndex(), 0));

      if (this.options.inputs.zoomAtCursor) {
        const newZoom = activeSerie.getActiveView().zoomFactor;

        const worldMouseXBeforeZoom =
          (mouseStart.x / this.canvasDensity + this.offset.x) / previousZoom;
        const worldMouseYBeforeZoom =
          (mouseStart.y / this.canvasDensity + this.offset.y) / previousZoom;

        const newOffset: CandlVector2 = {
          x:
            worldMouseXBeforeZoom * newZoom - mouseStart.x / this.canvasDensity,
          y:
            worldMouseYBeforeZoom * newZoom - mouseStart.y / this.canvasDensity,
        };

        this.offset = {
          x: CandlHelper.getPixelPerfectNumber(newOffset.x),
          y: CandlHelper.getPixelPerfectNumber(newOffset.y),
        };
      }

      // newOffset.x = Math.min(newOffset.x, this.getOffsetXLimitRight());
      // newOffset.x = Math.max(newOffset.x, this.getOffsetXLimitLeft());

      // newOffset.x = Math.max(newOffset.x, this.getOffsetXLimitLeft());
      // newOffset.x = Math.min(newOffset.x, this.getOffsetXLimitRight());

      this.update();
    }
  }

  private onTouchMove() {}

  private onTouchDown() {}

  private onTouchUp() {}

  private onTouchLeave() {}

  /**
   * For every window size event
   * TODO : move the bind to the parent container
   */
  private onResize() {
    if (this.gridCanvas && this.gridCanvasContext) {
      this.gridCanvas.width = this.gridCanvas.offsetWidth * this.canvasDensity;
      this.gridCanvas.height =
        this.gridCanvas.offsetHeight * this.canvasDensity;

      // this.gridCanvasContext.scale(
      //   1 / this.canvasDensity,
      //   1 / this.canvasDensity
      // );
    }

    if (this.chartCanvas && this.chartCanvasContext) {
      this.chartCanvas.width =
        this.chartCanvas.offsetWidth * this.canvasDensity;
      this.chartCanvas.height =
        this.chartCanvas.offsetHeight * this.canvasDensity;

      // this.chartCanvasContext.scale(
      //   1 / this.canvasDensity,
      //   1 / this.canvasDensity
      // );
    }

    if (this.uiCanvas && this.uiCanvasContext) {
      this.uiCanvas.width = this.uiCanvas.offsetWidth * this.canvasDensity;
      this.uiCanvas.height = this.uiCanvas.offsetHeight * this.canvasDensity;

      // this.uiCanvasContext.scale(
      //   1 / this.canvasDensity,
      //   1 / this.canvasDensity
      // );
    }

    if (this.inputCanvas && this.inputCanvasContext) {
      this.inputCanvas.width =
        this.inputCanvas.offsetWidth * this.canvasDensity;
      this.inputCanvas.height =
        this.inputCanvas.offsetHeight * this.canvasDensity;

      // this.inputCanvasContext.scale(
      //   1 / this.canvasDensity,
      //   1 / this.canvasDensity
      // );
    }

    this.update();
  }

  public getLastCandleOffset(): number {
    const activeSerie: CandlSerie | undefined = this.series.get(
      this.currentTimeFrame
    );

    if (activeSerie) {
      if (this.candleWidth === 0) {
        this.update();
      }
      if (this.gridCanvas) {
        const lastIndex = activeSerie.getDataCount() - 1;
        const xPosition = (this.candleWidth + this.candleSpacing) * lastIndex;
        return xPosition - this.gridCanvas.width / this.canvasDensity + 200;
      }
    }
    return 0;
  }

  public getDrawnCandleCount(): number {
    return this.lastCandleIndex - this.firstCandleIndex;
  }

  public getCandleCount(type: CandlTimeFrame): number {
    const activeSerie: CandlSerie | undefined = this.series.get(type);

    if (activeSerie) {
      return activeSerie.getDataCount();
    }
    return 0;
  }

  public getIndexOfHoveredCandle(): number {
    return Math.floor(
      this.offset.x / (this.candleWidth + this.candleSpacing) +
        this.mouseLocal.x / (this.candleWidth + this.candleSpacing)
    );
  }

  public getDataOfHoveredCandle(): CandlData | null {
    const activeSerie: CandlSerie | undefined = this.series.get(
      this.currentTimeFrame
    );

    if (activeSerie) {
      const index = this.getIndexOfHoveredCandle();
      if (index >= 0 && index < activeSerie.getDataCount()) {
        return activeSerie.getDataByIndex(index);
      }
    }
    return null;
  }

  public setHoveredIndex(index: number) {
    this.hoveredIndex = index;
  }

  public getOffsetXLimitLeft(): number {
    const activeSerie: CandlSerie | undefined = this.series.get(
      this.currentTimeFrame
    );

    if (activeSerie) {
      return -200 * activeSerie.getActiveView().zoomFactor;
    }
    return 0;
  }

  public getOffsetXLimitRight(): number {
    const activeSerie: CandlSerie | undefined = this.series.get(
      this.currentTimeFrame
    );

    if (this.gridCanvas && activeSerie) {
      const lastIndex = activeSerie.getDataCount() - 1;
      return (
        (this.candleWidth + this.candleSpacing) * lastIndex -
        (this.gridCanvas.width / this.canvasDensity - 200)
      );
    }
    return 0;
  }

  public getCandleViewSize(): CandlVector2 {
    if (this.chartCanvas) {
      let x = this.chartCanvas.width / this.canvasDensity;
      let y = this.chartCanvas.height / this.canvasDensity;

      if (this.options.showYAxis) {
        x -= this.options.yAxis.width * this.canvasDensity;
      }

      if (this.options.showVolume) {
        y -= this.options.volume.height * this.canvasDensity;
      }

      if (this.options.showXLabels) {
        y -= this.options.xAxis.height * this.canvasDensity;
      }

      return { x, y };
    }
    return { x: 0, y: 0 };
  }

  /**
   * Set Grid options
   * @param {CandlOptionGrid} options
   */
  public setOptionsGrid(options: DeepPartial<CandlOptionGrid>): void {
    this.options.grid = {
      gridMajorX: { ...this.options.grid.gridMajorX, ...options.gridMajorX },
      gridMinorX: { ...this.options.grid.gridMinorX, ...options.gridMinorX },
      gridMajorY: { ...this.options.grid.gridMajorY, ...options.gridMajorY },
    };
  }

  /**
   * Set Y axis options
   * @param {CandlOptionYAxis} options
   */
  public setOptionsYAxis(options: DeepPartial<CandlOptionYAxis>): void {
    this.options.yAxis = { ...this.options.yAxis, ...options };
  }

  /**
   * Set labels options on X axis
   * @param {CandlOptionXAxisLabels} options
   */
  public setOptionsXAxisLabels(
    options: DeepPartial<CandlOptionXAxisLabels>
  ): void {
    this.options.xAxis = { ...this.options.xAxis, ...options };
  }

  /**
   * Set common render options
   * @param {CandlOptionRenderCommon} options
   */
  public setOptionsRender(options: DeepPartial<CandlOptionRenderCommon>): void {
    this.options.commonRender = { ...this.options.commonRender, ...options };
  }

  /**
   * Set candle render options
   * @param {CandlOptionRenderCandle} options
   */
  public setOptionsCandle(options: DeepPartial<CandlOptionRenderCandle>): void {
    this.options.candleRender = {
      bearish: { ...this.options.candleRender.bearish, ...options.bearish },
      bullish: { ...this.options.candleRender.bullish, ...options.bullish },
    };
  }

  /**
   * Set line render options
   * @param {CandlOptionRenderLine} options
   */
  public setOptionsLine(options: DeepPartial<CandlOptionRenderLine>): void {
    this.options.lineRender = { ...this.options.lineRender, ...options };
  }

  /**
   * Set area render options
   * @param {CandlOptionRenderArea} options
   */
  public setOptionsArea(options: DeepPartial<CandlOptionRenderArea>): void {
    this.options.areaRender = {
      line: { ...this.options.areaRender.line, ...options.line },
      area: { ...this.options.areaRender.area, ...options.area },
    };
  }

  /**
   * Set price line options
   * @param {CandlOptionPriceLine} options
   */
  public setOptionsPriceLine(options: DeepPartial<CandlOptionPriceLine>): void {
    this.options.priceLine = {
      ...this.options.priceLine,
      ...options,
    };
  }

  /**
   * Set cross options
   * @param {CandlOptionCross} options
   */
  public setOptionsCross(options: DeepPartial<CandlOptionCross>): void {
    this.options.cross = {
      ...this.options.cross,
      ...options,
      dotted: {
        ...this.options.cross.dotted,
        ...options.dotted,
        value: options.dotted?.value?.every((v) => v !== undefined)
          ? (options.dotted.value as number[])
          : this.options.cross.dotted.value,
      },
    };
  }

  /**
   * Set inputs options
   * @param {CandlOptionInputs} options
   */
  public setOptionsInputs(options: DeepPartial<CandlOptionInputs>): void {
    this.options.inputs = {
      ...this.options.inputs,
      ...options,
    };
  }

  /**
   * Set cursor options
   * @param {CandlOptionCursor} options
   */
  public setOptionsCursor(options: DeepPartial<CandlOptionCursor>): void {
    this.options.cursor = {
      ...this.options.cursor,
      ...options,
    };
    this.updateInputCanvas();
  }

  /**
   * Set X label options
   * @param {CandlXLabelOptions[]} - array of CandlXLabelOptions
   */
  public setXLabels(xLabels: CandlXLabelOptions[]): void {
    for (let i = 0; i < xLabels.length; i++) {
      const index = this.xLabelOptions.findIndex(
        (el) => xLabels[i].type === el.type
      );
      if (index) {
        this.xLabelOptions[index] = xLabels[i];
      }
    }
  }
}
