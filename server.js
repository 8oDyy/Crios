const express = require("express");
const bodyParser = require("body-parser");
const { Configuration, OpenAIApi } = require("openai");

const app = express();
const PORT = 5500;

// Configuration de l'API OpenAI avec la clé directement intégrée
const configuration = new Configuration({
    apiKey: "votre-clé-api",
});
const openai = new OpenAIApi(configuration);

// Middleware pour traiter les requêtes JSON
app.use(bodyParser.json());
app.use(express.static(__dirname));

// Route pour traiter les messages utilisateur
app.post("/chat", async (req, res) => {
    const { message } = req.body;

    try {
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: message,
            max_tokens: 150,
        });

        res.json({ reply: response.data.choices[0].text.trim() });
    } catch (error) {
        console.error("Erreur lors de l'appel à l'API :", error);
        res.status(500).json({ reply: "Une erreur est survenue. Réessayez plus tard." });
    }
});

// Lancer le serveur sur le port spécifié
app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});