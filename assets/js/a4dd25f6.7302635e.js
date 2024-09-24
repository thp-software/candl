"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[235],{7507:(n,e,o)=>{o.r(e),o.d(e,{assets:()=>a,contentTitle:()=>s,default:()=>h,frontMatter:()=>l,metadata:()=>t,toc:()=>d});var r=o(4848),i=o(8453);const l={sidebar_position:3},s="Candl Options",t={id:"Candl/candl_options",title:"Candl Options",description:"The behavior of Candl is define with CandlOption.",source:"@site/docs/Candl/candl_options.md",sourceDirName:"Candl",slug:"/Candl/candl_options",permalink:"/candl/docs/Candl/candl_options",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"tutorialSidebar",previous:{title:"Candl",permalink:"/candl/docs/Candl/"},next:{title:"Candl Serie",permalink:"/candl/docs/Candl/candl_serie"}},a={},d=[{value:"Full Set",id:"full-set",level:2},{value:"Partial Set",id:"partial-set",level:2},{value:"Show",id:"show",level:3},{value:"General",id:"general",level:3},{value:"Inputs",id:"inputs",level:3},{value:"Grid",id:"grid",level:3},{value:"XAxis",id:"xaxis",level:3},{value:"YAxis",id:"yaxis",level:3},{value:"Price Line",id:"price-line",level:3},{value:"Cross",id:"cross",level:3},{value:"Cursor",id:"cursor",level:3},{value:"Line Cursor",id:"line-cursor",level:3},{value:"Common Render",id:"common-render",level:3},{value:"Candle Render",id:"candle-render",level:3},{value:"Line Render",id:"line-render",level:3},{value:"Area Render",id:"area-render",level:3},{value:"Volume",id:"volume",level:3}];function c(n){const e={code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",p:"p",pre:"pre",...(0,i.R)(),...n.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(e.header,{children:(0,r.jsx)(e.h1,{id:"candl-options",children:"Candl Options"})}),"\n",(0,r.jsxs)(e.p,{children:["The behavior of Candl is define with ",(0,r.jsx)(e.code,{children:"CandlOption"}),"."]}),"\n",(0,r.jsxs)(e.p,{children:["Candl come with an already loaded CandlOption coming from ",(0,r.jsx)(e.code,{children:"getBaseOptions()"}),"."]}),"\n",(0,r.jsx)(e.p,{children:"However you can set your own options."}),"\n",(0,r.jsxs)(e.p,{children:["All the methods here has to be called on ",(0,r.jsx)(e.code,{children:"Candl"})," instance."]}),"\n",(0,r.jsx)(e.h2,{id:"full-set",children:"Full Set"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-ts",children:"// Set the all the options at once\nsetOptions(options: CandlOption): void;\n"})}),"\n",(0,r.jsx)(e.p,{children:"All the properties are mandatory here."}),"\n",(0,r.jsx)(e.p,{children:"Here a full example of CandlOption."}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-ts",children:'const candlOptions: CandlOption = {\n  inputs: {\n    handleInput: true,\n    zoomAtCursor: true,\n  },\n  timeFrame: CandlTimeFrame.Time1Minute,\n  show: {\n    cross: true,\n    lineCursor: true,\n    priceLine: true,\n    volume: true,\n    gridY: true,\n    gridX: true,\n    yAxis: true,\n    xLabels: true,\n    hover: true,\n    hoverInfos: true,\n  },\n  general: {\n    backgroundColor: "#000A1D",\n  },\n  commonRender: {\n    initialShadowWidth: 2,\n    shadowWidthMin: 0.5,\n    shadowWidthMax: 3,\n    initialWidth: 10,\n    initialSpacing: 5,\n  },\n  candleRender: {\n    bearish: {\n      color: "#EF5F62",\n      shadowColor: "#933b3d",\n    },\n    bullish: { color: "#19AD9F", shadowColor: "#137c71" },\n  },\n  lineRender: {\n    color: "#f0f",\n    thickness: 2,\n  },\n  areaRender: {\n    line: {\n      color: "#f0f",\n      thickness: 1,\n    },\n    area: {\n      topColor: "#640064cc",\n      bottomColor: "#00006433",\n    },\n  },\n  volume: {\n    bearish: { color: "#EF5F62a0" },\n    bullish: { color: "#19AD9Fa0" },\n    height: 100,\n  },\n  grid: {\n    gridMajorX: {\n      color: "#192231a0",\n      thickness: 2,\n    },\n    gridMinorX: {\n      color: "#192231a0",\n      thickness: 1,\n    },\n    gridMajorY: {\n      color: "#192231a0",\n      thickness: 2,\n    },\n  },\n  yAxis: {\n    backgroundColor: "#00102dcc",\n    labelFont: "Arial",\n    labelFontSize: 14,\n    labelColor: "#eee",\n    width: 120,\n  },\n  xAxis: {\n    height: 30,\n  },\n  priceLine: {\n    color: "#ffffff50",\n    labelBackgroundColor: "#2f599d",\n    labelFont: "Arial",\n    labelFontSize: 12,\n    labelColor: "#fff",\n  },\n  cross: {\n    color: "#fff",\n    width: 0.5,\n    dotted: {\n      value: [7, 10],\n    },\n  },\n  lineCursor: {\n    ringColor: "white",\n    fillColor: "#ffffff50",\n    ringThickness: 1,\n    radius: 10,\n  },\n  cursor: { style: "crosshair" },\n};\n'})}),"\n",(0,r.jsx)(e.h2,{id:"partial-set",children:"Partial Set"}),"\n",(0,r.jsxs)(e.p,{children:["All the methods below use ",(0,r.jsx)(e.code,{children:"DeepPartial<>"}),"."]}),"\n",(0,r.jsx)(e.p,{children:"So you can specify only the property you want to change."}),"\n",(0,r.jsx)(e.h3,{id:"show",children:"Show"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-ts",children:"// Enable / Disable a feature of the chart\nsetOptionsShow(options: CandlOptionShow): void\n"})}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-ts",children:"export interface CandlOptionShow {\n  // Show a cross centered on mouse pointer.\n  cross: boolean;\n  // Show a round cursor on the hovered Line / Area.\n  lineCursor: boolean;\n  // Show the vertical lines of the grid.\n  gridX: boolean;\n  // Show the horizontal lines of the grid.\n  gridY: boolean;\n  // Show vertical yAxis with prices on the right.\n  yAxis: boolean;\n  // Show horizontal price line with current price.\n  priceLine: boolean;\n  // Show volume bars.\n  volume: boolean;\n  // Show xAxis timestamp labels.\n  xLabels: boolean;\n  // Highlight the hovered candle.\n  hover: boolean;\n  // Show infos of the hovered candle.\n  hoverInfos: boolean;\n}\n"})}),"\n",(0,r.jsx)(e.h3,{id:"general",children:"General"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-ts",children:"// Set general options of the chart\nsetOptionsGeneral(options: CandlOptionGeneral): void\n"})}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-ts",children:"export interface CandlOptionGeneral {\n  // Background color of the chart\n  backgroundColor: string;\n}\n"})}),"\n",(0,r.jsx)(e.h3,{id:"inputs",children:"Inputs"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-ts",children:"// Set inputs options of the chart\nsetOptionsInputs(options: CandlOptionInputs): void\n"})}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-ts",children:"export interface CandlOptionInputs {\n  // Enable / Disable inputs handling\n  handleInput: boolean;\n  // Zoom at the position of the mouse cursor\n  zoomAtCursor: boolean;\n}\n"})}),"\n",(0,r.jsx)(e.h3,{id:"grid",children:"Grid"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-ts",children:"// Set grid options\nsetOptionsGrid(options: CandlOptionGrid): void\n"})}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-ts",children:"export interface CandlOptionGrid {\n  // Lines draw every n steps (see CandlView).\n  gridMajorX: {\n    // Color of the line.\n    color: string;\n    // Thickness of the line.\n    thickness: number;\n  };\n  // Lines draw every n steps (see CandlView).\n  gridMinorX: {\n    color: string;\n    thickness: number;\n  };\n  // Horizontal lines draw every n steps.\n  gridMajorY: {\n    color: string;\n    thickness: number;\n  };\n}\n"})}),"\n",(0,r.jsx)(e.h3,{id:"xaxis",children:"XAxis"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-ts",children:"// Set x axis options\nsetOptionsXAxisLabels(options: CandlOptionXAxisLabels): void\n"})}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-ts",children:"export interface CandlOptionXAxisLabels {\n  // Height of the xAxis labels area in pixels\n  height: number;\n}\n"})}),"\n",(0,r.jsx)(e.h3,{id:"yaxis",children:"YAxis"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-ts",children:"// Set y axis options\nsetOptionsYAxis(options: CandlOptionYAxis): void\n"})}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-ts",children:"export interface CandlOptionYAxis {\n  // Background color of the area.\n  backgroundColor: string;\n  // Font size of the price label\n  labelFontSize: number;\n  // Font of the price label\n  labelFont: string;\n  // Font color of the price label\n  labelColor: string;\n  // Width of the area\n  width: number;\n}\n"})}),"\n",(0,r.jsx)(e.h3,{id:"price-line",children:"Price Line"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-ts",children:"// Set price line options\nsetOptionsPriceLine(options: CandlOptionPriceLine): void\n"})}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-ts",children:"export interface CandlOptionPriceLine {\n  // Color of the price line.\n  color: string;\n  // Background color of the label area.\n  labelBackgroundColor: string;\n  // Font of the label.\n  labelFont: string;\n  // Font size of the label.\n  labelFontSize: number;\n  // Font color of the label.\n  labelColor: string;\n}\n"})}),"\n",(0,r.jsx)(e.h3,{id:"cross",children:"Cross"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-ts",children:"// Set cross options\nsetOptionsCross(options: CandlOptionCross): void\n"})}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-ts",children:"export interface CandlOptionCross {\n  // Color of the lines\n  color: string;\n  // Thickness of the lines\n  width: number;\n  // Dotted value of the lines\n  dotted: { value: number[] };\n}\n"})}),"\n",(0,r.jsx)(e.h3,{id:"cursor",children:"Cursor"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-ts",children:"// Set cursor options\nsetOptionsCursor(options: CandlOptionCursor): void\n"})}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-ts",children:"export interface CandlOptionCursor {\n  // Style of the mouse cursor\n  style: CssCursorProperty;\n}\n"})}),"\n",(0,r.jsx)(e.h3,{id:"line-cursor",children:"Line Cursor"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-ts",children:"// Set line cursor options\nsetOptionsLineCursor(options: CandlOptionLineCursor): void\n"})}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-ts",children:"export interface CandlOptionLineCursor {\n  // Color of the external ring\n  ringColor: string;\n  // Color of the internal part\n  fillColor: string;\n  // Radius of the cursor\n  radius: number;\n  // Thickness of the external ring\n  ringThickness: number;\n}\n"})}),"\n",(0,r.jsx)(e.h3,{id:"common-render",children:"Common Render"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-ts",children:"// Set common render options\nsetOptionsRender(options: CandlOptionRenderCommon): void\n"})}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-ts",children:"export interface CandlOptionRenderCommon {\n  // Initial width of the candle\n  initialWidth: number;\n  // Initial spacing between candles\n  initialSpacing: number;\n  // Initial candle shadow width\n  initialShadowWidth: number;\n  // Minimal width of the candle shadow\n  shadowWidthMin: number;\n  // Maximal width of the candle shadow\n  shadowWidthMax: number;\n}\n"})}),"\n",(0,r.jsx)(e.h3,{id:"candle-render",children:"Candle Render"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-ts",children:"// Set candle render options\nsetOptionsCandle(options: CandlOptionRenderCandle): void\n"})}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-ts",children:"export interface CandlOptionRenderCandle {\n  // Candle going down\n  bearish: {\n    // Color of the candle\n    color: string;\n    // Color of the shadow of the candle\n    shadowColor: string;\n  };\n  // Candle going up\n  bullish: {\n    color: string;\n    shadowColor: string;\n  };\n}\n"})}),"\n",(0,r.jsx)(e.h3,{id:"line-render",children:"Line Render"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-ts",children:"// Set line render options\nsetOptionsLine(options: CandlOptionRenderLine): void\n"})}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-ts",children:"export interface CandlOptionRenderLine {\n  // Color of the line\n  color: string;\n  // Thickness of the line\n  thickness: number;\n}\n"})}),"\n",(0,r.jsx)(e.h3,{id:"area-render",children:"Area Render"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-ts",children:"// Set area render options\nsetOptionsArea(options: CandlOptionRenderArea): void\n"})}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-ts",children:"export interface CandlOptionRenderArea {\n  // Line of the Area\n  line: {\n    // Color of the line\n    color: string;\n    // Thickness of the line\n    thickness: number;\n  };\n  // Color of the area (gradient)\n  area: {\n    // Color at the top of the area\n    topColor: string;\n    // Color at the bottom of the area\n    bottomColor: string;\n  };\n}\n"})}),"\n",(0,r.jsx)(e.h3,{id:"volume",children:"Volume"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-ts",children:"// Set volume options\nsetOptionsVolume(options: CandlOptionVolume): void\n"})}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-ts",children:"export interface CandlOptionVolume {\n  // The current candle is going down\n  bearish: {\n    // Color of the bar\n    color: string;\n  };\n  // The current candle is going up\n  bullish: {\n    color: string;\n  };\n  // Height of the area reserved to Volume\n  height: number;\n}\n"})})]})}function h(n={}){const{wrapper:e}={...(0,i.R)(),...n.components};return e?(0,r.jsx)(e,{...n,children:(0,r.jsx)(c,{...n})}):c(n)}},8453:(n,e,o)=>{o.d(e,{R:()=>s,x:()=>t});var r=o(6540);const i={},l=r.createContext(i);function s(n){const e=r.useContext(l);return r.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function t(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(i):n.components||i:s(n.components),r.createElement(l.Provider,{value:e},n.children)}}}]);