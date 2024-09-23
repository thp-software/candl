# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
