# 👑 Tip Daddy v1.0.5

A Chaturbate application that tracks top tippers, displays real-time leaderboards, powers interactive tip menus (with timers!), and rewards the reigning Daddy with a custom prize. Built for fun, flair, and full-room hype — with style.

---

## 🚀 Features

- 🎯 Tracks both **Session** and **All-Time** top tippers  
- 📈 Real-time **tip goal progress** with animated panel display  
- 🎁 **Prize alerts** for top tippers when the goal is completed  
- 👑 Live **Crown System** with dethroning logic and chat effects  
- 📋 Dynamic **Tip Menu System** with optional countdown timers  
- 🔁 **Queueing** for timed tip menu items  
- 💬 Custom **message styling** (colors, emojis, backgrounds)  
- 🧠 Crash-proof **KV storage logic**  
- 🎨 Customizable through **Dev Portal JSON settings**  
- 🖥️ Full broadcast panel updates — goal, session & all-time Daddies

---

## 💬 Commands

| Command                           | Function                                                            |
|----------------------------------|---------------------------------------------------------------------|
| `/leader`                        | Show the current session leaderboard                               |
| `/alltime`                       | Show the all-time leaderboard                                      |
| `/setalltime username tokens`    | Manually set a user's all-time tip record                          |
| `/clearalltime`                 | Clear the all-time leaderboard (⚠️ irreversible)                   |
| `/reset`                         | Reset session and crown logic without affecting all-time data      |
| `/setmenu Item Price`            | Add a tip menu item (no timer)                                     |
| `/setmenu Item Price Minutes`    | Add a timed tip menu item with countdown display                   |
| `/removeitem Item`              | Remove a tip menu item by name (case-insensitive)                  |
| `/clearmenu`                     | Clear all tip menu items                                           |
| `/menu`                          | Post the current tip menu in chat                                  |

---

## ⚙️ Settings

Tip Daddy uses a flexible JSON-powered settings panel inside the [Chaturbate Dev Portal](https://chaturbate.com/apps/). Key setting categories:

- Goal & Prize Settings  
- Tip Menu Colors & Emojis  
- Message Display Themes  
- Timing Intervals (for callbacks, repeaters)  
- Alternate usernames and tags  
- Display toggles for menu / leaderboard visibility  

Need help copying settings? Just clone from the public Tip Daddy listing or check out `settings.json`.

---

## 📦 Files

- `Shared Code.js` – Core logic, panel updates, crown engine  
- `Tip Received.js` – Tip handler, leaderboard logic, crown/timer triggers  
- `App Start/Stop.js` – Initialization and session cleanup  
- `Callback.js` – Repeaters and suspense/delay management  
- `Broadcast Panel Update.js` – Real-time UI updates  
- `Chat Message.js` – Slash commands (/menu, /alltime, etc)  
- `Chat Message Transform.js` – Crown emoji, Daddy flair in chat  
- `settings.json` – Developer panel configuration  
- `TipDaddy_Wiki.md` – Architecture & implementation notes  
- `ReadMe.md` – You are here.

---

## 📝 Changelog

**v1.0.5 Highlights:**

- ⏱ Timed Tip Menu Items  
- 🔁 Auto-Queue System  
- 📋 `/menu` command  
- 🧠 Safe KV logic with `try/catch`  
- 🎨 Dynamic label switching on broadcast panel  
- 💖 GitHub Pages doc site with full user-facing guide

➡️ [Full v1.0.5 Changelog](./TipDaddy_v1.0.5_Changelog.md)

---

## 💬 Support & Collaboration

Built with love, sass, and **Nova** — my AI sidekick.  
Want to remix it? Feature it? Cry about it with eyeliner on?  
Let’s collab.

---

## 🔍 Keywords (for search)

Chaturbate leaderboard · token goal tracker · CB tipping app · Chaturbate tip menu · top tipper panel · overlay prize game · interactive goal app · live tip display · Nova-powered apps · Tip Daddy

---

© 2025 Kink_Zilla.  
Licensed under the MIT License — use it, remix it, crown yourself with it. Just give credit 😉
