
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

document.getElementById("send-btn").addEventListener("click", async () => {
  const userInput = document.getElementById("user-input").value;
  if (!userInput.trim()) return;

  const chatWindow = document.getElementById("chat-window");

  // Ajouter le message de l'utilisateur
  const userMessage = document.createElement("div");
  userMessage.textContent = `Vous: ${userInput}`;
  userMessage.className = "user-message";
  chatWindow.appendChild(userMessage);

  // Réinitialiser l'input
  document.getElementById("user-input").value = "";

  // Appeler le serveur pour obtenir la réponse
  const response = await fetch("/chat", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: userInput }),
  });

  const data = await response.json();

  // Ajouter la réponse de ChatGPT
  const botMessage = document.createElement("div");
  botMessage.textContent = `ChatGPT: ${data.reply}`;
  botMessage.className = "bot-message";
  chatWindow.appendChild(botMessage);

  // Faire défiler vers le bas
  chatWindow.scrollTop = chatWindow.scrollHeight;
});
