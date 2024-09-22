import { Dayjs } from 'dayjs';

interface CandlVector2 {
    /**
     * x
     */
    x: number;
    /**
     * y
     */
    y: number;
}

/**
 * Interface for candle data.
 * It represent a candlestick on the chart.
 * (Non-optimized Data Structure, approx. 80 bytes per candle and 8 extra bytes for each array pointer)
 */
interface CandlData {
    /**
     * Timestamp - UNIX timestamp in milliseconds
     */
    t: number;
    /**
     * Price at open
     */
    o: number;
    /**
     * Price at close
     */
    c: number;
    /**
     * Highest Price
     */
    h: number;
    /**
     * Lowest Price
     */
    l: number;
    /**
     * Volume - Total number of shares exchanged
     */
    v: number;
}

declare enum CandlXLabelType {
    /**
     * Label every minute
     */
    LabelMinute = 0,
    /**
     * Label every 5 minutes
     */
    Label5Minutes = 1,
    /**
     * Label every 10 minutes
     */
    Label10Minutes = 2,
    /**
     * Label every 15 minutes
     */
    Label15Minutes = 3,
    /**
     * Label every 20 minutes
     */
    Label20Minutes = 4,
    /**
     * Label every 30 minutes
     */
    Label30Minutes = 5,
    /**
     * Label every hour
     */
    LabelHour = 6,
    /**
     * Label every 2 hours
     */
    Label2Hours = 7,
    /**
     * Label every 4 hours
     */
    Label4Hours = 8,
    /**
     * Label every 8 hours
     */
    Label8Hours = 9,
    /**
     * Label every 12 hours
     */
    Label12Hours = 10,
    /**
     * Label every day
     */
    LabelDay = 11,
    /**
     * Label every 2 days
     */
    Label2Days = 12,
    /**
     * Label every 4 days
     */
    Label4Days = 13,
    /**
     * Label every 8 days
     */
    Label8Days = 14,
    /**
     * Label every week
     */
    LabelWeek = 15,
    /**
     * Label every month
     */
    LabelMonth = 16,
    /**
     * Label every year
     */
    LabelYear = 17
}

interface CandlXLabelOptions {
    type: CandlXLabelType;
    /**
     * Font of the label
     */
    font: string;
    /**
     * Font size (in px)
     */
    fontSize: number;
    /**
     * Color of the label
     */
    fontColor: string;
    /**
     * Format of the text (see Day.js format)
     */
    format: string;
    /**
     * Offset of the label in pixels
     */
    offset: CandlVector2;
}

/**
 * Enum of candle duration.
 * Time for each candle on the chart.
 */
declare enum CandlTimeFrame {
    Time1Minute = 0,
    Time5Minutes = 1,
    Time1Hour = 2
}

