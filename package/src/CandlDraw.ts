import dayjs from "dayjs";
import { CandlHelper } from "./helpers/CandlHelper";
import { CandlData } from "./interfaces/CandlData";
import {
  CandlOptionCross,
  CandlOptionLineCursor,
  CandlOptionPriceLine,
  CandlOptionRenderArea,
  CandlOptionRenderCandle,
  CandlOptionRenderLine,
  CandlOptionVolume,
} from "./interfaces/CandlOption";
import { CandlVector2 } from "./interfaces/CandlVector2";
import { CandlXLabelOptions } from "./interfaces/CandlXLabelOptions";

/**
 * Candl Draw Helpers
 */
export abstract class CandlDraw {
  /**
   * Draw a candle (without shadow)
   * @param context
   * @param position
   * @param size
   * @param data
   * @param options
   */
  public static drawCandle(
    context: CanvasRenderingContext2D,
    position: CandlVector2,
    size: CandlVector2,
    data: CandlData,
    options: CandlOptionRenderCandle,
    density: number
  ): void {
    context.fillStyle =
      data.o > data.c ? options.bearish.color : options.bullish.color;

    context.fillRect(
      CandlHelper.getPixelPerfectNumber(
        CandlHelper.getValueWithDensity(position.x, density)
      ),
      CandlHelper.getPixelPerfectNumber(position.y),
      CandlHelper.getPixelPerfectNumber(
        CandlHelper.getValueWithDensity(size.x, density)
      ),
      CandlHelper.getPixelPerfectNumber(size.y)
    );
  }

  /**
   * Draw a candle (with shadow)
   * @param context
   * @param position
   * @param size
   * @param data
   * @param options
   */
  public static drawCandleWithShadow(
    context: CanvasRenderingContext2D,
    positionBody: CandlVector2,
    sizeBody: CandlVector2,
    positionShadow: CandlVector2,
    sizeShadow: CandlVector2,
    data: CandlData,
    options: CandlOptionRenderCandle,
    density: number
  ): void {
    context.fillStyle =
      data.o > data.c
        ? options.bearish.shadowColor
        : options.bullish.shadowColor;

    context.fillRect(
      CandlHelper.getPixelPerfectNumber(
        CandlHelper.getValueWithDensity(positionShadow.x, density)
      ),
      CandlHelper.getPixelPerfectNumber(positionShadow.y),
      CandlHelper.getPixelPerfectNumber(
        CandlHelper.getValueWithDensity(sizeShadow.x, density)
      ),
      CandlHelper.getPixelPerfectNumber(sizeShadow.y)
    );

    context.fillStyle =
      data.o > data.c ? options.bearish.color : options.bullish.color;

    context.fillRect(
      CandlHelper.getPixelPerfectNumber(
        CandlHelper.getValueWithDensity(positionBody.x, density)
      ),
      CandlHelper.getPixelPerfectNumber(positionBody.y),
      CandlHelper.getPixelPerfectNumber(
        CandlHelper.getValueWithDensity(sizeBody.x, density)
      ),
      CandlHelper.getPixelPerfectNumber(sizeBody.y)
    );
  }

  /**
   * Draw a minified candle (body include shadows)
   * @param context
   * @param position
   * @param size
   * @param data
   * @param options
   */
  public static drawMinifiedCandle(
    context: CanvasRenderingContext2D,
    position: CandlVector2,
    size: CandlVector2,
    data: CandlData,
    options: CandlOptionRenderCandle,
    density: number
  ): void {
    context.fillStyle =
      data.o > data.c
        ? options.bearish.shadowColor
        : options.bullish.shadowColor;

    context.fillRect(
      CandlHelper.getPixelPerfectNumber(
        CandlHelper.getValueWithDensity(position.x, density)
      ) + 0.5,
      CandlHelper.getPixelPerfectNumber(position.y) + 0.5,
      CandlHelper.getPixelPerfectNumber(
        CandlHelper.getValueWithDensity(size.x, density)
      ) + 0.5,
      CandlHelper.getPixelPerfectNumber(size.y) + 0.5
    );
  }

  public static drawLineOpen(
    context: CanvasRenderingContext2D,
    position: CandlVector2,
    options: CandlOptionRenderLine,
    density: number
  ): void {
    // context.stroke();
    context.moveTo(
      CandlHelper.getPixelPerfectNumber(
        CandlHelper.getValueWithDensity(position.x, density)
      ) + 0.5,
      CandlHelper.getPixelPerfectNumber(position.y) + 0.5
    );
    context.beginPath();

    context.strokeStyle = options.color;
    context.lineWidth = options.thickness;
    context.lineCap = "round";
    CandlDraw.drawLineContinue(context, position, density);
  }

