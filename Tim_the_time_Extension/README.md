# Tim – The Time Extension 🕐

> **Your mindful browsing companion.** Tim quietly tracks the time you spend on YouTube, Instagram, and Facebook — then reminds you every 40 minutes to take care of your health.

![Tim Extension](landing/style.css)

---

## ✨ Features

- ⏱️ **Precise time tracking** across YouTube, Instagram & Facebook
- 🔔 **6 different wellness reminders** — pushups, hydration, posture, eye rest, walking, reading
- 🎨 **Beautiful popup dashboard** — see your daily stats at a glance
- 🔒 **100% private** — all data stored locally in your browser, nothing sent anywhere
- ⚡ **Zero performance cost** — built with Manifest V3 service workers

---

## 📥 Installation (Manual — Chrome, Edge, Brave)

1. **[Download the latest release ZIP →](../../releases/latest)**
2. Unzip the downloaded file
3. Open your browser and go to `chrome://extensions`
4. Enable **Developer Mode** (toggle in the top-right corner)
5. Click **"Load unpacked"**
6. Select the unzipped `Tim_the_time_Extension` folder
7. Tim will appear in your extensions toolbar 🎉

---

## 🗂️ Project Structure

```
Tim_the_time_Extension/
├── manifest.json          # Manifest V3 config
├── popup.html             # Dashboard popup UI
├── css/
│   ├── popup.css          # Popup styles (cream/sandal palette)
│   └── content.css        # On-page wellness overlay styles
├── js/
│   ├── background.js      # Service worker — tracks time & manages alarms
│   ├── content.js         # Injects reminder overlay on tracked pages
│   └── popup.js           # Renders live stats in the dashboard
├── icons/                 # Extension icons (16, 48, 128px)
└── landing/               # Landing page (HTML/CSS/JS)
    ├── index.html
    ├── style.css
    └── script.js
```

---

## 🌐 Tracked Sites

| Site | URL Pattern |
|---|---|
| YouTube | `*://*.youtube.com/*` |
| Instagram | `*://*.instagram.com/*` |
| Facebook | `*://*.facebook.com/*` |

---

## 🛠️ Development

To test locally with a faster reminder interval:

1. Open `js/background.js`
2. Change `REMINDER_INTERVAL_MINUTES = 40` to `2` for testing
3. Reload the extension at `chrome://extensions`

---

## 🚀 Contributing

Pull requests are welcome! Open an issue first to discuss what you'd like to change.

---

## 📄 License

MIT License — free to use, modify, and distribute.

---

*Built with ❤️ for your wellbeing. Stay focused. Stay healthy.*
