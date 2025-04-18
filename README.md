# Tip Daddy 1.0

👑 A Chaturbate extension that tracks top tippers, displays real-time leaderboards, 
and rewards the reigning Daddy with a custom prize. Built for fun, flair, and full-room hype.

---

## 🚀 Features

- Tracks both **Session** and **All-Time** top tippers
- Real-time tip **goal progress bar overlay**
- Custom prize alerts sent to the top tipper when the goal is reached
- Clean admin interface with (almost)fully customizable settings
- Chat transforms (crown emoji, background color) for the current Daddy
- Panel display showing goal progress and top Daddies

---

## 🛠 Admin Commands

| Command | Function |
|--------|----------|
| `/leader` | Show session leaderboard |
| `/alltime` | Show all-time leaderboard |
| `/setalltime username tokens` | Manually update a user’s all-time tokens |
| `/clearalltime` | Clear the all-time leaderboard |

---

## ⚙️ Settings

The app uses a flexible JSON settings panel (defined in `settings.json`) for:

- Goal and prize configuration
- Color themes for messages and leaderboards
- Update intervals and message frequency
- Optional alternate usernames and visuals

These are managed via the Chaturbate Dev Portal "Settings" tab.
If you're compiling, you'll need to define each one in the dev portal as
a new setting, (or just copy Tip Daddy 1.0 to your apps.)
---

## 📦 Files

- `Shared Code.js`: Core logic and overlay interaction
- `Tip Received.js`: Handles tip events, emits overlay updates
- `App Start/Stop.js`: Bootstraps and cleans up
- `Callback.js`: Timed announcements and effects
- `Broadcast Panel Update.js`: Sets display under stream
- `Chat Message.js`: Handles /leader and /alltime commands
- `Chat Message Transform.js`: Adds crown & flair
- `TipDaddy_Wiki.md`: Dev documentation & architecture
- `settings.json`: Settings panel structure for CB Dev Portal
- `ReadMe.txt`: Tab order and unused Dev Portal references

---

## 🔒 License

MIT License — © 2025 KinkZilla

> Use it, remix it, crown yourself with it. Just give credit. 😉

---

## Changelog

View the full changelog [here](./CHANGELOG.md).


## 💬 Support & Collaboration

Built with love, sass, and Nova — My AI dev sidekick.  
Want to collab, remix, or feature this? [Let’s talk](https://chaturbate.com/kink_zilla). 😉


## Keywords (for search)

Chaturbate tip leaderboard, token goal tracker, live tip ranking, CB app goal system, Chaturbate overlay, top tipper display, CB token prize game, Chaturbate goal app, engagement tipping app, Tip Daddy 1.0, 