  public static drawLineContinue(
    context: CanvasRenderingContext2D,
    position: CandlVector2,
    density: number
  ): void {
    context.lineTo(
      CandlHelper.getPixelPerfectNumber(
        CandlHelper.getValueWithDensity(position.x, density)
      ) + 0.5,
      CandlHelper.getPixelPerfectNumber(position.y) + 0.5
    );
  }

  public static drawLineClose(
    context: CanvasRenderingContext2D,
    position: CandlVector2,
    firstPosition: CandlVector2,
    density: number
  ): void {
    CandlDraw.drawLineContinue(context, position, density);
    context.stroke();
    context.moveTo(
      CandlHelper.getPixelPerfectNumber(
        CandlHelper.getValueWithDensity(firstPosition.x, density)
      ) + 0.5,
      CandlHelper.getPixelPerfectNumber(firstPosition.y) + 0.5
    );
    context.closePath();
  }

  public static drawAreaOpen(
    context: CanvasRenderingContext2D,
    position: CandlVector2,
    options: CandlOptionRenderArea,
    density: number
  ): void {
    context.moveTo(
      CandlHelper.getPixelPerfectNumber(
        CandlHelper.getValueWithDensity(position.x, density)
      ) + 0.5,
      CandlHelper.getPixelPerfectNumber(position.y) + 0.5
    );
    context.beginPath();

    context.strokeStyle = options.line.color;
    context.lineWidth = options.line.thickness;
    CandlDraw.drawLineContinue(context, position, density);
  }

  public static drawAreaContinue(
    context: CanvasRenderingContext2D,
    position: CandlVector2,
    density: number
  ): void {
    CandlDraw.drawLineContinue(context, position, density);
  }

  public static drawAreaClose(
    context: CanvasRenderingContext2D,
    position: CandlVector2,
    options: CandlOptionRenderArea,
    startX: number,
    endX: number,
    chartHeight: number,
    density: number
  ): void {
    CandlDraw.drawAreaContinue(context, position, density);
    CandlDraw.drawAreaContinue(
      context,
      { x: position.x + 10, y: position.y },
      density
    );
    context.stroke();

    context.lineTo(
      CandlHelper.getPixelPerfectNumber(
        CandlHelper.getValueWithDensity(position.x + 10, density)
      ),
      CandlHelper.getPixelPerfectNumber(chartHeight)
    );

    context.lineWidth = 1;
    context.lineTo(
      CandlHelper.getPixelPerfectNumber(
        CandlHelper.getValueWithDensity(startX, density)
      ),
      CandlHelper.getPixelPerfectNumber(chartHeight)
    );

    const gradient = context.createLinearGradient(0, 1000, 0, 0);

    gradient.addColorStop(1, options.area.topColor);
    gradient.addColorStop(0, options.area.bottomColor);
    context.fillStyle = gradient;
    context.fill();
    context.stroke();
    context.closePath();

    context.clearRect(
      CandlHelper.getPixelPerfectNumber(
        CandlHelper.getValueWithDensity(startX, density)
      ),
      CandlHelper.getPixelPerfectNumber(chartHeight - options.line.thickness),
      CandlHelper.getPixelPerfectNumber(
        CandlHelper.getValueWithDensity(endX - startX, density)
      ),
      CandlHelper.getPixelPerfectNumber(options.line.thickness)
    );

    context.clearRect(
      CandlHelper.getPixelPerfectNumber(
        CandlHelper.getValueWithDensity(position.x, density)
      ),
      CandlHelper.getPixelPerfectNumber(position.y),
      CandlHelper.getPixelPerfectNumber(
        CandlHelper.getValueWithDensity(10 + options.line.thickness, density)
      ),
      CandlHelper.getPixelPerfectNumber(chartHeight)
    );
  }

  public static drawXGridLine(
    context: CanvasRenderingContext2D,
    position: CandlVector2,
    height: number,
    thickness: number,
    color: string,
    density: number
  ): void {
    context.strokeStyle = color;
    context.lineWidth = thickness * density;

    context.beginPath();
    context.moveTo(
      CandlHelper.getPixelPerfectNumber(
        CandlHelper.getValueWithDensity(position.x, density)
      ),
      0
    );
    context.lineTo(
      CandlHelper.getPixelPerfectNumber(
        CandlHelper.getValueWithDensity(position.x, density)
      ),
      CandlHelper.getPixelPerfectNumber(height)
    );
    context.stroke();
  }

  public static drawYGridLine(
    context: CanvasRenderingContext2D,
    position: CandlVector2,
    width: number,
    thickness: number,
    color: string,
    density: number
  ): void {
    context.strokeStyle = color;
    context.lineWidth = thickness * density;

    context.beginPath();
    context.moveTo(0, CandlHelper.getPixelPerfectNumber(position.y));
    context.lineTo(
      CandlHelper.getValueWithDensity(width, density),
      CandlHelper.getPixelPerfectNumber(position.y)
    );
    context.stroke();
  }

