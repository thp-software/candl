"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[279],{7276:(e,n,a)=>{a.r(n),a.d(n,{assets:()=>s,contentTitle:()=>i,default:()=>h,frontMatter:()=>t,metadata:()=>d,toc:()=>o});var l=a(4848),r=a(8453);const t={sidebar_position:5},i="Candl View",d={id:"Candl/candl_view",title:"Candl View",description:"CandlView define the way to render a CandlSerie at a certain Zoom.",source:"@site/docs/Candl/candl_view.md",sourceDirName:"Candl",slug:"/Candl/candl_view",permalink:"/candl/docs/Candl/candl_view",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:5,frontMatter:{sidebar_position:5},sidebar:"tutorialSidebar",previous:{title:"Candl Data",permalink:"/candl/docs/Candl/candl_data"},next:{title:"Candl X Label Type",permalink:"/candl/docs/Candl/candl_xlabeltype"}},s={},o=[{value:"xLabels",id:"xlabels",level:3},{value:"With this timestamp <code>2024-05-01 00:00:00</code>",id:"with-this-timestamp-2024-05-01-000000",level:4},{value:"With this timestamp <code>2024-05-01 04:00:00</code>",id:"with-this-timestamp-2024-05-01-040000",level:4},{value:"With this timestamp <code>2024-05-01 04:30:00</code>",id:"with-this-timestamp-2024-05-01-043000",level:4}];function c(e){const n={a:"a",code:"code",h1:"h1",h3:"h3",h4:"h4",header:"header",p:"p",pre:"pre",...(0,r.R)(),...e.components};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(n.header,{children:(0,l.jsx)(n.h1,{id:"candl-view",children:"Candl View"})}),"\n",(0,l.jsxs)(n.p,{children:[(0,l.jsx)(n.code,{children:"CandlView"})," define the way to render a ",(0,l.jsx)(n.code,{children:"CandlSerie"})," at a certain Zoom."]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-ts",children:"export interface CandlView {\r\n  // Zoom factor from 1. <1 = zoom out, >1 = zoom in.\r\n  zoomFactor: number;\r\n  // Set minor grid lines every n steps\r\n  gridXMinorSteps: number;\r\n  // Set major grid lines every n steps\r\n  gridXMajorSteps: number;\r\n  // Render Mode: CandleOnly, CandleAndShadow, Line...\r\n  renderMode: CandlRenderMode;\r\n  // Labels to show.\r\n  // Priority is DESC in the array.\r\n  xLabels: CandlXLabelType[];\r\n}\n"})}),"\n",(0,l.jsx)(n.h3,{id:"xlabels",children:"xLabels"}),"\n",(0,l.jsxs)(n.p,{children:[(0,l.jsx)(n.code,{children:"xLabels"})," is an array of ",(0,l.jsx)(n.a,{href:"/candl/docs/Candl/candl_xlabeltype",children:"CandlXLabelType"}),"."]}),"\n",(0,l.jsx)(n.p,{children:"The orders of the element in the array change the way the x Axis labels will be drawn."}),"\n",(0,l.jsx)(n.p,{children:"For example, if you set this array :"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-ts",children:"xLabels = [\r\n  CandlXLabelType.LabelYear,\r\n  CandlXLabelType.LabelMonth,\r\n  CandlXLabelType.LabelDay,\r\n  CandlXLabelType.LabelHour,\r\n  CandlXLabelType.Label5Minutes,\r\n];\n"})}),"\n",(0,l.jsxs)(n.h4,{id:"with-this-timestamp-2024-05-01-000000",children:["With this timestamp ",(0,l.jsx)(n.code,{children:"2024-05-01 00:00:00"})]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-ts",children:"CandlXLabelType.LabelYear       NO\r\nCandlXLabelType.LabelMonth      YES\r\nCandlXLabelType.LabelDay        YES but lower priority -> NO\r\nCandlXLabelType.LabelHour       YES but lower priority -> NO\r\nCandlXLabelType.Label5Minutes   YES but lower priority -> NO\n"})}),"\n",(0,l.jsxs)(n.h4,{id:"with-this-timestamp-2024-05-01-040000",children:["With this timestamp ",(0,l.jsx)(n.code,{children:"2024-05-01 04:00:00"})]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-ts",children:"CandlXLabelType.LabelYear       NO\r\nCandlXLabelType.LabelMonth      NO\r\nCandlXLabelType.LabelDay        NO\r\nCandlXLabelType.LabelHour       YES\r\nCandlXLabelType.Label5Minutes   YES but lower priority -> NO\n"})}),"\n",(0,l.jsxs)(n.h4,{id:"with-this-timestamp-2024-05-01-043000",children:["With this timestamp ",(0,l.jsx)(n.code,{children:"2024-05-01 04:30:00"})]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-ts",children:"CandlXLabelType.LabelYear       NO\r\nCandlXLabelType.LabelMonth      NO\r\nCandlXLabelType.LabelDay        NO\r\nCandlXLabelType.LabelHour       NO\r\nCandlXLabelType.Label5Minutes   YES\n"})})]})}function h(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,l.jsx)(n,{...e,children:(0,l.jsx)(c,{...e})}):c(e)}},8453:(e,n,a)=>{a.d(n,{R:()=>i,x:()=>d});var l=a(6540);const r={},t=l.createContext(r);function i(e){const n=l.useContext(t);return l.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function d(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:i(e.components),l.createElement(t.Provider,{value:n},e.children)}}}]);