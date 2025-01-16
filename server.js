require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const OpenAI = require("openai");
const cors = require("cors");

const app = express();
const openai = new OpenAI({
  apiKey: process.env.CHATGPT_API_KEY,
});

app.use(cors()); // Autoriser les requêtes depuis l'interface utilisateur
app.use(bodyParser.json());

// Route pour gérer les messages du frontend
app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  try {
    // Envoyer le message à l'API ChatGPT
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "Tu es un chef cuisiner, tu va me donner des recettes simple mais efficace avec des termes technique que tout le monde puisse comprendre" },
        { role: "user", content: userMessage },
      ],
    });

    const reply = completion.choices[0].message.content;

    res.json({ reply }); // Envoyer la réponse au frontend
  } catch (error) {
    console.error("Erreur avec l'API OpenAI :", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});