  public static clearCanvas(
    canvas: HTMLCanvasElement,
    canvasContext: CanvasRenderingContext2D
  ) {
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
  }

  public static fillRect(
    canvasContext: CanvasRenderingContext2D,
    position: CandlVector2,
    size: CandlVector2,
    color: string,
    density: number
  ) {
    canvasContext.fillStyle = color;
    canvasContext.fillRect(
      CandlHelper.getValueWithDensity(position.x, density),
      CandlHelper.getValueWithDensity(position.y, density),
      CandlHelper.getValueWithDensity(size.x, density),
      CandlHelper.getValueWithDensity(size.y, density)
    );
  }

  // private drawHover(context: CanvasRenderingContext2D) {
  //   if (
  //     this.hoveredIndex < 0 ||
  //     this.hoveredIndex >= this.collections[this.currentCollection].length
  //   ) {
  //     return;
  //   }
  //   if (context && this.isMouseIn) {
  //     const x =
  //       -this.offset.x +
  //       this.hoveredIndex * (this.candleWidth + this.candleSpacing);

  //     const highY = this.scaleY(data.h);
  //     const lowY = this.scaleY(data.l);

  //     context.fillStyle = "#ffffff50";
  //     context.strokeStyle = "#999";
  //     context.lineWidth = 1;
  //     context.beginPath();
  //     context.rect(x - 5, highY - 5, this.candleWidth + 10, lowY - highY + 10);
  //     context.stroke();
  //   }
  // }

  public static drawHoverInfos(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    data: CandlData,
    position: CandlVector2,
    yAxisWidth: number,
    xAxisWidth: number,
    density: number
  ) {
    const offset: CandlVector2 = { x: 30 * density, y: 30 * density };
    const containerSize: CandlVector2 = { x: 360, y: 235 };

    if (position.x + offset.x + 360 >= canvas.width - yAxisWidth) {
      offset.x = -containerSize.x - offset.x;
    }

    if (position.y + offset.y + 235 + 20 >= canvas.height - xAxisWidth) {
      offset.y = -containerSize.y - offset.y;
    }

    context.fillStyle = "#303030bb";
    context.fillRect(
      CandlHelper.getPixelPerfectNumber(position.x + offset.x),
      CandlHelper.getPixelPerfectNumber(position.y + offset.y),
      CandlHelper.getPixelPerfectNumber(containerSize.x),
      CandlHelper.getPixelPerfectNumber(containerSize.y)
    );

    context.textAlign = "left";
    context.textBaseline = "middle";
    context.fillStyle = "#fff";
    context.font = "24px Consolas";

    context.fillText(
      dayjs(data.t).format("YYYY-MM-DD HH:mm:[00]"),
      CandlHelper.getPixelPerfectNumber(position.x + 20 * density + offset.x),
      CandlHelper.getPixelPerfectNumber(position.y + 30 * density + offset.y)
    );

    context.font = "21px Consolas";

    context.fillText(
      "OPEN  : " + data.o.toFixed(4),
      CandlHelper.getPixelPerfectNumber(position.x + 20 * density + offset.x),
      CandlHelper.getPixelPerfectNumber(position.y + 55 * density + offset.y)
    );
    context.fillText(
      "CLOSE : " + data.c.toFixed(4),
      CandlHelper.getPixelPerfectNumber(position.x + 20 * density + offset.x),
      CandlHelper.getPixelPerfectNumber(position.y + 70 * density + offset.y)
    );
    context.fillText(
      (data.c - data.o > 0 ? "+" : "") + (data.c - data.o).toFixed(4),
      CandlHelper.getPixelPerfectNumber(position.x + 160 * density + offset.x),
      CandlHelper.getPixelPerfectNumber(position.y + 62 * density + offset.y)
    );
    context.fillText(
      "HIGH  : " + data.h.toFixed(4),
      CandlHelper.getPixelPerfectNumber(position.x + 20 * density + offset.x),
      CandlHelper.getPixelPerfectNumber(position.y + 95 * density + offset.y)
    );
    context.fillText(
      "LOW   : " + data.l.toFixed(4),
      CandlHelper.getPixelPerfectNumber(position.x + 20 * density + offset.x),
      CandlHelper.getPixelPerfectNumber(position.y + 110 * density + offset.y)
    );
    context.fillText(
      " " + (data.h - data.l).toFixed(4),
      CandlHelper.getPixelPerfectNumber(position.x + 160 * density + offset.x),
      CandlHelper.getPixelPerfectNumber(position.y + 102 * density + offset.y)
    );

    context.fillText(
      "VOLUME: " + data.v?.toFixed(0),
      CandlHelper.getPixelPerfectNumber(position.x + 20 * density + offset.x),
      CandlHelper.getPixelPerfectNumber(position.y + 140 * density + offset.y)
    );
  }

