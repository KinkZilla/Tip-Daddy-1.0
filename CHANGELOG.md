# Changelog

All notable changes to **Tip Daddy** are documented in this file.

---

## [1.0.3] - 2025-04-17

### Fixed
- 💥 Crash on tipping full goal from 0 tokens — app now correctly updates **Current Daddy** even if goal is fulfilled instantly
- 🔒 Patched unguarded `$kv.get()` in `Tip Received.js` to prevent errors from missing keys after restarts
- 🧹 `/clearalltime` no longer crashes `Chat Message Transform.js` — added `try/catch` protection around `HighestGoalTipperName`
- 🔄 `Broadcast Panel Update.js` now safely reads all keys using fallbacks; no more `goalCurrent` or `goalValue` read errors
- 🧠 `startIntroCallback()` logic now handles exact-goal tips without triggering unnecessary Daddy announcements

### Improved
- 🛡️ Hardened overall KV access with `try/catch` throughout core files
- 🔁 Improved resilience after disconnects, reboots, and long idle periods
- 🧼 Reduced notice spam during prize awarding — cleaner room experience
- 👑 App behavior is now consistent regardless of tip size or timing

---

## [1.0.2] - *Pre-release internal test build*

---

## [1.0.1] - 2025-04-14

### Added
- Initial release of **Tip Daddy** featuring:
  - 🏆 Top Tippers leaderboard (Session + All-Time)
  - 🎯 Goal tracking and live progress
  - 🎁 Prize reward system for top tipper when goal is reached
  - 👑 "Daddy" role with chat badge and background color
  - 🔄 Broadcast panel with real-time updates
