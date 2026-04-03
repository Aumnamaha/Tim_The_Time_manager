chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "show_reminder") {
    showOverlay(request.message);
  }
});

function showOverlay(message) {
  // If an overlay already exists, don't create another
  if (document.getElementById('tim-wellness-overlay')) {
    return;
  }

  // Create overlay container
  const overlay = document.createElement('div');
  overlay.id = 'tim-wellness-overlay';
  
  // Create card
  const card = document.createElement('div');
  card.id = 'tim-card';

  // Create Title
  const title = document.createElement('h1');
  title.innerText = "Time to pause!";

  // Create Message
  const msgP = document.createElement('p');
  msgP.id = 'tim-message';
  msgP.innerText = message;

  // Create Button
  const btn = document.createElement('button');
  btn.id = 'tim-close-btn';
  btn.innerText = "Got it, thanks Tim!";
  
  // Add Event Listener to close
  btn.addEventListener('click', () => {
    overlay.style.animation = "timFadeOut 0.4s ease forwards";
    card.style.animation = "none";
    card.style.transform = "translateY(20px)";
    card.style.opacity = "0";
    card.style.transition = "all 0.4s ease";
    
    setTimeout(() => {
      overlay.remove();
    }, 400);
  });

  // Assemble
  card.appendChild(title);
  card.appendChild(msgP);
  card.appendChild(btn);
  overlay.appendChild(card);

  // Inject into page
  document.body.appendChild(overlay);
}
