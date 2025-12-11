import InsEvent from "../models/insEventModel.js";

export const createInsEvent = async (req, res) => {
    try {
        console.log("Body reçu :", req.body);

        const { email } = req.body;
        const { id_user, id_event } = req.params;

        // Vérification des champs obligatoires
        if (!email ) {
            return res.status(400).json({ message: "Veuillez remplir tous les champs." });
        }

        // Vérifier si l'utilisateur est déjà inscrit à cet événement
        const exist = await InsEvent.findOne({ id_user, id_event });
        if (exist) {
            return res.status(400).json({ message: "Vous êtes déjà inscrit à cet événement." });
        }

        // Enregistrer l'inscription
        const newInsEvent = new InsEvent({
            email,
            id_user,
            id_event,
        });

        const saved = await newInsEvent.save();
        res.status(201).json(saved);

    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};
