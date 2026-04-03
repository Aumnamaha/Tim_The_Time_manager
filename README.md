# Tim – The Time Extension 🕐

> **Your mindful browsing companion.** Tim quietly tracks the time you spend on YouTube, Instagram, and Facebook — then reminds you every 40 minutes to take care of your health.

> 🔗 **GitHub Repo:** [github.com/Aumnamaha/Time_The_Time_manager](https://github.com/Aumnamaha/Time_The_Time_manager/tree/main/Tim_the_time_Extension)

---

## ✨ Features

- ⏱️ **Precise time tracking** across YouTube, Instagram & Facebook
- 🔔 **6 different wellness reminders** — pushups, hydration, posture, eye rest, walking, reading
- 🎨 **Beautiful popup dashboard** — see your daily stats at a glance
- 🔒 **100% private** — all data stored locally in your browser, nothing sent anywhere
- ⚡ **Zero performance cost** — built with Manifest V3 service workers

---

## 📥 Setup & Installation (Manually)

You can install Tim directly from the source code in under a minute. No mystery installer, no account needed.

1. **[Download the Source ZIP →](https://github.com/Aumnamaha/Time_The_Time_manager/tree/main/Tim_the_time_Extension)**
   - Link: `https://github.com/Aumnamaha/Time_The_Time_manager/tree/main/Tim_the_time_Extension`
   - Click the green **"Code"** button and select **"Download ZIP"**.
2. **Extract the folder**
   - Unzip the downloaded file and place the `Tim_the_time_Extension` folder somewhere permanent on your computer.
3. **Open Browser Extensions**
   - Head to `chrome://extensions` (or `edge://extensions` for Microsoft Edge) in your browser address bar.
4. **Enable "Developer Mode"**
   - Flip the toggle in the top-right corner to **ON**. This allows you to load local extensions.
5. **Load the Extension**
   - Click the **"Load unpacked"** button and select the extracted folder. Tim will appear in your extensions bar! 🎉

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
