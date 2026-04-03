document.addEventListener('DOMContentLoaded', () => {
  const statsContainer = document.getElementById('stats-container');
  const totalTimeEl = document.getElementById('total-time');

  // Trigger a save so data is up to date
  chrome.runtime.sendMessage({action: "force_save"}).catch(() => {});

  setTimeout(() => renderStats(), 100);

  function renderStats() {
    // Read local storage
    chrome.storage.local.get(null, (items) => {
      statsContainer.innerHTML = ''; // clear loading
      let totalSeconds = 0;
      let hasData = false;

      // Extract items that look like domains we track
      const domains = ["youtube.com", "instagram.com", "facebook.com"];
      
      for (let domain of domains) {
        if (items[domain] !== undefined && items[domain] > 0) {
          hasData = true;
          const sec = items[domain];
          totalSeconds += sec;
          
          const row = document.createElement('div');
          row.className = 'stat-row';
          
          const nameSpan = document.createElement('span');
          nameSpan.className = 'domain-name';
          
          // nice little favicons
          const icon = document.createElement('img');
          icon.src = `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
          
          const textNode = document.createTextNode(domain.replace('.com', ''));
          nameSpan.appendChild(icon);
          nameSpan.appendChild(textNode);
          nameSpan.style.textTransform = 'capitalize';

          const timeSpan = document.createElement('span');
          timeSpan.className = 'time-spent';
          timeSpan.innerText = formatTime(sec);

          row.appendChild(nameSpan);
          row.appendChild(timeSpan);
          statsContainer.appendChild(row);
        }
      }

      if (!hasData) {
        statsContainer.innerHTML = '<div class="loading">No distractions yet. Great job! 🎉</div>';
      }

      totalTimeEl.innerText = formatTime(totalSeconds);
      
      if(totalSeconds > 7200) { // Over 2 hours total
        totalTimeEl.style.color = '#ef4444'; // Red color
      } else if (totalSeconds > 3600) { // Over 1 hour
        totalTimeEl.style.color = '#f59e0b'; // Amber color
      } else {
        totalTimeEl.style.color = '#10b981'; // Green color
      }
    });
  }

  function formatTime(totalSeconds) {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    
    if (hrs > 0) {
      return `${hrs}h ${mins}m`;
    } else if (mins > 0) {
      return `${mins}m ${secs}s`;
    } else {
      return `${secs}s`;
    }
  }
});
