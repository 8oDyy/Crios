document.addEventListener("scroll", () => {
  // Sélectionnez le conteneur et l'image
  const container = document.querySelector(".parallax-container");
  const image = document.querySelector(".parallax-image");

  // Récupère la position du conteneur par rapport à la fenêtre
  const rect = container.getBoundingClientRect();

  // Calcul de la progression du conteneur dans la fenêtre
  const scrollProgress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);

  // Limite la progression à un intervalle de 0 à 1
  const clampedProgress = Math.min(Math.max(scrollProgress, 0), 1);

  // Déplace l'image verticalement en fonction de la progression
  const maxOffset = -150; // Ajustez cette valeur pour augmenter ou diminuer le mouvement
  const offset = clampedProgress * maxOffset;

  // Applique la translation à l'image
  image.style.transform = `translateY(${offset}px)`;
});

document.addEventListener("scroll", () => {
  const wrapper = document.querySelector(".wrapper");
  const carrouselleH2 = document.querySelector(".carrouselle h2");
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;

  [wrapper, carrouselleH2].forEach(element => {
      const rect = element.getBoundingClientRect();
      if (rect.top <= windowHeight && rect.bottom >= 0) {
          element.classList.add("visible");
      }
  });
});


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

