import express from "express"
import {createEvent, getAllEvent, getEventById,updateEvent,deleteEvent,getEventsByUser} from "../controllers/eventControllers.js"


const route = express.Router();
route.post ("/event", createEvent);
route.get("/events",getAllEvent);
route.get("/event/:id",getEventById);
route.put("/update/event/:id",updateEvent);
route.delete("/delete/event/:id",deleteEvent);
route.get("/events/user/:id_user",getEventsByUser)


export default route;








