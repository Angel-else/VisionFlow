import User from "../models/userModel.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const create = async (req, res) => {
    console.log("Requête reçue :", req.body);

    try {
        const { nom, email, motpasse } = req.body;

        // Vérifier que tous les champs sont présents
        if (!nom || !email || !motpasse) {
            return res.status(400).json({ message: "Veuillez remplir tous les champs." });
        }

        // Vérifier si l'utilisateur existe déjà
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: "L'utilisateur existe déjà" });
        }

        // Hash du mot de passe
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(motpasse, saltRounds);

        // Création du nouvel utilisateur
        const newUser = new User({
            nom,
            email,
            motpasse: hashedPassword
        });

        // Sauvegarde dans la BD
        const savedData = await newUser.save();
        res.status(201).json(savedData);

    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};
export const auth = async (req, res) => {
    console.log("Requête reçue :", req.body);

    try {
        if (!req.body || !req.body.email || !req.body.motpasse) {
            return res.json({
                status: "failed",
                message: "Le corps de la requête est vide ou invalide"
            });
        }

        let { email, motpasse } = req.body;
        email = email.trim();
        motpasse = motpasse.trim();

        if (!email || !motpasse) {
            return res.json({
                status: "failed",
                message: "Remplis tous les champs"
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.json({
                status: "failed",
                message: "Utilisateur non trouvé"
            });
        }

        const match = await bcrypt.compare(motpasse, user.motpasse);

        if (match) {
            return res.json({
                message: "Connexion réussie",
            });
        } else {
            return res.json({
                status: "failed",
                message: "Mot de passe incorrect"
            });
        }

    } catch (err) {
        return res.json({
            status: "failed",
            message: "Erreur serveur",
            error: err.message
        });
    }
};

export const getAllUsers = async(req,res) => {
    try {
        const userData = await User.find();
        if (!userData || userData.length == 0) {
            return res.status(404).json({message: "données non trouvés"})
        }
        res.status(200).json(userData);
    }catch (error) {
        res.status(500).json({errorMessage: error.message});
    }
};

export const getUserById = async(req,res) => {
    try {
        const id = req.params.id;
        const userExist = await User.findById(id);
        if (!userExist) {
            return res.status(404).json({message: "user non trouvés"})
        }
        res.status(200).json(userExist);
    }catch (error) {
        res.status(500).json({errorMessage: error.message});
    }
};


export const update = async(req,res) => {
    try {
        const id = req.params.id;
        const userExist = await User.findById(id);
        if (!userExist) {
            return res.status(404).json({message: "user non trouvés"})
        }
        const updateData = await User.findByIdAndUpdate(id,req.body, 
            {
                new:true
            }
        )
        res.status(200).json(updateData);
    }catch (error) {
        res.status(500).json({errorMessage: error.message});
    }
};

export const deleteUser = async(req,res) => {
    try {
        const id = req.params.id;
        const userExist = await User.findById(id);
        if (!userExist) {
            return res.status(404).json({message: "user non trouvés"})
        }
    await User.findByIdAndDelete(id);
        res.status(200).json({message: "user supprimer"});
    }catch (error) {
        res.status(500).json({errorMessage: error.message});
    }
};