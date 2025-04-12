import { Request, Response } from "express"
import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;

import Url from "../models/urlModel.js";

const getDashboard = async (req: Request, res: Response)=>{

    console.log("Inside dashboard");
    try{

        const userId = req.user.id;
    
        const allUrl = await Url.find({userId});

        console.log("all urls", allUrl);
    
        res.status(200).json({data: allUrl});
    }
    catch(err){
        console.log(err);
        res.status(500).json({err: "Error getting dachboard"});
    }
}

export default {
    getDashboard
}