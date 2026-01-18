import { GoogleGenerativeAI } from "@google/generative-ai";


// dealing with getting the page data

// 1. Declare your variable at the top level
let pageContent = ""; 

async function updateContent() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (!tab || !tab.id || !tab.url || isRestricted(tab.url)) {
    return;
  }

  try {
    const result = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: getPageText,
    });

    if (result && result[0]) {
      // 2. Assign the result to your variable
      pageContent = result[0].result;

      // Debugging: Log it to the console so you can see it change
      console.log("Variable updated:", pageContent.substring(0, 50) + "..."); 
    }
  } catch (err) {
    // Silent fail
  }
}

// --- Event Listeners (Same as before) ---

// Trigger on load
updateContent();

// Trigger on tab switch
chrome.tabs.onActivated.addListener(() => {
  updateContent();
});

// Trigger on navigation
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    updateContent();
  }
});

// --- Helpers ---

function isRestricted(url) {
  if (!url) return true;
  const restricted = [
    'chrome://', 'edge://', 'about:', 'chrome-extension://', 'https://chromewebstore.google.com'
  ];
  return restricted.some(prefix => url.startsWith(prefix));
}

function getPageText() {
  return document.body.innerText;
}


// gemini
const geminiKey = process.env.GEMINI_API_KEY; 
const genAI = new GoogleGenerativeAI(geminiKey);

async function getResponse(context, prompt) {
  // 3. DEFINE THE MODEL (This was missing in your code!)
  const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

  try {
    // 4. Generate Content
    const result = await model.generateContent({
      contents: [{
        parts: [{ text: `Context:\n${context}\n\nQuestion:\n${prompt}` }]
      }]
    });

    const response = await result.response;
    return response.text();
    
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error: Could not reach AI.";
  }
}



// chat window
const chatWindow = document.getElementById('chat-window');
const chatForm = document.getElementById('chat-form');
const messageInput = document.getElementById('message-input');


chatForm.addEventListener('submit', async (e) => {
  if (!chatWindow || !chatForm || !messageInput) return;

  e.preventDefault();
  const userMessage = messageInput.value.trim();
  if (!userMessage) return;
  renderMessage(userMessage, 'user');
  messageInput.value = '';

  renderMessage(await getResponse(pageContent, userMessage), 'ai');

  messageInput.focus();
})



// rendering the message to the user
function renderMessage(content, sender) {
  const messageElement = document.createElement('div');
  messageElement.className = `message ${sender}`;
  const avatar = document.createElement('div');
  avatar.className = 'avatar';
  avatar.textContent = sender === 'user' ? 'You' : 'AI';
  const bubble = document.createElement('div');
  bubble.className = 'bubble';
  bubble.textContent = content;
  if (sender === 'user') {
    messageElement.appendChild(bubble);
    messageElement.appendChild(avatar);
  } else {
    messageElement.appendChild(avatar);
    messageElement.appendChild(bubble);
  }
  chatWindow.appendChild(messageElement);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}





