import Event from "../models/eventModel.js";

export const createEvent = async (req, res) => {
    try {
        console.log("Body reçu :", req.body);

        const newEvent = new Event(req.body);
        const saved = await newEvent.save();

        res.status(200).json(saved);

    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};

export const getAllEvent = async(req,res) => {
    try {
        const eventData = await Event.find();
        if (!eventData || eventData.length == 0) {
            return res.status(404).json({message: "données non trouvés"})
        }
        res.status(200).json(eventData);
    }catch (error) {
        res.status(500).json({errorMessage: error.message});
    }
};

export const getEventById = async(req,res) => {
    try {
        const id = req.params.id;
        const eventExist = await Event.findById(id);
        if (!eventExist) {
            return res.status(404).json({message: "evenement non trouvés"})
        }
        res.status(200).json(eventExist);
    }catch (error) {
        res.status(500).json({errorMessage: error.message});
    }
};

export const updateEvent = async(req,res) => {
    try {
        const id = req.params.id;
        const eventExist = await Event.findById(id);
        if (!eventExist) {
            return res.status(404).json({message: "evenement non trouvés"})
        }
        const updateData = await Event.findByIdAndUpdate(id,req.body, 
            {
                new:true
            }
        )
        res.status(200).json(updateData);
    }catch (error) {
        res.status(500).json({errorMessage: error.message});
    }
};


export const deleteEvent = async(req,res) => {
    try {
        const id = req.params.id;
        const eventExist = await Event.findById(id);
        if (!eventExist) {
            return res.status(404).json({message: "evenement non trouvés"})
        }
    await Event.findByIdAndDelete(id);
        res.status(200).json({message: "evenement supprimer"});
    }catch (error) {
        res.status(500).json({errorMessage: error.message});
    }
};