require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const OpenAI = require("openai");
const cors = require("cors");

const app = express();
const openai = new OpenAI({
  apiKey: process.env.CHATGPT_API_KEY,
});

app.use(cors());
app.use(bodyParser.json());

// Fonction pour formater la réponse
function formatRecipeResponse(reply) {
  if (!reply) return ""; // Gérer les réponses vides

  // Ajouter des sauts de ligne avant les tirets et après les phrases
  return reply
    .replace(/-\s/g, "\n- ") // Saut de ligne pour les listes
    .replace(/(\d+\.\s\*\*.*?\*\*:)/g, "\n$1\n") // Saut de ligne après chaque titre de recette
    .replace(/\.([^\n])/g, ".\n$1") // Saut de ligne après chaque point
    .replace(/\n{2,}/g, "\n\n") // Éviter les sauts de ligne multiples
    .trim();
}

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "Tu es un chef cuisinier. Tu vas me donner des recettes simples et efficaces, avec des termes compréhensibles pour tous." },
        { role: "user", content: userMessage },
      ],
    });

    const reply = completion.choices[0].message.content;

    // Appliquer le formatage
    const formattedReply = formatRecipeResponse(reply);

    res.json({ reply: formattedReply });
  } catch (error) {
    console.error("Erreur avec l'API OpenAI :", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});


