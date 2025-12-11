import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    nom_evenement: {
        type: String,
        required: true,
    },
    date_debut: {
        type: Date,
        required: true,
    },
    heure: {
        type: String, 
        required: false,
    },
    lieu: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    prix: {
        type: Number,
        required: false,
    },
    nbre_de_places : {
        type: Number ,
        required: false,
    },
    id_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
}, { timestamps: true });


export default mongoose.model("Event", eventSchema)