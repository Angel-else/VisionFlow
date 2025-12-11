import express from "express"
import {createInsEvent} from "../controllers/insEventControllers.js"

const route = express.Router();
route.post("/insEvent/:id_user/:id_event",createInsEvent);

export default route;