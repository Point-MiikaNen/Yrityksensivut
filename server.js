const express = require('express');
const path = require('path');
const fs = require('fs').promises;

const app = express();
const PORT = 4000;

// Tarjoa staattiset tiedostot public-kansiosta
app.use(express.static(path.join(__dirname, 'public')));

// API-reitti henkilökunnan JSON-tiedoston hakemiseen
app.get('/api/henkilokunta', async (req, res) => {
    try {
        const tiedostopolku = path.join(__dirname, 'public', 'henkilokunta.json');
        console.log('Yritetään lukea tiedostoa:', tiedostopolku); // 🛠 DEBUGGAUS
        const data = await fs.readFile(tiedostopolku, 'utf8');
        res.json(JSON.parse(data));
    } catch (error) {
        console.error('Virhe JSON-tiedoston lukemisessa:', error);
        res.status(500).json({ error: "Tietojen lukeminen epäonnistui" });
    }
});

// Käynnistä palvelin
app.listen(PORT, () => {
    console.log(`Serveri käynnissä osoitteessa http://localhost:${PORT}`);
});