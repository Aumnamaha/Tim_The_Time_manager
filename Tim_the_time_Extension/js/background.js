const TARGET_DOMAINS = ["youtube.com", "instagram.com", "facebook.com"];
const REMINDER_INTERVAL_MINUTES = 40;

const WELLNESS_MESSAGES = [
  "Hey there! You've been scrolling for a while. Time to do 10 pushups! 💪",
  "Tim says: Look away from the screen for 20 seconds. Save those eyes! 👀",
  "Hydration check! Go grab a glass of water, you deserve it. 💧",
  "Time to get up and stretch those legs! A quick walk does wonders. 🚶‍♂️",
  "Correct your posture! Sit up straight and take a deep breath. 🌬️",
  "Are you still watching? Maybe it's time to read a book or learn something new! 📚"
];

let currentSession = {
  tabId: null,
  domain: null,
  startTime: null
};

// Listen for messages directly from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "force_save") {
    updateTimeSpent();
    if(currentSession.domain) {
        currentSession.startTime = Date.now(); 
    }
  }
});

// Initialize alarms
chrome.runtime.onInstalled.addListener(() => {
  chrome.alarms.create("wellnessReminder", { periodInMinutes: REMINDER_INTERVAL_MINUTES });
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "wellnessReminder") {
    sendWellnessReminder();
  }
});

function getDomain(url) {
  if (!url) return null;
  try {
    const urlObj = new URL(url);
    const host = urlObj.hostname;
    for (let target of TARGET_DOMAINS) {
      if (host.includes(target)) {
        return target;
      }
    }
  } catch (e) {
    return null;
  }
  return null;
}

function updateTimeSpent() {
  if (currentSession.domain && currentSession.startTime) {
    const timeSpentMs = Date.now() - currentSession.startTime;
    const timeSpentSec = Math.floor(timeSpentMs / 1000);
    
    if (timeSpentSec > 0) {
      chrome.storage.local.get([currentSession.domain], (result) => {
        let totalTime = result[currentSession.domain] || 0;
        totalTime += timeSpentSec;
        let updateObj = {};
        updateObj[currentSession.domain] = totalTime;
        chrome.storage.local.set(updateObj);
      });
    }
  }
}

function handleTabChange(tabId, url) {
  const domain = getDomain(url);
  
  // If we changed domains or switched tabs
  if (currentSession.tabId !== tabId || currentSession.domain !== domain) {
    // Record previous
    updateTimeSpent();
    
    if (domain) {
      currentSession = {
        tabId: tabId,
        domain: domain,
        startTime: Date.now()
      };
    } else {
      currentSession = { tabId: null, domain: null, startTime: null };
    }
  }
}

// Listen for tab switching
chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    if (tab && tab.url) {
      handleTabChange(tab.id, tab.url);
    }
  });
});

// Listen for URL changes within the same tab
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url) {
    handleTabChange(tabId, changeInfo.url);
  }
});

// Also need to save time when window closes or unloads
chrome.windows.onFocusChanged.addListener((windowId) => {
  if (windowId === chrome.windows.WINDOW_ID_NONE) {
    updateTimeSpent();
    currentSession = { tabId: null, domain: null, startTime: null };
  } else {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0] && tabs[0].url) {
        handleTabChange(tabs[0].id, tabs[0].url);
      }
    });
  }
});

async function sendWellnessReminder() {
  // Only aggressively remind them if they are CURRENTLY on a distracting site,
  // or we can remind them regardless if they've spent too much time today.
  // For maximum effect, let's remind the active tab if it's a target domain.
  
  const randomMessage = WELLNESS_MESSAGES[Math.floor(Math.random() * WELLNESS_MESSAGES.length)];
  
  // Check if current active tab is a distracting site
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0] && tabs[0].id) {
        const domain = getDomain(tabs[0].url);
        if(domain) {
            chrome.tabs.sendMessage(tabs[0].id, {
              action: "show_reminder",
              message: randomMessage
            }).catch(err => console.log("Failed to send message: tab might not have content script injected."));
        }
    }
  });
}

// Periodically force a time save every 1 minute so if the browser crashes, data isn't lost
setInterval(() => {
    updateTimeSpent();
    if(currentSession.domain) {
        currentSession.startTime = Date.now(); // reset start time to counting after save
    }
}, 60000);
