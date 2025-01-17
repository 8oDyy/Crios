document.addEventListener("DOMContentLoaded", () => {
  const chatWindow = document.getElementById("chat-window");
  const userInput = document.getElementById("user-input");
  const sendBtn = document.getElementById("send-btn");

  sendBtn.addEventListener("click", async () => {
    const userMessage = userInput.value.trim();
    if (!userMessage) return;

    // Affiche le message utilisateur
    displayMessage(userMessage, "user");

    try {
      const response = await fetch("http://localhost:3000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();
      const botReply = data.reply;

      // Affiche la réponse du bot avec une mise en page améliorée
      displayMessage(botReply, "bot");
    } catch (error) {
      console.error("Erreur :", error);
      displayMessage("Une erreur est survenue. Veuillez réessayer.", "bot");
    }

    userInput.value = "";
  });

  function displayMessage(message, sender) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add(`${sender}-message`);

    // Diviser la réponse en lignes si nécessaire
    if (sender === "bot") {
      message.split("\n").forEach((line) => {
        const lineDiv = document.createElement("div");
        lineDiv.textContent = line.trim();
        messageDiv.appendChild(lineDiv);
      });
    } else {
      messageDiv.textContent = message;
    }

    chatWindow.appendChild(messageDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight; // Défilement automatique
  }
});

