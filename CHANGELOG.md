# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.5.0] - 2024-09-26

### Added

- CandlOptionYAxis: add boolean `autoSteps` for automatic yAxis price count.

## [0.4.0] - 2024-09-26

### Added

- CandlOptionYAxis: Possibility to set a target number of price on the yAxis.

## [0.3.4] - 2024-09-26

### Fixed

- internal Candl : Reduce unused space at the bottom of the chart.

## [0.3.3] - 2024-09-26

### Fixed

- internal Candl : Candles was drawn outside of view, costing in perfs and distorting the y scaling.

## [0.3.2] - 2024-09-26

### Fixed

- internal CandlDraw : Cleaner end of line for Area.

## [0.3.1] - 2024-09-25

### Fixed

- internal Candl method: `onMouseWheel()` to fix wheel scroll issue.
- CandlSerie method: `setActiveView()`.

## [0.3.0] - 2024-09-24

### Added

- Initial Docusaurus docs
- Code comments
- Candl method : `setOptionsVolume()` to set volume options.
- Candl method : `setOptionsLineCursor` to set line cursor options.

## [0.2.0] - 2024-09-23

### Added

- interfaces `CandlOptionGeneral`, `CandlOptionShow`.
- Candl method : `setOptionsGeneral()` to set general options.
- Candl method : `setOptionsShow()` to set elements to show.
- Candl method : `setOptions()` to set all options at once (every properties are mandatory).
- CHANGELOG : initial.

### Changed

- **BREAKING** interface `CandlOption`
  - remove `show...` properties, replaced by properties in show:{`CandlOptionShow`}
  - remove `backgroundColor` property, replaced by general:{`CandlOptionGeneral`}
- README : Update code example with missing import.
