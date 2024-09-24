"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[654],{7798:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>l,contentTitle:()=>r,default:()=>h,frontMatter:()=>a,metadata:()=>s,toc:()=>o});var d=i(4848),t=i(8453);const a={sidebar_position:2},r="Candl",s={id:"Candl/candl",title:"Candl",description:"Candl is the main class that manage inputs and chart updates.",source:"@site/docs/Candl/candl.md",sourceDirName:"Candl",slug:"/Candl/",permalink:"/candl/docs/Candl/",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"Quick Start",permalink:"/candl/docs/intro"},next:{title:"Candl Options",permalink:"/candl/docs/Candl/candl_options"}},l={},o=[{value:"CandlOption",id:"candloption",level:3},{value:"TimeFrame",id:"timeframe",level:3},{value:"Candl Serie",id:"candl-serie",level:3},{value:"Offset",id:"offset",level:3},{value:"HoveredIndex",id:"hoveredindex",level:3},{value:"Render Quality",id:"render-quality",level:3}];function c(e){const n={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h3:"h3",header:"header",p:"p",pre:"pre",...(0,t.R)(),...e.components};return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(n.header,{children:(0,d.jsx)(n.h1,{id:"candl",children:"Candl"})}),"\n",(0,d.jsx)(n.p,{children:"Candl is the main class that manage inputs and chart updates."}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-ts",children:"const candl: Candl = new Candl(container);\n"})}),"\n",(0,d.jsxs)(n.p,{children:[(0,d.jsx)(n.code,{children:"container"})," is an ",(0,d.jsx)(n.code,{children:"HTMLDivElement"})," in your HTML code."]}),"\n",(0,d.jsx)(n.p,{children:"Candl handle the creation, update and delete of the canvases. You just need to provide a parent div."}),"\n",(0,d.jsx)(n.h3,{id:"candloption",children:"CandlOption"}),"\n",(0,d.jsxs)(n.p,{children:["The behavior of Candl is define with ",(0,d.jsx)(n.code,{children:"CandlOption"}),"."]}),"\n",(0,d.jsxs)(n.p,{children:["Candl come with an already loaded CandlOption coming from ",(0,d.jsx)(n.code,{children:"getBaseOptions()"}),"."]}),"\n",(0,d.jsx)(n.p,{children:"However you can set your own options."}),"\n",(0,d.jsxs)(n.p,{children:["See more about ",(0,d.jsx)(n.a,{href:"/candl/docs/Candl/candl_options",children:"CandlOption"}),"."]}),"\n",(0,d.jsx)(n.h3,{id:"timeframe",children:"TimeFrame"}),"\n",(0,d.jsxs)(n.p,{children:[(0,d.jsx)(n.code,{children:"CandlTimeFrame"})," is the unit of time of the chart, it define the time for each candle."]}),"\n",(0,d.jsx)(n.p,{children:"For example :"}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{children:"CandlTimeFrame.Time1Minute\nCandlTimeFrame.Time5Minutes\nCandlTimeFrame.Time1Hour\n"})}),"\n",(0,d.jsxs)(n.p,{children:["You can set the TimeFrame of the chart with ",(0,d.jsx)(n.code,{children:"setActiveTimeFrame()"})]}),"\n",(0,d.jsx)(n.h3,{id:"candl-serie",children:"Candl Serie"}),"\n",(0,d.jsx)(n.p,{children:"Candl Serie is an object that hold the data and the views for one TimeFrame."}),"\n",(0,d.jsx)(n.p,{children:"It contain an array of CandlData and an Array of CandlView."}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-ts",children:"// To get the serie which is currently rendered on the chart\ngetActiveSerie(): CandlSerie | undefined\n"})}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-ts",children:"// To get a serie by his TimeFrame.\ngetSerie(CandlTimeFrame): CandlSerie | undefined\n"})}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-ts",children:"// To add a serie.\naddSerie(type: CandlTimeFrame, serie: CandlSerie): void\n"})}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-ts",children:"// To remove a serie.\nremoveSerie(type: CandlTimeFrame): void\n"})}),"\n",(0,d.jsxs)(n.p,{children:["See more about ",(0,d.jsx)(n.a,{href:"/candl/docs/Candl/candl_serie",children:"CandlSerie"}),"."]}),"\n",(0,d.jsx)(n.h3,{id:"offset",children:"Offset"}),"\n",(0,d.jsx)(n.p,{children:"Offset is the position of the chart."}),"\n",(0,d.jsx)(n.p,{children:"More precisly, the offset is the bottom left position of the chart."}),"\n",(0,d.jsxs)(n.p,{children:["It is a ",(0,d.jsx)(n.code,{children:"CandlVector2"}),", it has ",(0,d.jsx)(n.code,{children:"x"})," and ",(0,d.jsx)(n.code,{children:"y"})," properties."]}),"\n",(0,d.jsxs)(n.p,{children:[(0,d.jsx)(n.code,{children:"getOffset()"})," return the current offset of the chart"]}),"\n",(0,d.jsxs)(n.p,{children:[(0,d.jsx)(n.code,{children:"setOffset()"})," Allow you to set the offset of the chart"]}),"\n",(0,d.jsx)(n.h3,{id:"hoveredindex",children:"HoveredIndex"}),"\n",(0,d.jsx)(n.p,{children:"The hovered index is the position of the candle you hover with the mouse in the array of data."}),"\n",(0,d.jsx)(n.h3,{id:"render-quality",children:"Render Quality"}),"\n",(0,d.jsxs)(n.blockquote,{children:["\n",(0,d.jsx)(n.p,{children:"The render quality cannot be set for the moment."}),"\n"]}),"\n",(0,d.jsx)(n.p,{children:"In order to improve visual, the canvases resolution are set to an higher definition than their real size."}),"\n",(0,d.jsx)(n.p,{children:"It allow to get a render with better definition."}),"\n",(0,d.jsxs)(n.p,{children:["This parameter is ",(0,d.jsx)(n.code,{children:"canvasDensity"})]})]})}function h(e={}){const{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,d.jsx)(n,{...e,children:(0,d.jsx)(c,{...e})}):c(e)}},8453:(e,n,i)=>{i.d(n,{R:()=>r,x:()=>s});var d=i(6540);const t={},a=d.createContext(t);function r(e){const n=d.useContext(a);return d.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function s(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:r(e.components),d.createElement(a.Provider,{value:n},e.children)}}}]);