interface CandlOption {
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
interface CandlOptionInputs {
    handleInput: boolean;
    zoomAtCursor: boolean;
}
interface CandlOptionGrid {
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
interface CandlOptionYAxis {
    backgroundColor: string;
    labelFontSize: number;
    labelFont: string;
    labelColor: string;
    width: number;
}
interface CandlOptionXAxisLabels {
    height: number;
}
interface CandlOptionPriceLine {
    color: string;
    labelBackgroundColor: string;
    labelFont: string;
    labelFontSize: number;
    labelColor: string;
}
interface CandlOptionCross {
    color: string;
    width: number;
    dotted: {
        value: number[];
    };
}
interface CandlOptionRenderCommon {
    initialWidth: number;
    initialSpacing: number;
    initialShadowWidth: number;
    shadowWidthMin: number;
    shadowWidthMax: number;
}
interface CandlOptionRenderCandle {
    bearish: {
        color: string;
        shadowColor: string;
    };
    bullish: {
        color: string;
        shadowColor: string;
    };
}
interface CandlOptionRenderLine {
    color: string;
    thickness: number;
}
interface CandlOptionRenderArea {
    line: {
        color: string;
        thickness: number;
    };
    area: {
        topColor: string;
        bottomColor: string;
    };
}
interface CandlOptionVolume {
    bearish: {
        color: string;
    };
    bullish: {
        color: string;
    };
    height: number;
}
interface CandlOptionCursor {
    style: CssCursorProperty;
}
interface CandlOptionLineCursor {
    ringColor: string;
    fillColor: string;
    radius: number;
    ringThickness: number;
}
type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
type CssCursorProperty = "auto" | "default" | "none" | "context-menu" | "help" | "pointer" | "progress" | "wait" | "cell" | "crosshair" | "text" | "vertical-text" | "alias" | "copy" | "move" | "no-drop" | "not-allowed" | "grab" | "grabbing" | "all-scroll" | "col-resize" | "row-resize" | "n-resize" | "e-resize" | "s-resize" | "w-resize" | "ne-resize" | "nw-resize" | "se-resize" | "sw-resize" | "ew-resize" | "ns-resize" | "nesw-resize" | "nwse-resize" | "zoom-in" | "zoom-out" | `url(${string}), auto`;

declare enum CandlRenderMode {
    /**
     * Draw candles with their shadows
     */
    CandleAndShadow = 0,
    /**
     * Draw candles only
     */
    CandleOnly = 1,
    /**
     * Draw a line
     */
    Line = 2,
    /**
     * TODO Draw minified candles (vertical lines)
     */
    MinifiedCandle = 3,
    Area = 4
}

/**
 * View  of the chart.
 */
interface CandlView {
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

/**
 * Manage a Serie.
 * Contain the data of a specific timeframe and his views
 */
declare class CandlSerie {
    private data;
    private views;
    private viewIndex;
    private id;
    private symbol;
    /**
     *
     * @param {CandlTimeFrame} id - The timeframe of the serie.
     * @param {string} symbol - The symbol of the serie. ex: DJI, FCHI, MSFT, AAPL, ...
     */
    constructor(id: CandlTimeFrame, symbol?: string);
    /**
     * Set the data of the serie
     * @param {CandlData[]} data - The data
     */
    setData(data: CandlData[]): void;
    /**
     * Append data to existing ones
     * @param {CandlData[]} data - The data
     */
    appendData(data: CandlData[]): void;
    /**
     * Clear data
     */
    clearData(): void;
    /**
     * Set the last data of the serie
     * @param {CandlData} data - The data
     */
    setLastData(data: CandlData): void;
    /**
     * Return the last data of the serie. Undefined if the serie is empty.
     * @returns {CandlData | undefined}
     */
    getLastData(): CandlData | undefined;
    /**
     * Return data at specified index
     * @returns {CandlData}
     */
    getDataByIndex(index: number): CandlData;
    /**
     * Return data at specified timestamp. Undefined if not found.
     * @returns {CandlData | undefined}
     */
    getDataByTimestamp(timestamp: number): CandlData | undefined;
    /**
     * Return the count of data in the serie
     * @returns {number}
     */
    getDataCount(): number;
    /**
     * Set the views of the serie
     * @param {CandlView[]} views - The views of the serie
     * @returns {void}
     */
    setViews(views: CandlView[]): void;
    /**
     * Get View at specific index
     * @param {number} index - Index of the view
     * @returns {CandlView | undefined}
     */
    getView(index: number): CandlView | undefined;
    /**
     * Get the count of views
     * @returns {number}
     */
    getViewsCount(): number;
    /**
     * Set the index of active view
     * @returns {number} - The index
     */
    setActiveView(index: number): void;
    /**
     * Get the active view. If there is no active view, return the default view.
     * @returns {CandlView}
     */
    getActiveView(): CandlView;
    /**
     * Get the view index
     * @returns {number}
     */
    getViewIndex(): number;
    /**
     * Set the view index
     * @param {number} index
     */
    setViewIndex(index: number): void;
    /**
     * Get the id of the serie
     * @returns {CandlTimeFrame}
     */
    getId(): CandlTimeFrame;
    /**
     * Get the symbol of the serie
     * @returns {string}
     */
    getSymbol(): string;
}

/**
 * Main class of Candl. Handle Inputs and Updates
 */
declare class Candl {
    private options;
    private canvasDensity;
    private currentTimeFrame;
    private series;
    private xLabelOptions;
    private offset;
    private container;
    /**
     * For Grid and background
     */
    private gridCanvas;
    private gridCanvasContext;
    /**
     * For chart objects
     */
    private chartCanvas;
    private chartCanvasContext;
    /**
     * For user interface
     */
    private uiCanvas;
    private uiCanvasContext;
    /**
     * For user input, mouse / touch
     */
    private inputCanvas;
    private candleWidth;
    private candleSpacing;
    private candleShadowWidth;
    private firstCandleIndex;
    private lastCandleIndex;
    private mouseLocal;
    private startDrag;
    private isDragging;
    private minValue;
    private maxValue;
    private yValues;
    private hoveredIndex;
    private isMouseIn;
    private candleViewsStartOffset;
    private candleViewsEndOffset;
    constructor(container: HTMLDivElement);
    private bindEvents;
    private resizeObserver;
    clean(): void;
    /**
     * Setup canvases for Candl chart
     * @param {HTMLDivElement} container - Parent div of the chart
     */
    private setupCanvases;
    getActiveSerie(): CandlSerie | undefined;
    getSerie(type: CandlTimeFrame): CandlSerie | undefined;
    addSerie(type: CandlTimeFrame, serie: CandlSerie): void;
    removeSerie(type: CandlTimeFrame): void;
    /**
     * Set the active time frame of the chart. It also reset the zoom
     * @param {CandlTimeFrame} type - The new time frame of the chart
     * @returns {void}
     */
    setActiveTimeFrame(type: CandlTimeFrame): void;
    /**
     * Return the active time frame of the chart
     * @returns {CandlTimeFrame}
     */
    getActiveTimeFrame(): CandlTimeFrame;
    /**
     * Get the offset of the canvas (from the bottom left of the chart)
     * @param {CandlVector2} offset - in pixels
     * @returns {void}
     */
    getOffset(): CandlVector2;
    /**
     * Set the offset of the canvas (from the bottom left of the chart)
     * @param {CandlVector2} offset - in pixels
     * @returns {void}
     */
    setOffset(offset: CandlVector2): void;
    private update;
    /**
     * Update Canvas, Grid layer.
     * Update Background, Grid X and Grid Y.
     */
    private updateGridCanvas;
    /**
     * Update Canvas, Chart layer.
     * Update Chart, X Labels and Volume.
     */
    private updateChartCanvas;
    /**
     * Update Canvas, UI layer.
     * Update LineCursor, Y axis, PriceLine, Cross and Hover Infos.
     */
    private updateUiCanvas;
    /**
     * Update Canvas, Input layer.
     * Only update the type of cursor.
     */
    private updateInputCanvas;
    /**
     * Force update of the chart
     */
    forceUpdate(): void;
    /**
     * General Update.
     * Update the size of objects according to active view.
     * It also calcul the first and last CandlData to draw, and other stuff.
     */
    private commonUpdate;
    /**
     * Logic to update Grid X
     */
    private updateGridX;
    /**
     * Logic to update Grid Y
     */
    private updateGridY;
    /**
     * Logic to update Y Axis
     */
    private updateYAxis;
    /**
     * Logic to update Chart
     */
    private updateChart;
    /**
     * Logic to update X Labels
     */
    private updateXLabels;
    private getXLabelText;
    /**
     * Logic to update Volumes
     */
    private updateVolumes;
    /**
     * Logic to update PriceLine
     */
    private updatePriceLine;
    /**
     * Logic to update Cross
     */
    private updateCross;
    /**
     * Logic to update LineCursor
     */
    private updateLineCursor;
    private scaleY;
    /**
     * For every mouse move
     */
    private onMouseMove;
    /**
     * For every mouse click (press)
     */
    private onMouseDown;
    /**
     * For every mouse click (release)
     */
    private onMouseUp;
    /**
     * For every mouse leaving canvas event
     */
    private onMouseLeave;
    /**
     * For every mouse wheel event
     */
    private onMouseWheel;
    private onTouchMove;
    private onTouchDown;
    private onTouchUp;
    private onTouchLeave;
    /**
     * For every window size event
     * TODO : move the bind to the parent container
     */
    private onResize;
    getLastCandleOffset(): number;
    getDrawnCandleCount(): number;
    getCandleCount(type: CandlTimeFrame): number;
    getIndexOfHoveredCandle(): number;
    getDataOfHoveredCandle(): CandlData | null;
    setHoveredIndex(index: number): void;
    getOffsetXLimitLeft(): number;
    getOffsetXLimitRight(): number;
    getCandleViewSize(): CandlVector2;
    /**
     * Set Grid options
     * @param {CandlOptionGrid} options
     */
    setOptionsGrid(options: DeepPartial<CandlOptionGrid>): void;
    /**
     * Set Y axis options
     * @param {CandlOptionYAxis} options
     */
    setOptionsYAxis(options: DeepPartial<CandlOptionYAxis>): void;
    /**
     * Set labels options on X axis
     * @param {CandlOptionXAxisLabels} options
     */
    setOptionsXAxisLabels(options: DeepPartial<CandlOptionXAxisLabels>): void;
    /**
     * Set common render options
     * @param {CandlOptionRenderCommon} options
     */
    setOptionsRender(options: DeepPartial<CandlOptionRenderCommon>): void;
    /**
     * Set candle render options
     * @param {CandlOptionRenderCandle} options
     */
    setOptionsCandle(options: DeepPartial<CandlOptionRenderCandle>): void;
    /**
     * Set line render options
     * @param {CandlOptionRenderLine} options
     */
    setOptionsLine(options: DeepPartial<CandlOptionRenderLine>): void;
    /**
     * Set area render options
     * @param {CandlOptionRenderArea} options
     */
    setOptionsArea(options: DeepPartial<CandlOptionRenderArea>): void;
    /**
     * Set price line options
     * @param {CandlOptionPriceLine} options
     */
    setOptionsPriceLine(options: DeepPartial<CandlOptionPriceLine>): void;
    /**
     * Set cross options
     * @param {CandlOptionCross} options
     */
    setOptionsCross(options: DeepPartial<CandlOptionCross>): void;
    /**
     * Set inputs options
     * @param {CandlOptionInputs} options
     */
    setOptionsInputs(options: DeepPartial<CandlOptionInputs>): void;
    /**
     * Set cursor options
     * @param {CandlOptionCursor} options
     */
    setOptionsCursor(options: DeepPartial<CandlOptionCursor>): void;
    /**
     * Set X label options
     * @param {CandlXLabelOptions[]} - array of CandlXLabelOptions
     */
    setXLabels(xLabels: CandlXLabelOptions[]): void;
}

interface CandlDataMap {
    t: CandlDataMapElement;
    o: CandlDataMapElement;
    c: CandlDataMapElement;
    h: CandlDataMapElement;
    l: CandlDataMapElement;
    v: CandlDataMapElement;
}
interface CandlDataMapElement {
    /**
     * Key of the raw data
     */
    key: string;
    /**
     * If not optional, the raw data will be rejected
     */
    isOptional: boolean;
}

declare const getBaseOptions: () => CandlOption;

declare const getBaseXLabels: () => CandlXLabelOptions[];

declare const getDefaultView: () => CandlView;
declare const get1MBaseZooms: () => ({
    zoomFactor: number;
    renderMode: CandlRenderMode;
    gridXMinorSteps: number;
    gridXMajorSteps: number;
    xLabels: CandlXLabelType[];
    showShadows?: undefined;
} | {
    zoomFactor: number;
    showShadows: boolean;
    renderMode: CandlRenderMode;
    gridXMinorSteps: number;
    gridXMajorSteps: number;
    xLabels: CandlXLabelType[];
})[];
declare const get5MBaseZooms: () => ({
    zoomFactor: number;
    renderMode: CandlRenderMode;
    gridXMinorSteps: number;
    gridXMajorSteps: number;
    xLabels: CandlXLabelType[];
    showShadows?: undefined;
} | {
    zoomFactor: number;
    showShadows: boolean;
    renderMode: CandlRenderMode;
    gridXMinorSteps: number;
    gridXMajorSteps: number;
    xLabels: CandlXLabelType[];
})[];
declare const get1HBaseZooms: () => ({
    zoomFactor: number;
    renderMode: CandlRenderMode;
    gridXMinorSteps: number;
    gridXMajorSteps: number;
    xLabels: CandlXLabelType[];
    showShadows?: undefined;
} | {
    zoomFactor: number;
    showShadows: boolean;
    renderMode: CandlRenderMode;
    gridXMinorSteps: number;
    gridXMajorSteps: number;
    xLabels: CandlXLabelType[];
})[];

declare abstract class CandlHelper {
    /**
     * @public @static
     * Get a pixel perfect number to draw on the canvas.
     * It reduce blur, even for very small object.
     * The idea is to draw on a full physical pixel on the screen.
     * However, it can make some object too "crisp".
     * @param {number} value - The raw value.
     * @returns {number} The clean pixel perfect value.
     */
    static getPixelPerfectNumber(value: number): number;
    /**
     * Return a value in range
     * @param value - Value to scale
     * @param min - Minimal value in range
     * @param max - Maximal value in range
     * @param candleViewSize - View to range the value
     * @param startOffset - Start of the offset of the view (padding)
     * @param endOffset - End of the offset of the view (padding)
     * @returns Value in range
     */
    static scale(value: number, min: number, max: number, candleViewSize: CandlVector2, startOffset: CandlVector2, endOffset: CandlVector2, density: number): number;
    static getFont(fontSize: number, font: string, canvasDensity: number): string;
    static getValueWithDensity(value: number, canvasDensity: number): number;
}

declare abstract class CandlMapper {
    /**
     * Map raw data to CandlData
     * @param {any[]} data - Array of raw data
     * @param {CandlDataMap} map - Map of the raw data to CandlData
     * @returns {CandlData[]} Array of CandlData. Empty if a row is faulty and hasRowTolerance is false
     */
    static map(data: any[], map: CandlDataMap): CandlData[];
}

declare abstract class CandlMock {
    static generateMockData(type: CandlTimeFrame, count: number): CandlData[];
    static generateSameMockForEveryTimeFrame(count: number): CandlData[][];
    static generateMockDataOneByOne(type: CandlTimeFrame, closeAtOpen: boolean, lastValue?: CandlData): CandlData;
    static generateMockCandleTick(lastValue: CandlData): CandlData;
}

declare abstract class CandlTime {
    /**
     * Get milliseconds in CandlTimeFrame
     * @param {CandlTimeFrame} type - Type to check
     * @returns {number}
     */
    static getTimeFrameMilliseconds(type: CandlTimeFrame): number;
    /**
     * Check if the timestamp is of CandlXLabelType type
     * @param {CandlXLabelType} type - Type to check
     * @param {Dayjs} date - Timestamp to check
     * @returns {boolean}
     */
    static isDateOfType(type: CandlXLabelType, date: Dayjs): boolean;
}

export { Candl, type CandlData, type CandlDataMap, type CandlDataMapElement, CandlHelper, CandlMapper, CandlMock, type CandlOption, type CandlOptionCross, type CandlOptionCursor, type CandlOptionGrid, type CandlOptionInputs, type CandlOptionLineCursor, type CandlOptionPriceLine, type CandlOptionRenderArea, type CandlOptionRenderCandle, type CandlOptionRenderCommon, type CandlOptionRenderLine, type CandlOptionVolume, type CandlOptionXAxisLabels, type CandlOptionYAxis, CandlRenderMode, CandlSerie, CandlTime, CandlTimeFrame, type CandlVector2, type CandlView, type CandlXLabelOptions, CandlXLabelType, type CssCursorProperty, type DeepPartial, get1HBaseZooms, get1MBaseZooms, get5MBaseZooms, getBaseOptions, getBaseXLabels, getDefaultView };
