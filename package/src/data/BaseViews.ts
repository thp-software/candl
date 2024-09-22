import { CandlRenderMode } from "../enums/CandlRender";
import { CandlXLabelType } from "../enums/CandlXLabelType";
import { CandlView } from "../interfaces/CandlView";

export const getDefaultView = (): CandlView => {
  return {
    zoomFactor: 1,
    renderMode: CandlRenderMode.CandleAndShadow,
    gridXMinorSteps: 20,
    gridXMajorSteps: 60,
    xLabels: [
      CandlXLabelType.LabelYear,
      CandlXLabelType.LabelMonth,
      CandlXLabelType.LabelDay,
      CandlXLabelType.LabelHour,
    ],
  };
};

export const get1MBaseViews = () => {
  return [
    {
      zoomFactor: 0.041125,
      renderMode: CandlRenderMode.Area,
      gridXMinorSteps: 120,
      gridXMajorSteps: 480,
      xLabels: [
        CandlXLabelType.LabelYear,
        CandlXLabelType.LabelMonth,
        CandlXLabelType.LabelDay,
        CandlXLabelType.Label4Hours,
      ],
    },
    {
      zoomFactor: 0.0825,
      renderMode: CandlRenderMode.Area,
      gridXMinorSteps: 60,
      gridXMajorSteps: 240,
      xLabels: [
        CandlXLabelType.LabelYear,
        CandlXLabelType.LabelMonth,
        CandlXLabelType.LabelDay,
        CandlXLabelType.Label4Hours,
      ],
    },
    {
      zoomFactor: 0.165,
      renderMode: CandlRenderMode.Area,
      gridXMinorSteps: 30,
      gridXMajorSteps: 120,
      xLabels: [
        CandlXLabelType.LabelYear,
        CandlXLabelType.LabelMonth,
        CandlXLabelType.LabelDay,
        CandlXLabelType.LabelHour,
      ],
    },
    {
      zoomFactor: 0.33,
      renderMode: CandlRenderMode.Area,
      gridXMinorSteps: 15,
      gridXMajorSteps: 60,
      xLabels: [
        CandlXLabelType.LabelYear,
        CandlXLabelType.LabelMonth,
        CandlXLabelType.LabelDay,
        CandlXLabelType.LabelHour,
      ],
    },
    {
      zoomFactor: 0.5,
      showShadows: true,
      renderMode: CandlRenderMode.CandleOnly,
      gridXMinorSteps: 5,
      gridXMajorSteps: 20,
      xLabels: [
        CandlXLabelType.LabelYear,
        CandlXLabelType.LabelMonth,
        CandlXLabelType.LabelDay,
        CandlXLabelType.LabelHour,
        CandlXLabelType.Label20Minutes,
      ],
    },
    {
      zoomFactor: 1,
      showShadows: true,
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
    {
      zoomFactor: 2,
      showShadows: true,
      renderMode: CandlRenderMode.CandleAndShadow,
      gridXMinorSteps: 1,
      gridXMajorSteps: 5,
      xLabels: [
        CandlXLabelType.LabelYear,
        CandlXLabelType.LabelMonth,
        CandlXLabelType.LabelDay,
        CandlXLabelType.LabelHour,
        CandlXLabelType.Label5Minutes,
      ],
    },
    {
      zoomFactor: 4,
      showShadows: true,
      renderMode: CandlRenderMode.CandleAndShadow,
      gridXMinorSteps: 1,
      gridXMajorSteps: 5,
      xLabels: [
        CandlXLabelType.LabelYear,
        CandlXLabelType.LabelMonth,
        CandlXLabelType.LabelDay,
        CandlXLabelType.LabelHour,
        CandlXLabelType.Label5Minutes,
      ],
    },
  ];
};

export const get5MBaseViews = () => {
  return [
    {
      zoomFactor: 0.04125,

      renderMode: CandlRenderMode.CandleAndShadow,

      gridXMinorSteps: 120,
      gridXMajorSteps: 480,
      xLabels: [
        CandlXLabelType.LabelYear,
        CandlXLabelType.LabelMonth,
        CandlXLabelType.LabelDay,
      ],
    },
    {
      zoomFactor: 0.0825,

      renderMode: CandlRenderMode.CandleAndShadow,

      gridXMinorSteps: 60,
      gridXMajorSteps: 240,
      xLabels: [
        CandlXLabelType.LabelYear,
        CandlXLabelType.LabelMonth,
        CandlXLabelType.LabelDay,
      ],
    },
    {
      zoomFactor: 0.165,

      renderMode: CandlRenderMode.CandleAndShadow,

      gridXMinorSteps: 30,
      gridXMajorSteps: 120,
      xLabels: [
        CandlXLabelType.LabelYear,
        CandlXLabelType.LabelMonth,
        CandlXLabelType.LabelDay,
        CandlXLabelType.Label4Hours,
      ],
    },
    {
      zoomFactor: 0.33,

      renderMode: CandlRenderMode.CandleAndShadow,

      gridXMinorSteps: 15,
      gridXMajorSteps: 60,
      xLabels: [
        CandlXLabelType.LabelYear,
        CandlXLabelType.LabelMonth,
        CandlXLabelType.LabelDay,
        CandlXLabelType.Label4Hours,
      ],
    },
    {
      zoomFactor: 0.5,
      showShadows: true,
      renderMode: CandlRenderMode.CandleAndShadow,

      gridXMinorSteps: 5,
      gridXMajorSteps: 20,
      xLabels: [
        CandlXLabelType.LabelYear,
        CandlXLabelType.LabelMonth,
        CandlXLabelType.LabelDay,
        CandlXLabelType.LabelHour,
      ],
    },
    {
      zoomFactor: 1,
      showShadows: true,
      renderMode: CandlRenderMode.CandleAndShadow,

      gridXMinorSteps: 5,
      gridXMajorSteps: 20,
      xLabels: [
        CandlXLabelType.LabelYear,
        CandlXLabelType.LabelMonth,
        CandlXLabelType.LabelDay,
        CandlXLabelType.LabelHour,
      ],
    },
    {
      zoomFactor: 2,
      showShadows: true,
      renderMode: CandlRenderMode.CandleAndShadow,

      gridXMinorSteps: 1,
      gridXMajorSteps: 5,
      xLabels: [
        CandlXLabelType.LabelYear,
        CandlXLabelType.LabelMonth,
        CandlXLabelType.LabelDay,
        CandlXLabelType.LabelHour,
        CandlXLabelType.Label20Minutes,
      ],
    },
    {
      zoomFactor: 4,
      showShadows: true,
      renderMode: CandlRenderMode.CandleAndShadow,

      gridXMinorSteps: 1,
      gridXMajorSteps: 5,
      xLabels: [
        CandlXLabelType.LabelYear,
        CandlXLabelType.LabelMonth,
        CandlXLabelType.LabelDay,
        CandlXLabelType.LabelHour,
        CandlXLabelType.Label20Minutes,
      ],
    },
  ];
};

export const get1HBaseViews = () => {
  return [
    {
      zoomFactor: 0.04125,

      renderMode: CandlRenderMode.CandleAndShadow,

      gridXMinorSteps: 120,
      gridXMajorSteps: 480,
      xLabels: [CandlXLabelType.LabelYear, CandlXLabelType.LabelMonth],
    },
    {
      zoomFactor: 0.0825,

      renderMode: CandlRenderMode.CandleAndShadow,

      gridXMinorSteps: 60,
      gridXMajorSteps: 240,
      xLabels: [CandlXLabelType.LabelYear, CandlXLabelType.LabelMonth],
    },
    {
      zoomFactor: 0.165,

      renderMode: CandlRenderMode.CandleAndShadow,

      gridXMinorSteps: 30,
      gridXMajorSteps: 120,
      xLabels: [
        CandlXLabelType.LabelYear,
        CandlXLabelType.LabelMonth,
        CandlXLabelType.Label4Days,
      ],
    },
    {
      zoomFactor: 0.33,

      renderMode: CandlRenderMode.CandleAndShadow,

      gridXMinorSteps: 15,
      gridXMajorSteps: 60,
      xLabels: [
        CandlXLabelType.LabelYear,
        CandlXLabelType.LabelMonth,
        CandlXLabelType.LabelDay,
      ],
    },
    {
      zoomFactor: 0.5,
      showShadows: true,
      renderMode: CandlRenderMode.CandleAndShadow,

      gridXMinorSteps: 5,
      gridXMajorSteps: 20,
      xLabels: [
        CandlXLabelType.LabelYear,
        CandlXLabelType.LabelMonth,
        CandlXLabelType.LabelDay,
        CandlXLabelType.Label12Hours,
      ],
    },
    {
      zoomFactor: 1,
      showShadows: true,
      renderMode: CandlRenderMode.CandleAndShadow,

      gridXMinorSteps: 5,
      gridXMajorSteps: 20,
      xLabels: [
        CandlXLabelType.LabelYear,
        CandlXLabelType.LabelMonth,
        CandlXLabelType.LabelDay,
        CandlXLabelType.Label8Hours,
      ],
    },
    {
      zoomFactor: 2,
      showShadows: true,
      renderMode: CandlRenderMode.CandleAndShadow,

      gridXMinorSteps: 1,
      gridXMajorSteps: 5,
      xLabels: [
        CandlXLabelType.LabelYear,
        CandlXLabelType.LabelMonth,
        CandlXLabelType.LabelDay,
        CandlXLabelType.Label4Hours,
      ],
    },
    {
      zoomFactor: 4,
      showShadows: true,
      renderMode: CandlRenderMode.CandleAndShadow,

      gridXMinorSteps: 1,
      gridXMajorSteps: 5,
      xLabels: [
        CandlXLabelType.LabelYear,
        CandlXLabelType.LabelMonth,
        CandlXLabelType.LabelDay,
        CandlXLabelType.Label4Hours,
      ],
    },
  ];
};