  public static drawXLabel(
    context: CanvasRenderingContext2D,
    position: CandlVector2,
    timestamp: number,
    xLabelOptions: CandlXLabelOptions,
    density: number
  ) {
    context.textAlign = "center";
    context.textBaseline = "top";
    context.fillStyle = xLabelOptions.fontColor;
    context.font = CandlHelper.getFont(
      xLabelOptions.fontSize,
      xLabelOptions.font,
      density
    );
    context.fillText(
      dayjs(timestamp).format(xLabelOptions.format),
      CandlHelper.getPixelPerfectNumber(
        CandlHelper.getValueWithDensity(
          position.x + xLabelOptions.offset.x,
          density
        )
      ),
      CandlHelper.getPixelPerfectNumber(position.y + xLabelOptions.offset.y)
    );
  }

  public static drawVolumeBar(
    context: CanvasRenderingContext2D,
    position: CandlVector2,
    size: CandlVector2,
    isBullish: boolean,
    volumeOptions: CandlOptionVolume,
    density: number
  ) {
    context.fillStyle = isBullish
      ? volumeOptions.bullish.color
      : volumeOptions.bearish.color;

    context.fillRect(
      CandlHelper.getPixelPerfectNumber(
        CandlHelper.getValueWithDensity(position.x, density)
      ),
      CandlHelper.getPixelPerfectNumber(position.y),
      CandlHelper.getPixelPerfectNumber(
        CandlHelper.getValueWithDensity(size.x, density)
      ),
      CandlHelper.getPixelPerfectNumber(size.y)
    );
  }
  public static drawPriceLine(
    context: CanvasRenderingContext2D,
    lineFrom: CandlVector2,
    lineTo: CandlVector2,
    labelBackgroundPosition: CandlVector2,
    labelBackgroundSize: CandlVector2,
    value: number,
    priceLineOptions: CandlOptionPriceLine
  ) {
    context.beginPath();
    context.moveTo(
      CandlHelper.getPixelPerfectNumber(lineFrom.x),
      CandlHelper.getPixelPerfectNumber(lineFrom.y)
    );
    context.lineTo(
      CandlHelper.getPixelPerfectNumber(lineTo.x),
      CandlHelper.getPixelPerfectNumber(lineTo.y)
    );
    context.strokeStyle = priceLineOptions.color;
    context.lineWidth = 1;
    context.stroke();

    context.fillStyle = priceLineOptions.labelBackgroundColor;

    context.fillRect(
      CandlHelper.getPixelPerfectNumber(labelBackgroundPosition.x),
      CandlHelper.getPixelPerfectNumber(labelBackgroundPosition.y),
      CandlHelper.getPixelPerfectNumber(labelBackgroundSize.x),
      CandlHelper.getPixelPerfectNumber(labelBackgroundSize.y)
    );

    context.textAlign = "left";
    context.textBaseline = "middle";
    context.fillStyle = priceLineOptions.labelColor;
    context.font = priceLineOptions.labelFont;

    context.fillText(
      value.toFixed(4),
      CandlHelper.getPixelPerfectNumber(labelBackgroundPosition.x + 5),
      CandlHelper.getPixelPerfectNumber(labelBackgroundPosition.y + 13)
    );
  }

  public static drawCross(
    context: CanvasRenderingContext2D,
    crossOptions: CandlOptionCross,
    cursorPosition: CandlVector2,
    size: CandlVector2
  ) {
    context.setLineDash(crossOptions.dotted.value);
    context.beginPath();

    context.moveTo(CandlHelper.getPixelPerfectNumber(cursorPosition.x), 0);
    context.lineTo(CandlHelper.getPixelPerfectNumber(cursorPosition.x), size.y);

    context.moveTo(0, CandlHelper.getPixelPerfectNumber(cursorPosition.y));
    context.lineTo(size.x, CandlHelper.getPixelPerfectNumber(cursorPosition.y));

    context.strokeStyle = crossOptions.color;
    context.lineWidth = crossOptions.width;
    context.stroke();
    context.setLineDash([]);
  }

  public static drawLineCursor(
    context: CanvasRenderingContext2D,
    position: CandlVector2,
    options: CandlOptionLineCursor,
    density: number
  ) {
    context.beginPath();

    context.strokeStyle = options.ringColor;
    context.lineWidth = options.ringThickness * density;

    context.arc(
      position.x,
      position.y,
      options.radius * density,
      0,
      Math.PI * 2
    );

    context.stroke();
    context.fillStyle = options.fillColor;
    context.fill();
  }
}
