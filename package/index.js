'use strict';

var __createBinding = (undefined && undefined.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (undefined && undefined.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandlSerie = exports.Candl = void 0;
var Candl_1 = require("./Candl");
Object.defineProperty(exports, "Candl", { enumerable: true, get: function () { return Candl_1.Candl; } });
var CandlSerie_1 = require("./CandlSerie");
Object.defineProperty(exports, "CandlSerie", { enumerable: true, get: function () { return CandlSerie_1.CandlSerie; } });
__exportStar(require("./interfaces/CandlData"), exports);
__exportStar(require("./interfaces/CandlView"), exports);
__exportStar(require("./interfaces/CandlOption"), exports);
__exportStar(require("./interfaces/CandlVector2"), exports);
__exportStar(require("./interfaces/CandlXLabelOptions"), exports);
__exportStar(require("./interfaces/CandlDataMap"), exports);
__exportStar(require("./enums/CandlRender"), exports);
__exportStar(require("./enums/CandlTimeFrame"), exports);
__exportStar(require("./enums/CandlXLabelType"), exports);
__exportStar(require("./data/BaseOptions"), exports);
__exportStar(require("./data/BaseXLabels"), exports);
__exportStar(require("./data/BaseZooms"), exports);
__exportStar(require("./helpers/CandlHelper"), exports);
__exportStar(require("./helpers/CandlMapper"), exports);
__exportStar(require("./helpers/CandlMock"), exports);
__exportStar(require("./helpers/CandlTime"), exports);
//# sourceMappingURL=index.js.map
