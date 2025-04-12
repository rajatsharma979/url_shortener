import mongoose from "mongoose";
import { Document } from "mongoose";

export interface fetchedUrl extends Document{
    userId: mongoose.Schema.Types.ObjectId,
    orgUrl: string,
    shortUrl: string, 
    location: { place: string, clicks: number }[],
    device: { deviceType: string, clicks: number }[]
    createdAt: Date
}