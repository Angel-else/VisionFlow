const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

const route = require('./routes/userRoute.js');
const routEvent = require('./routes/eventRoute.js');
const routeInsEvent = require('./routes/insEventRoute.js');
const routeFront = require('./routes/frontRoutes.js');

dotenv.config();

const app = express();

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "./Client/public")));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Définition des routes
app.use("/api", route);
app.use("/api", routEvent);
app.use("/api", routeInsEvent);
app.use("/", routeFront);

const port = process.env.PORT || 8080;
const mongourl = process.env.MONGO_URL; // ⚠️ CHANGE ICI SEULEMENT !

mongoose
.connect(mongourl)
.then(() => {
    console.log("DB connectée avec succès");
    app.listen(port, () => {
    console.log(`Serveur connecté sur le port: ${port}`);
    });
})
.catch((error) => console.log("Erreur de connexion DB:", error));
