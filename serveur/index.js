import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import route from './routes/userRoute.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Définition des routes
app.use("/api", route);

const port = process.env.PORT || 7000;
const mongourl = process.env.MONGO_URL;

mongoose
  .connect(mongourl)
  .then(() => {
    console.log("DB connectée avec succès");
    app.listen(port, () => {
      console.log(`Serveur connecté sur le port: ${port}`);
    });
  })
  .catch((error) => console.log("Erreur de connexion DB:", error));
