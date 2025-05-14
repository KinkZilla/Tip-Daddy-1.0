# Changelog

All notable changes to **Tip Daddy** are documented in this file.

---
# 📝 Tip Daddy v1.0.5 — Changelog

**Released:** May 13, 2025  
**Status:** 🔥 Live and Well 
**Engineered by:** Kink_Zilla x Nova — Powered by Novaware™

---

## 🌟 New Features

- **⏱ Timed Tip Menu Items**  
  Add countdown timers to your tip menu with `/setmenu Item Price Minutes`. When tipped, the panel updates to show time remaining and the next item in the queue.

- **🔁 Auto-Queue System**  
  Timed items now stack! If someone tips for a second item while one’s already running, it’s added to the queue and triggered automatically after.

- **📋 Public Tip Menu Command**  
  Viewers can now type `/menu` to see your tip menu anytime, styled and sorted.

- **🎨 Custom Broadcast Panel Labels**  
  Panel rows now support dynamic label + value updates — so we can say “Time Remaining” or “Tipped For” instead of static hard-coded labels.

---

## 💬 Message System Upgrades

- **New Messages Added:** `tipMenuMatch`, `timerQueuedPublic`, `prizeWon`, `firstDaddyCrowned`  
- **Better Feedback:** Tip responses now tell users when they’re *close to taking the crown* or *just got dethroned*.  
- **Text Colors & Emojis Supported** in most custom messages.

---

## 🧠 Stability Improvements

- **Safe KV Loading:** All critical `$kv.get()` calls now use `try/catch` wrappers to avoid crash loops on fresh installs.  
- **App Start Hardening:** Rebuilt initialization logic to support missing keys, empty states, and safe defaults.  
- **Broadcast Panel Stability:** Fixed edge cases where the panel would fail to display if keys were missing on load.

---

## 🖼 UI & Documentation

- **📁 GitHub Pages Site Overhaul**  
  New button themes, themed branding, and full usage documentation at [kinkzilla.github.io/Tip-Daddy-1.0](https://kinkzilla.github.io/Tip-Daddy-1.0)



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
