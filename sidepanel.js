document.addEventListener('DOMContentLoaded', () => {
  const chatWindow = document.getElementById('chat-window');
  const chatForm = document.getElementById('chat-form');
  const messageInput = document.getElementById('message-input');

  if (!chatWindow || !chatForm || !messageInput) return;

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

  chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const userMessage = messageInput.value.trim();
    if (!userMessage) return;
    renderMessage(userMessage, 'user');
    messageInput.value = '';
    // Simulate AI response (replace with Overshoot query if needed)
    setTimeout(() => {
      renderMessage('This is a sample AI response. (You can connect to Overshoot here.)', 'ai');
    }, 800);
  });

  messageInput.focus();
});
